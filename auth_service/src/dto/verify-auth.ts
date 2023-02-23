import { IsString } from "class-validator";

export class AuthVerifyDto {
    @IsString()
    accessToken: string;
}