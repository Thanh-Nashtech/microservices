export class GetRequestQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    order?: string;
    noPagination?: boolean;
}

export class RawGetRequestQueryDto {
    page?: string;
    limit?: string;
    search?: string;
    order?: string;
    noPagination?: string;
}