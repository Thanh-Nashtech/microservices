import { Controller, Get, Inject, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Permission } from 'src/common/enums/permission.enum';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { Permissions } from 'src/common/permission.decorator';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('role')
export class RoleController {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy){}
    
    @Permissions(Permission.Permission_Update)
    @UseGuards(AuthGuard, PermissionGuard)
    @Get()
    getAllRole(){
        return this.client.send('user.getAllRoles', {})
    }
}
