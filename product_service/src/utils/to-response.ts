import { instanceToPlain } from "class-transformer";
import { GetRequestQueryDto } from "src/dto/get-request-query.dto";

export function toResponse (data: any) {
    return instanceToPlain(data);
}

export function toPaginationResponse (data: any[], query: GetRequestQueryDto) {
    const [response, count] =  data;
    return {
        page: query.page,
        totalPage: Math.ceil(count / query.limit),
        data: instanceToPlain(response)
    };
}