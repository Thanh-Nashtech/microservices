import { instanceToPlain } from "class-transformer";

export function toResponse (data: any) {
    return instanceToPlain(data);
}