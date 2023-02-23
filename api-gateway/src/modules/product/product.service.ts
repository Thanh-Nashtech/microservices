import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { GetRequestQueryDto } from 'src/common/dto/get-request-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';

@Injectable()
export class ProductService {
  constructor(@Inject('PRODUCT_SERVICE') private client: ClientProxy) {}

    createProduct(createProductDto: CreateProductDto) {
        return this.client.send('product.create', createProductDto)
    }

    getProduct(query: GetRequestQueryDto) {
        return this.client.send('product.get', query)
    }

    deleteProduct(body: DeleteProductDto) {
        return this.client.send('product.delete', body)
    }
}
