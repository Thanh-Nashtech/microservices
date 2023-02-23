import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Product } from './entity/product.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: 3306,
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASS'),
        database: configService.get<string>('DB_NAME'),
        entities: [Product],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([Product]),
    ClientsModule.register([
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.NATS,
        options: { 
          servers: process.env.NATS_SERVER_URL,
          token: process.env.NATS_TOKEN
        },
      },
    ]),
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
