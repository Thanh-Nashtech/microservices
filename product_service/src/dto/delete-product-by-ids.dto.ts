import { IsArray } from "class-validator";
import { Type } from 'class-transformer';

export class DeleteProductByIdsDto {
    @IsArray()
    @Type(() => Number)
    ids: number[];
}