import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { UserCreateParam } from './users/types';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  
  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }

  @Post('auth/registration')
  async registration(@Body() body: UserCreateParam) {
    const newUser = await this.authService.registration(body)
    return this.authService.login(newUser)
  }
}
