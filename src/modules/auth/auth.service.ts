import { Injectable, UnauthorizedException } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from '../../utils/dto/AuthDto/register.dto';
import { LoginDto } from '../../utils/dto/AuthDto/login.dto';
import { Users } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(data: RegisterDto): Promise<Users> {
    const { firstName, lastName, email, password } = data;
    const existingUser = await this.usersService.findByEmail(email);
    if (existingUser) {
      throw new UnauthorizedException('Account with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.usersService.createUser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
  }

  async signIn(data: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = data;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
