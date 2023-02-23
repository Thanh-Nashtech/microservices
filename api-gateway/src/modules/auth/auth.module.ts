import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
require('dotenv').config();

@Module({
  imports: [
    ClientsModule.register([
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
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
