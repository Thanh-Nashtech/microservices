import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { GetRequestQueryDto } from './dto/get-request-query.dto';
import { DeleteProductByIdsDto } from './dto/delete-product-by-ids.dto';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @MessagePattern('product.create')
  createProduct(@Payload() body: CreateProductDto) {
    return this.appService.createProduct(body);
  }

  @MessagePattern('product.get')
  getProduct(@Payload() query: GetRequestQueryDto) {
    return this.appService.getProduct(query);
  }

  @MessagePattern('product.delete')
  deletProduct(@Payload() payload: DeleteProductByIdsDto) {
    return this.appService.deleteByIds(payload.ids);
  }
}
