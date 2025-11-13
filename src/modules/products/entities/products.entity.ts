import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products_entity')
export class ProductsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => (value !== null ? Number(value) : null),
    },
  })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  pictureUrl?: string;
}

@Entity('products_entity')
export class CreateProductEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => (value !== null ? Number(value) : null),
    },
  })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  pictureUrl?: string;
}

@Entity('products_entity')
export class UpdateProductEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    transformer: {
      to: (value: number) => value,
      from: (value: string) => (value !== null ? Number(value) : null),
    },
  })
  price: number;
}
