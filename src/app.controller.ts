import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { ResponseJWTToken, UserCredentials } from './users/types';

// TODO: Move to user module
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req): Promise<ResponseJWTToken> {
    return this.authService.login(req.user)
  }

  @Post('auth/registration')
  async registration(@Body() body: UserCredentials): Promise<ResponseJWTToken> {
    await this.authService.registration(body)
    return this.authService.login(body)
  }
}
