import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private expirationTime = '7 days';
  private issuer = 'Higor';
  private audience = 'users';

  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    const token = this.jwtService.sign(
      {
        email: user.email,
      },
      {
        expiresIn: this.expirationTime,
        subject: String(user.id),
        issuer: this.issuer,
        audience: this.audience,
      },
    );
    return {
      accessToken: token,
    };
  }

  checkToken(token: string) {
    const data = this.jwtService.verify(token, {
      audience: this.audience,
      issuer: this.issuer,
    });

    return data;
  }

  async loginUser(email: string, password: string) {
    const user = await this.userService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Email or password not valid');
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new UnauthorizedException('Email or password not valid');
    }

    return this.createToken(user);
  }
}
