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
import { ProductDto } from '../../utils/dto/ProductsDto/products.dto';
import { Product } from './products.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';
import { PageOptionsDto } from '../../utils/dto/PageDto/page-options.dto';
import { PageDto } from '../../utils/dto/PageDto/page.dto';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @ApiCreatedResponse({
    description: 'Get all products created successfully',
    type: ProductDto,
  })
  @Get('all')
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Product>> {
    return await this.productsService.findAll(pageOptionsDto);
  }

  @ApiOperation({ summary: 'Get product by ID' })
  @ApiCreatedResponse({ description: 'Get product by ID', type: ProductDto })
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Product | null> {
    return await this.productsService.findById(id);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'The products have been successfully created.',
    type: ProductDto,
  })
  @Post('add-product')
  async createProduct(@Body() product: ProductDto): Promise<Product> {
    return await this.productsService.create(product);
  }

  @ApiOperation({ summary: 'Update a product' })
  @ApiCreatedResponse({
    description: 'The product has been successfully updated.',
    type: ProductDto,
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: ProductDto,
  ): Promise<Product> {
    return await this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Delete a product' })
  @ApiResponse({
    status: 204,
    description: 'The product has been successfully deleted.',
  })
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<DeleteResult> {
    return await this.productsService.delete(id);
  }
}
