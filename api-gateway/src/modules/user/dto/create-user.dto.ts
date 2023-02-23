import { IsString, IsOptional, ValidateNested, MinLength } from "class-validator";
import { Type } from 'class-transformer';

export class Address {
    @IsString()
    @IsOptional()
    line1: string;

    @IsString()
    @IsOptional()
    line2: string;

    @IsString()
    city: string;

    @IsString()
    country: string;
}

export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @Type(() => Address)
  @ValidateNested({ each: true })
  addresses: Address[];
}