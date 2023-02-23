import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { GET_REQUEST_CONFIG } from 'src/configs/get-list-request.config';
import { GetRequestQueryDto, RawGetRequestQueryDto } from '../dto/get-request-query.dto';

@Injectable()
export class GetRequestPipe implements PipeTransform {
  transform(value: RawGetRequestQueryDto) {
    const { limit, page, noPagination, search, order } = value;

    const transformedValue: GetRequestQueryDto = {
      search, order
    };

    if (limit === null || limit === undefined) {
      transformedValue.limit = GET_REQUEST_CONFIG.DEFAULT_LIMIT;
    } else {
      transformedValue.limit = Number(limit);
    }

    if (page === null || page === undefined) {
      transformedValue.page = GET_REQUEST_CONFIG.DEFAULT_PAGE;
    } else {
      transformedValue.page = Number(page);
    }

    if (noPagination === null || noPagination === undefined) {
      transformedValue.noPagination = false;
    } else {
      transformedValue.noPagination = (value.noPagination === 'true');
    }

    return transformedValue;
  }
}
