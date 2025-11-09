import { IsNumber, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProductDto {
  @IsUUID()
  id: number;

  @ApiProperty({ example: 'Test Product' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'This is a test product' })
  @IsString()
  description: string;

  @ApiProperty({ example: 19.99 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'http://example.com/product.jpg' })
  @IsString()
  pictureUrl: string;
}

export class PaginationDto {
  @IsNumber()
  page: number;

  @IsNumber()
  offset: number;
}
