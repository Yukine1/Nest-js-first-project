import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../utils/Entities/AbstractEntity.entity';
import type { Users } from '../users/user.entity';

@Entity('products_entity')
export class Product extends AbstractEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

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
  pictureUrl: string;

  @ManyToOne('Users', 'products')
  user: Users;
}

@Entity('products_entity')
export class CreateProductEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

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
  pictureUrl: string;
}

@Entity('products_entity')
export class UpdateProductEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

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
