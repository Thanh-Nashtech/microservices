import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetRequestQueryDto } from 'src/common/dto/get-request-query.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Injectable()
export class CategoryService {
  constructor(@Inject('CATEGORY_SERVICE') private client: ClientProxy) {}

  createCategory(createCategory: CreateCategoryDto) {
    return this.client.send('category.create', {
      ...createCategory,
    })
  }

  getCategory(query: GetRequestQueryDto) {
    return this.client.send('category.getList', query)
  }

  delete(deleteDto: DeleteCategoryDto) {
    return this.client.send('category.deleteCategoryByIds', deleteDto)
  }
}
