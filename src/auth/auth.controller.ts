import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dtos/CreateUserDTO';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) {}

    @Post('sign-up')
        postUser(@Body() body: CreateUserDTO) {
            try {
                
            } catch (err) {
                console.log(err)
            }
        }
    
}
