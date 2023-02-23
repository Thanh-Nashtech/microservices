import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('CATEGORY_SERVICE') private proxy: ClientProxy){}
  async getHello() {
    return 'Hello World!'
  }
  async getTest() {
    return this.proxy.send('category.test', {})
  }
}
