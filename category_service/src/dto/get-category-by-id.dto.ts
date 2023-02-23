import { IsNumber } from "class-validator";

export class GetCategoryByIdDto {
    @IsNumber()
    id: number;
}