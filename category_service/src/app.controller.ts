import { Controller, Body, UseGuards, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateCategoryDto } from './dto/create-category.dto';
import { GetCategoryByIdDto } from './dto/get-category-by-id.dto';
import { GetCategoryByIdsDto } from './dto/get-category-by-ids.dto';
import { GetRequestQueryDto } from './dto/base/get-request-query.dto';
import { DeleteCategoryByIdsDto } from './dto/delete-category-by-ids.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('category.create')
  createCategory(@Payload() createCategoryDto: CreateCategoryDto) {
    return this.appService.createCategory(createCategoryDto);
  }

  @MessagePattern('category.getList')
  getCategory(@Payload() query: GetRequestQueryDto) {
    return this.appService.getCategoryList(query);
  }

  @MessagePattern('category.getById')
  getCategoryById(@Payload() getCategoryByIdDto: GetCategoryByIdDto) {
    return this.appService.getById(getCategoryByIdDto.id);
  }

  @MessagePattern('category.deleteCategoryByIds')
  deleteCategoryByIds(@Payload() deleteCategoryByIdDto: DeleteCategoryByIdsDto) {
    return this.appService.deleteByIds(deleteCategoryByIdDto.ids);
  }

  @MessagePattern('category.getByIds')
  getCategoryByIds(@Payload() getCategoryByIdDto: GetCategoryByIdsDto) {
    return this.appService.getByIds(getCategoryByIdDto.ids);
  }


  @MessagePattern('category.test')
  test() {
    return 'Test success';
  }
}
