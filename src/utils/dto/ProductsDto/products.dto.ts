import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ProductDto {
  @ApiProperty({ example: 'Test Product' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'This is a test product' })
  @IsString()
  description: string;

  @ApiProperty({ example: 19.99 })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @ApiProperty({ example: 'http://example.com/product.jpg' })
  @IsUrl()
  pictureUrl: string;
}

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  limit?: number;

  @IsOptional()
  @Min(0)
  offset?: number;
}
