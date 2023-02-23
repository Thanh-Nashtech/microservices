import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { AuthVerifyDto } from './dto/verify-auth';
import { instanceToPlain } from 'class-transformer';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
    @Inject('AUTH_SERVICE') private client: ClientProxy
  ) {}
   getHello(): string {
    return 'Hello World!';
  }

  async login(loginDto: LoginDto){
    //NEED TO ENCRYPT PASSWORD in real project, this is just an example about authentication flow.
    const user = await this.userRepo.findOne({
      where: {
        email: loginDto.email,
        password: loginDto.password
      }
    });
    if (!user) return new UnauthorizedException({
      message: 'Email or password is not correct'
    })

    const accessToken = await this.jwtService.sign({
      ...instanceToPlain(user)
    }, {
      expiresIn: '3600s'
    });

    return {
      accessToken
    }
  }

  async verify({ accessToken }: AuthVerifyDto){
    try {
      const user = await this.jwtService.verify(accessToken);
      const resData = this.client.send('user.getRoles', { userId: user.id });
      const roles = await firstValueFrom(resData);
      return {
        ...user,
        roles: [...roles.roles]
      };
    } catch (e) {
      return null;
    }
  }
}
