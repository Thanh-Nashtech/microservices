import {  IsArray, IsNumber } from "class-validator";
export class AddRolePermissionDto {
  @IsNumber()
  roleId: number;

  @IsArray()
  permissionIds: number[];
}