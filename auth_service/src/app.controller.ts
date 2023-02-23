import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { LoginDto } from './dto/login.dto';
import { AuthVerifyDto } from './dto/verify-auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('auth.login')
  login(@Payload() loginDto: LoginDto) {
    return this.appService.login(loginDto)
  }

  @MessagePattern('auth.verify')
  verify(@Payload() authVerify: AuthVerifyDto) {
    return this.appService.verify(authVerify)
  }
}
