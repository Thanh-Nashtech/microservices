import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { PermissionModule } from './modules/permission/permission.module';
import { RoleModule } from './modules/role/role.module';
import { ProductModule } from './modules/product/product.module';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CATEGORY_SERVICE',
        transport: Transport.NATS,
        options: {
          servers: [process.env.NATS_SERVER_URL],
          token: process.env.NATS_TOKEN
        },
      },
    ]),
    UserModule,
    CategoryModule,
    ProductModule,
    AuthModule,
    UserModule,
    PermissionModule,
    RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
