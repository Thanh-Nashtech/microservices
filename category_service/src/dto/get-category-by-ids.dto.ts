import { IsArray } from "class-validator";
import { Type } from 'class-transformer';

export class GetCategoryByIdsDto {
    @IsArray()
    @Type(() => Number)
    ids: number[];
}