import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './user.entity';
import { PageDto } from '../../utils/dto/PageDto/page.dto';
import { PageOptionsDto } from '../../utils/dto/PageDto/page-options.dto';
import { PageMetaDto } from '../../utils/dto/PageMetaDto/page-meta.dto';
import { UserDto } from '../../utils/dto/UsersDto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  public async getUsers(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Users>> {
    const queryBuilder = this.usersRepository.createQueryBuilder('users');

    queryBuilder
      .orderBy('users.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  public async createUser(userDto: UserDto): Promise<Users> {
    const user = this.usersRepository.create(userDto);
    return this.usersRepository.save(user);
  }

  public async updateUser(id: string, userDto: UserDto): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      const updatedUser = this.usersRepository.merge(user, userDto);
      return this.usersRepository.save(updatedUser);
    }
    throw new NotFoundException('User not found!');
  }

  public async deleteUser(id: string): Promise<Users> {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      await this.usersRepository.remove(user);
      return user;
    }
    throw new NotFoundException('User not found!');
  }

  public async findByEmail(email: string): Promise<Users | null> {
    return this.usersRepository.findOne({ where: { email } });
  }
}
