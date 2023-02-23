import { IsArray } from "class-validator";

export class DeleteProductDto {
    @IsArray()
    ids: number[];
}