export class GetRequestQueryDto {
    page?: number;
    limit?: number;
    search?: string;
    order?: string;
    noPagination: boolean;
}