import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CreateProductEntity,
  ProductsEntity,
  UpdateProductEntity,
} from './entities/products.entity';
import { DeleteResult, Repository } from 'typeorm';
import { PaginationDto, ProductDto } from './dto/products.dto';
import { Pagination } from '../../utils/utils';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
  ) {}

  // async create(data: ProductDto): Promise<ProductsEntity> {
  //   const product = this.productsRepository.create({
  //     name: data.name,
  //     description: data.description,
  //     price: data.price,
  //     pictureUrl: data.pictureUrl,
  //   });
  //   return await this.productsRepository.save(product);
  // }

  async create(data: ProductDto): Promise<CreateProductEntity> {
    const product = this.productsRepository.create(data);
    return await this.productsRepository.save(product);
  }

  // TODO: Implement pagination for products
  async findWithQueryParams(
    paginationDto: PaginationDto,
  ): Promise<Pagination<ProductsEntity[]>> {
    const { limit = 10, offset = 0 } = paginationDto;

    const [products, total] = await this.productsRepository.findAndCount({
      take: limit,
      skip: offset,
    });

    const pagination = {
      total,
      page: Math.floor(offset / limit) + 1,
      limit,
      nextPage:
        offset + limit < total
          ? Math.floor((offset + limit) / limit) + 1
          : null,
    };

    return {
      data: products,
      pagination,
    };
  }

  async findAll(): Promise<Pagination<ProductsEntity[]>> {
    const [data, total] = await this.productsRepository.findAndCount();

    const pagination = {
      total,
      page: 1,
    };

    return {
      pagination,
      data,
    };
  }

  async findById(id: string): Promise<ProductsEntity | null> {
    return await this.productsRepository.findOneBy({ id });
  }

  async update(id: string, data: ProductDto): Promise<UpdateProductEntity> {
    const existingProduct = await this.productsRepository.findOneBy({ id });
    if (existingProduct) {
      const updatedProduct = this.productsRepository.merge(
        existingProduct,
        data,
      );
      return this.productsRepository.save(updatedProduct);
    } else {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  async delete(id: string): Promise<DeleteResult> {
    const existingProduct = await this.productsRepository.findOneBy({ id });
    if (existingProduct) {
      return this.productsRepository.delete(id);
    } else {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }
}
