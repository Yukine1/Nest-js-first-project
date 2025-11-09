import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsEntity } from './entities/products.entity';
import { Repository } from 'typeorm';
import { PaginationDto, ProductDto } from './dto/products.dto';
import { Pagination } from '../../utils/utils';
import { ProductsFactory } from './products.factory';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductsEntity)
    private readonly productsRepository: Repository<ProductsEntity>,
    private readonly productsFactory: ProductsFactory,
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

  async create(data: ProductDto): Promise<ProductsEntity> {
    const product = this.productsFactory.createProduct(data);
    return await this.productsRepository.save(product);
  }

  async findAll({
    page,
    offset,
  }: PaginationDto): Promise<Pagination<ProductsEntity[]>> {
    const [data, total] = await this.productsRepository.findAndCount({
      skip: (page - 1) * offset,
      take: offset,
    });

    return {
      total: Math.ceil(total / offset) - 1,
      page,
      data,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number) {
    return `This action updates a #${id} product`;
  }

  delete(id: number) {
    return `This action removes a #${id} product`;
  }
}
