import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { PageOptionsDto } from '../../utils/dto/pageDto/page-options.dto';
import { PageDto } from '../../utils/dto/pageDto/page.dto';
import { UserDto } from '../../utils/dto/usersDto/user.dto';
import { Users } from './user.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('all')
  @HttpCode(HttpStatus.OK)
  async getUsers(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Users>> {
    return this.usersService.getUsers(pageOptionsDto);
  }

  @Post('user/create')
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: UserDto): Promise<Users> {
    return this.usersService.createUser(userDto);
  }

  @Put('user/update')
  @HttpCode(HttpStatus.OK)
  async updateUser(
    @Query('id') id: string,
    @Body() userDto: UserDto,
  ): Promise<Users> {
    return this.usersService.updateUser(id, userDto);
  }

  @Delete('user/delete')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Query('id') id: string): Promise<Users> {
    return this.usersService.deleteUser(id);
  }
}
