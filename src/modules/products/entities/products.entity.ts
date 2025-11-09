import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductsEntity {
  constructor(
    name?: string,
    description?: string,
    price?: number,
    pictureUrl?: string,
  ) {}

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  pictureUrl: string;
}
