import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices/enums';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: { 
        servers: process.env.NATS_SERVER_URL,
        token: process.env.NATS_TOKEN
      },
    }
  );
  await app.listen();
}
bootstrap();
