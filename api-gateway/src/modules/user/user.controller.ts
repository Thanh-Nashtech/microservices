import { Controller, Post, Body, ValidationPipe, Get, Param, UseGuards, ForbiddenException } from '@nestjs/common';
import { ROOT_ID } from 'src/common/constants/special-user-id.constant';
import { Permission } from 'src/common/enums/permission.enum';
import { Role } from 'src/common/enums/role.enum';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { Permissions } from 'src/common/permission.decorator';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}
    
    @Permissions(Permission.User_Add)
    @UseGuards(AuthGuard, PermissionGuard)
    @Post()
    createUser(@Body(ValidationPipe) createUserDto: CreateUserDto){
        return this.userService.createUser(createUserDto);
    }

    // @Permissions(Permission.User_Get)
    // @UseGuards(AuthGuard, PermissionGuard)
    @Get()
    getUser(){
        return this.userService.getUsers();
    }

    @Permissions(Permission.User_Get)
    @UseGuards(AuthGuard, PermissionGuard)
    @Get(':userId/role-permission')
    getUserRoles(@Param('userId') userId: number){
        return this.userService.getUserRoles(userId);
    }

    @Post('role')
    updateUserRoles(@Body(ValidationPipe) body: UpdateUserRoleDto){
        if (body.userId === ROOT_ID) return new ForbiddenException()
        return this.userService.updateUserRoles(body);
    }

    @Get('role-permission')
    getUserRolePermission(){
        return this.userService.getUserRolesPermission();
    }
}
