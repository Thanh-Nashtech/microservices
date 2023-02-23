import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { GetUserRolesDto } from './dto/get-user-roles';
import { AddUserPermissionDto } from './dto/add-user-permission.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('user.create')
  createUser(createUserDto: CreateUserDto){
    return this.appService.createUser(createUserDto)
  }

  @MessagePattern('user.get')
  getUsers(){
    return this.appService.getUsers()
  }

  @MessagePattern('user.getRoles')
  getUserRoles({ userId }: GetUserRolesDto){
    return this.appService.getUserRoles(userId)
  }

  @MessagePattern('user.getAllPermissions')
  getAllPermissions(){
    return this.appService.getAllPermissions()
  }

  @MessagePattern('user.getAllRoles')
  getAllRoles(){
    return this.appService.getAllRoles()
  }

  @MessagePattern('user.AddRolePermissions')
  addRolePermissions(data: AddUserPermissionDto){
    return this.appService.addRolePermissions(data);
  }

  @MessagePattern('user.updateUserRoles')
  updateUserRoles(data: UpdateUserRoleDto){
    return this.appService.updateUserRoles(data);
  }

  @MessagePattern('user.getUserRolesV2')
  getUserRoleV2(data: UpdateUserRoleDto){
    return this.appService.getUserRolesV2();
  }
}
