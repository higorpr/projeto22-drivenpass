import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dtos/CreateUserDTO';
import { LoginUserDTO } from '../user/dtos/LoginUserDTO';
import { UserService } from 'src/user/user.service';
import { AuthGuard } from './auth.guard';
import { User } from 'src/decorators/users.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('sign-up')
  async postUser(@Body() body: CreateUserDTO) {
    try {
      const newUser = await this.userService.createUser(body);
      console.log(newUser);
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
  async me(@User() user) {
    return {
      me: user,
    };
  }
}
