import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dtos/CreateUserDTO';
import { LoginUserDTO } from '../user/dtos/LoginUserDTO';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';
import { AuthUser } from 'src/decorators/users.decorator';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  async postUser(@Body() body: CreateUserDTO) {
    try {
      await this.userService.createUser(body);
    } catch (err) {
      console.log(err);
    }
  }

  @Post('login')
  async login(@Body() body: LoginUserDTO) {
    const { email, password } = body;
    return this.authService.loginUser(email, password);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@AuthUser() user: User) {
    return {
      me: user,
    };
  }
}
