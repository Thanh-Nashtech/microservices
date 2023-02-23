import {  IsArray, IsNumber } from "class-validator";
export class AddUserPermissionDto {
  @IsNumber()
  roleId: number;

  @IsArray()
  permissionIds: number[];
}