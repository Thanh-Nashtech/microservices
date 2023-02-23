import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
require('dotenv').config();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
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
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
