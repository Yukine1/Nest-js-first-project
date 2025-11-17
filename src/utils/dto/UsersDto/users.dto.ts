import { IsArray, IsEmail, IsString, IsUUID } from 'class-validator';
import { ProductDto } from '../ProductsDto/products.dto';

export class UsersDto {
  @IsUUID('4')
  id: number;

  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsArray()
  products: ProductDto[];
}
