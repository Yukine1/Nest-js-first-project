import { IsNumber, IsString, IsUUID } from 'class-validator';

export class ProductDto {
  @IsUUID()
  id: number;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsString()
  pictureUrl: string;
}

export class PaginationDto {
  @IsNumber()
  page: number;

  @IsNumber()
  offset: number;
}
