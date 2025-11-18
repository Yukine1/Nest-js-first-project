import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ProductDto } from '../../utils/dto/productsDto/products.dto';
import { PageOptionsDto } from '../../utils/dto/pageDto/page-options.dto';
import { PageMetaDto } from '../../utils/dto/pageMetaDto/page-meta.dto';
import { PageDto } from '../../utils/dto/pageDto/page.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  async create(data: ProductDto): Promise<Product> {
    const product = this.productsRepository.create(data);
    return await this.productsRepository.save(product);
  }

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Product>> {
    const queryBuilder = this.productsRepository.createQueryBuilder('products');

    queryBuilder
      .orderBy('products.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async findById(id: string): Promise<Product | null> {
    return await this.productsRepository.findOneBy({ id });
  }

  async update(id: string, data: ProductDto): Promise<Product> {
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
