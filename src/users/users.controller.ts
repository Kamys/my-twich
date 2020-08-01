import { Controller, Post, UseGuards, Body, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCredentials, UserJwtPayload } from './users.types';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

// TODO: Move to user module
@Controller()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Post('users/me/broadcast/status')
  async setBroadcastStatus(
    @Request() req,
    @Body('status') status: boolean,
  ): Promise<void> {
    console.log('setBroadcastStatus ', req.user);
    const user: UserJwtPayload = req.user;
    const { username } = user;
    return this.usersService.setBroadcastStatus(username, status);
  }
}
