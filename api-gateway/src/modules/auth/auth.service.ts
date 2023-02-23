import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}
  
  async login(loginDto: LoginDto) {
    const response = this.client.send('auth.login', loginDto);
    const data = await firstValueFrom(response);
    return data;
  }

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    // return null;
  }
}
