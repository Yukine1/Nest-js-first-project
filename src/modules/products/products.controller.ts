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
import { Pagination } from '../../utils/utils';
import { ProductsEntity } from './entities/products.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiCreatedResponse({
    description: 'Get all products created successfully',
    type: ProductDto,
  })
  @Get()
  async findAll(
    @Query() query: PaginationDto,
  ): Promise<Pagination<ProductsEntity[]>> {
    return await this.productsService.findAll(query);
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @ApiCreatedResponse({ description: 'Get product by ID', type: ProductDto })
  @Get(':id')
  async findById(@Param('id') id: number): Promise<ProductsEntity | null> {
    return await this.productsService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'The products have been successfully created.',
    type: ProductDto,
  })
  @Post('add-product')
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
