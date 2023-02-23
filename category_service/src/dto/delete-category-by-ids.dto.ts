import { IsArray } from "class-validator";
import { Type } from 'class-transformer';

export class DeleteCategoryByIdsDto {
    @IsArray()
    @Type(() => Number)
    ids: number[];
}