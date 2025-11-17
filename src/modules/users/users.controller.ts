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
import { UsersService } from './users.service';
import { PageOptionsDto } from '../../utils/dto/PageDto/page-options.dto';
import { PageDto } from '../../utils/dto/PageDto/page.dto';
import { UserDto } from '../../utils/dto/UsersDto/user.dto';
import { Users } from './user.entity';

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
