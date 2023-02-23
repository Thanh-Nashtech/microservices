import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entity/user.entity';
import { Permission } from '../enums/permission.enum';
import { PERMISSION_KEY } from '../permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Permission[]>(PERMISSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = <User>request.user;
    if (!user) return false;

    const permissions: number[] = []
    user.roles.forEach((role) => {
      permissions.push(
        ...role.permissions.map((per => per.id))
      )
    })

    return requiredRoles.some((role) => permissions.includes(role));
  }
}