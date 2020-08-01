import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UserCredentials } from '../users/users.types';
import { ResponseJWTToken } from './auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<ResponseJWTToken> {
    return this.authService.login(req.user);
  }

  @Post('registration')
  async registration(@Body() body: UserCredentials): Promise<ResponseJWTToken> {
    await this.authService.registration(body);
    return this.authService.login(body);
  }
}
