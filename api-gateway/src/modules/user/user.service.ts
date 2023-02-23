import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';

@Injectable()
export class UserService {
    constructor(@Inject('USER_SERVICE') private client: ClientProxy) {}
    
    createUser(createUserDto: CreateUserDto){
        return this.client.send('user.create', createUserDto)
    }

    getUsers(){
        return this.client.send('user.get', {});
    }

    getUserRoles(userId: number){
        return this.client.send('user.getRoles', { userId });
    }

    updateUserRoles(dto: UpdateUserRoleDto){
        return this.client.send('user.updateUserRoles', dto);
    }

    getUserRolesPermission(){
        return this.client.send('user.getUserRolesV2', {});
    }
}
