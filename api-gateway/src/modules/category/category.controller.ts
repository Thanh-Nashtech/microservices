import { Controller, Post, Body, ValidationPipe, Get, UseGuards, Req, Query, Delete  } from '@nestjs/common';
import { GetRequestQueryDto } from 'src/common/dto/get-request-query.dto';
import { PermissionGuard } from 'src/common/guards/permission.guard';
import { Permissions } from 'src/common/permission.decorator';
import { GetRequestPipe } from 'src/common/pipes/get-request.pipe';
import { Request } from 'src/common/request.dto';
import { Permission } from '../../common/enums/permission.enum';

import { AuthGuard } from '../auth/guards/jwt-auth.guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { DeleteCategoryDto } from './dto/delete-category.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}

    @Permissions(Permission.Category_Add)
    @UseGuards(AuthGuard, PermissionGuard)
    @Post()
    createCategory(@Body(ValidationPipe) createCategory: CreateCategoryDto, @Req() request: Request) {
        return this.categoryService.createCategory(createCategory); 
    }

    @Permissions(Permission.Category_Get)
    @UseGuards(PermissionGuard)
    @UseGuards(AuthGuard)
    @Get()
    getCategory(@Query(GetRequestPipe) query: GetRequestQueryDto) {
        return this.categoryService.getCategory(query); 
    }


    @Permissions(Permission.Category_Delete)
    @UseGuards(PermissionGuard)
    @UseGuards(AuthGuard)
    @Delete()
    deleteCategory(@Body(ValidationPipe) body: DeleteCategoryDto) {
        return this.categoryService.delete(body); 
    }
}