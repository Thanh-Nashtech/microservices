import {  IsNumber } from "class-validator";
export class GetUserRolesDto {
  @IsNumber()
  userId: number;
}