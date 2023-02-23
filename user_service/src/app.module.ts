import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Address } from './entity/address.entity';
import { ProductModule } from './modules/product/product.module';
import { Role } from './entity/role.entity';
import { Permission } from './entity/permission.entity';
import { PermissionModule } from './modules/permission/permission.module';
require('dotenv').config();

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
        entities: [User, Address, Role, Permission],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Address, Role, Permission]),
    ProductModule,
    PermissionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
