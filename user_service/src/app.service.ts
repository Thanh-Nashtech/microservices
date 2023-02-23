import { Injectable } from '@nestjs/common';
import { NotFoundException, ForbiddenException } from '@nestjs/common/exceptions';
import { InjectRepository } from '@nestjs/typeorm';
import { classToPlain, instanceToPlain } from 'class-transformer';
import { DataSource, In, Repository } from 'typeorm';
import { AddUserPermissionDto } from './dto/add-user-permission.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { Address } from './entity/address.entity';
import { Permission } from './entity/permission.entity';
import { Role } from './entity/role.entity';
import { User } from './entity/user.entity';
import { toResponse } from './utils/to-response';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Address)
    private addressRepo: Repository<Address>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private dataSource: DataSource,
    @InjectRepository(Permission)
    private permissionRepo: Repository<Permission>,
    @InjectRepository(Role)
    private roleRepo: Repository<Role>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createUser(createUserDto: CreateUserDto) {
    //With Transaction
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const { addresses, ...userDto } = createUserDto;
      const user = this.userRepo.create({
        ...userDto,
      });
      await queryRunner.manager.save(user);

      //create and add address to user
      let addressesCreated = [];
      if (addresses) {
        const addressesToCreate = addresses.map((address) => ({
          ...address,
          userId: user.id,
        }));
        addressesCreated = this.addressRepo.create([...addressesToCreate]);
        await queryRunner.manager.save(addressesCreated);
      }
      await queryRunner.commitTransaction();
      return {
        ...instanceToPlain(user),
        addresses: addressesCreated,
      };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async getUsers() {
    const users = await this.userRepo.find({
      order: {
        createdAt: 'DESC'
      },
      relations: {
        addresses: true
      }
    });
    return toResponse(users);
  }

  async getUserRoles(userId: number) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId
      },
      select: {
        id: true
      },
      relations: {
        roles: {
          permissions: true
        },
        
      }
    });

    if (!user) return new NotFoundException();

    return toResponse(user);
  }

  async getAllPermissions() {
    return this.permissionRepo.find({});
  }

  async getAllRoles() {
    return this.roleRepo.find({
      relations: {
        permissions: true
      }
    });
  }

  async addRolePermissions({ roleId, permissionIds }: AddUserPermissionDto) {
    const role = await this.roleRepo.findOne({
      where: {
        id: roleId
      },
      relations: {
        permissions: true
      }
    });

    if(!role) return new NotFoundException();

    const permissions = await this.permissionRepo.find({
      where: {
        id: In(permissionIds)
      }
    });

    role.permissions = [...permissions];
    await this.roleRepo.save(role);

    return role;
  }

  async updateUserRoles({userId, roleIds }: UpdateUserRoleDto) {
    const user = await this.userRepo.findOne({
      where: {
        id: userId
      },
      select: {
        id: true
      },
      relations: {
        roles: true
      }
    });

    if (!user) return new NotFoundException();

    const roles = await this.roleRepo.find({
      where: {
        id: In(roleIds)
      }
    });

    user.roles = [...roles];

    await this.userRepo.save(user);

    return toResponse(user);
  }

  async getUserRolesV2() {
    //get all users;
    const user = await this.userRepo.find({
      relations: {
        roles: {
          permissions: true
        },
      }
    });
    if (!user) return new NotFoundException();
    return toResponse(user);
  }
}
