import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
require('dotenv').config();

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return `Hello ${process.env.AUTHOR}`;
  }

  @Get('test')
  test() {
    return this.appService.getTest()
  }
}
