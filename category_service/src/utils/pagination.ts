export const isNullOrUndefined = (value: any) => {
  if (value === null || value === undefined) return true;
  return false;
}

export interface CalculatePaginationOffset {
  page?: number;
  limit?: number;
  noPagination?: boolean;
}

export function calculatePaginationOffset ({ page, limit, noPagination }: CalculatePaginationOffset) {
  if (noPagination || isNullOrUndefined(page) || isNullOrUndefined(limit)) return null;
  return {
    take: limit,
    skip: (page - 1) * limit,
  }
}