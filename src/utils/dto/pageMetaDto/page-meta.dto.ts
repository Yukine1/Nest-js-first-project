import { ApiProperty } from '@nestjs/swagger';
import { PageMetaDtoParameters } from '../../interfaces/page-meta-dto.interface';
import { DefaultPageParamsEnum } from '../../enums/defaultPageParams.enum';

export class PageMetaDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  take: number;

  @ApiProperty()
  itemCount: number;

  @ApiProperty()
  pageCount: number;

  @ApiProperty()
  hasPreviousPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;

  constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
    this.page = pageOptionsDto.page ?? DefaultPageParamsEnum.DEFAULT_PAGE;
    this.take = pageOptionsDto.take ?? DefaultPageParamsEnum.DEFAULT_TAKE;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(itemCount / this.take);
    this.hasPreviousPage = this.page > DefaultPageParamsEnum.DEFAULT_PAGE;
    this.hasNextPage = this.page < this.pageCount;
  }
}
