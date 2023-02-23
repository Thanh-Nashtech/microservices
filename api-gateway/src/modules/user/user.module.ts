import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserService } from './user.service';
require('dotenv').config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVER_URL],
          token: process.env.NATS_TOKEN
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVER_URL],
          token: process.env.NATS_TOKEN
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
