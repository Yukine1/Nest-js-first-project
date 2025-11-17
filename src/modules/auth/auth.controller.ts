import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from '../../utils/dto/AuthDto/register.dto';
import { LoginDto } from '../../utils/dto/AuthDto/login.dto';
import { Public } from '../../utils/guards/jwt/jwt.stratagy';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async signUp(@Body() data: RegisterDto) {
    return this.authService.signUp(data);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async signIn(@Body() data: LoginDto) {
    return this.authService.signIn(data);
  }
}
