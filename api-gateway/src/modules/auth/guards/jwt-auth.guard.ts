import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    if (!authorization) throw new UnauthorizedException();
    const [type, accessToken] = authorization.split(' ');
    if (!type || !accessToken) throw new UnauthorizedException();
    const authRes = this.client.send('auth.verify', { accessToken });
    const user = await firstValueFrom(authRes);
    if (!user) throw new UnauthorizedException();
    request.user = user;
    return true;
  }
}
