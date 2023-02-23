import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Query, Delete} from '@nestjs/common';
import { GetRequestQueryDto } from 'src/common/dto/get-request-query.dto';
import { Permission } from 'src/common/enums/permission.enum';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { Permissions } from 'src/common/permission.decorator';
import { GetRequestPipe } from 'src/common/pipes/get-request.pipe';
import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { DeleteProductDto } from './dto/delete-product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService ){}

    @Permissions(Permission.Product_Add)
    @UseGuards(AuthGuard, PermissionGuard)
    @Post()
    createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto) {
        return this.productService.createProduct(createProductDto);
    }

    @Permissions(Permission.Product_Get)
    @UseGuards(AuthGuard, PermissionGuard)
    @Get()
    getProduct(@Query(GetRequestPipe) query: GetRequestQueryDto) {
        return this.productService.getProduct(query);
    }

    @Permissions(Permission.Product_Delete)
    @UseGuards(AuthGuard, PermissionGuard)
    @Delete()
    deleteProduct(@Body(ValidationPipe) body: DeleteProductDto) {
        return this.productService.deleteProduct(body);
    }
}
