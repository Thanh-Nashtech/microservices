import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { GetRequestQueryDto } from './dto/base/get-request-query.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entity/category.entity';
import { calculatePaginationOffset } from './utils/pagination';
import { toPaginationResponse, toResponse } from './utils/to-response';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepo.create({
      ...createCategoryDto,
    });
    await this.categoryRepo.save(category);
    return category;
  }

  async getCategoryList(query: GetRequestQueryDto) {
    const calculatedPaginationOffset = calculatePaginationOffset(query);

    const queryBuilder = this.categoryRepo.createQueryBuilder('category');

    if (query.search) {
      queryBuilder.where('LOWER(category.name) LIKE :name', {name: `%${query.search.toLowerCase()}%`})
    }

    if (calculatedPaginationOffset) {
      queryBuilder.skip(calculatedPaginationOffset.skip);
      queryBuilder.take(calculatedPaginationOffset.take);
    }

    const result = await queryBuilder.getManyAndCount();
    return toPaginationResponse(result, query);
  }

  async getById(id: number) {
    return toResponse(
      await this.categoryRepo.findOne({
        where: {
          id,
        },
      }),
    );
  }

  async getByIds(ids: number[]) {
    return toResponse(
      await this.categoryRepo.find({
        where: {
          id: In(ids)
        },
      }),
    );
  }


  async deleteByIds(ids: number[]) {
    return this.categoryRepo.delete({
      id: In(ids)
    })
  }

}
