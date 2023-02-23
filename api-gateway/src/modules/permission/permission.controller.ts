import { Body, Controller, Get, Inject, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Permission } from 'src/common/enums/permission.enum';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { Permissions } from 'src/common/permission.decorator';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { AddRolePermissionDto } from './dto/add-role-permission.dto';

@Controller('permission')
export class PermissionController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy){}

    @Permissions(Permission.Permission_Update)
    @UseGuards(AuthGuard, PermissionGuard)
    @Get()
    getAllPermission(){
        return this.client.send('user.getAllPermissions', {})
    }

    @Permissions(Permission.Permission_Update)
    @UseGuards(PermissionGuard)
    @UseGuards(AuthGuard)
    @Post('role-permission')
    AddRolePermission(@Body(ValidationPipe) body: AddRolePermissionDto){
        return this.client.send('user.AddRolePermissions', body)
    }
    
}
