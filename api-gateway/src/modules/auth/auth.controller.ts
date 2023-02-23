import { Controller, Post, Body, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    login(@Body(ValidationPipe) loginDto: LoginDto){
        return this.authService.login(loginDto)
    }
}
