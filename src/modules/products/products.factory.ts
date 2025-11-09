import { ProductsEntity } from './entities/products.entity';

export class ProductsFactory {
  createProduct(productEntity: ProductsEntity) {
    return new ProductsEntity(
      productEntity.name,
      productEntity.description,
      productEntity.price,
      productEntity.pictureUrl,
    );
  }
}
