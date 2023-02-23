import { IsArray, IsNumber } from "class-validator";

export class UpdateUserRoleDto {
  @IsNumber()
  userId: number;

  @IsArray()
  roleIds: number[];
}