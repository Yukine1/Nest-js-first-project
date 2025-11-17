import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../utils/Entities/AbstractEntity.entity';
import type { Product } from '../products/products.entity';

@Entity('users')
export class Users extends AbstractEntity {
  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @Column({ type: 'varchar', unique: true, nullable: true })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string;

  @OneToMany('Product', 'user')
  products: Product[];
}
