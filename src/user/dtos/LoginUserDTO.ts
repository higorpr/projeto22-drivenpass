import { IsEmail, IsString, isEmail } from 'class-validator';

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
