import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/entity/address.entity';
import { User } from '../entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const configService = new ConfigService();
        return {
          type: 'mysql',
          host: configService.get('DB_HOST') || 'localhost',
          port: configService.get('DB_PORT') ? parseInt(configService.get('DB_PORT')) : 3306,
          username: configService.get('DB_USER') || 'root',
          password: configService.get('DB_PASS') || '',
          database: configService.get('DB_NAME') || 'microservices_user',
          entities: [User, Address],
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
