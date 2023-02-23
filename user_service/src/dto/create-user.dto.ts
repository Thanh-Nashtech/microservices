import { IsString, IsOptional, ValidateNested, Min } from "class-validator";
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
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @Min(8)
  password : string;

  @IsOptional()
  @Type(() => Address)
  @ValidateNested({ each: true })
  addresses: Address[];
}