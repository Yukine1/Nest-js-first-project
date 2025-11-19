import { Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { Public } from '../../utils/guards/jwt/jwt.stratagy';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Public()
  @Get()
  async sendMail() {
    await this.mailService.sendEmail({
      subject: 'Welcome to the realm of NestJS',
      template: 'signup-confirmation-template',
      context: {
        name: 'Jhon Doe',
      },
    });
  }
}
