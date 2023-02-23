import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entity/product.entity';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NotFoundException } from '@nestjs/common/exceptions';
import { GetRequestQueryDto } from './dto/get-request-query.dto';
import { calculatePaginationOffset } from './utils/pagination';
import { toPaginationResponse, toResponse } from './utils/to-response';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
    @Inject('CATEGORY_SERVICE') private client: ClientProxy
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  async createProduct(createProductDto: CreateProductDto){
    const { categoryId } = createProductDto;
    const category = await firstValueFrom(this.client.send('category.getById', { id: categoryId }));
    if (!category) throw new NotFoundException('Category not found');

    const product = this.productRepo.create({
      ...createProductDto,
    });
    await this.productRepo.save(product);
    return toResponse({
      ...product,
      category
    });
  }

  async getProduct(query: GetRequestQueryDto){
    const calculatedPaginationOffset = calculatePaginationOffset(query);

    const queryBuilder = this.productRepo.createQueryBuilder('product');

    if (query.search) {
      queryBuilder.where('LOWER(product.name) LIKE :name', {name: `%${query.search.toLowerCase()}%`})
    }

    if (calculatedPaginationOffset) {
      queryBuilder.skip(calculatedPaginationOffset.skip);
      queryBuilder.take(calculatedPaginationOffset.take);
    }

    const [products, count] = await queryBuilder.getManyAndCount();

    const categoryIds =products.map((product) => product.categoryId);
    const categories = await firstValueFrom(this.client.send('category.getByIds', { ids: categoryIds }));

    const productCate = products.map((product) => {
      //map category to product list
      return {
        ...product,
        category: categories.find((category) => (category.id === product.categoryId))
      }
    })

    return toPaginationResponse([productCate, count], query);
  }

  async deleteByIds(ids: number[]) {
    return this.productRepo.delete({
      id: In(ids)
    })
  }
}
 