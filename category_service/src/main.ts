import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: { 
        servers: 'nats://vps.thanhphanit.com:4222',
        token: 's3cr3t'
      },
    },
  );
  await app.listen();
  Logger.log('Category service starting successfully');
}
bootstrap();
