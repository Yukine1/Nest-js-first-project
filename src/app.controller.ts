import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './utils/guards/jwt/jwt.stratagy';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Public route - no authentication required
  @Public()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // Protected route - requires authentication (JWT token)
  @Get('profile')
  getProfile(@Request() req) {
    // The user payload from JWT is available in req.user
    return {
      message: 'This is a protected route',
      user: req.user,
    };
  }
}
