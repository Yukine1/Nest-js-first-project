import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginationDto, ProductDto } from './dto/products.dto';
import { Pagination, Product } from '../../utils/utils';
import { ProductsEntity } from './entities/products.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<Pagination<ProductsEntity[]>> {
    return await this.productsService.findAll(query);
  }

  // @Get(':id')
  // async findById(@Param() params): Promise<Product> {
  //   return await this.productsService.findOne(params.id);
  // }

  @Post()
  async createProduct(@Body() product: ProductDto): Promise<ProductsEntity> {
    return await this.productsService.create(product);
  }

  // @Put(':id')
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateProductDto: ProductDto,
  // ): Promise<Product> {
  //   return await this.productsService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // async delete(@Param('id') id: string): Promise<void> {
  //   return await this.productsService.delete(+id);
  // }
}
