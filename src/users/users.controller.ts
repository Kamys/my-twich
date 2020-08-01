import { Controller, UseGuards, Body, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from '../auth/auth.helpers';
import { UserJwtPayload } from '../auth/auth.types';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async setBroadcastStatus(
    @User() user: UserJwtPayload,
    @Body('isBroadcastOnline') isBroadcastOnline: boolean,
  ): Promise<void> {
    const { username } = user;

    return this.usersService.setIsBroadcastOnline(username, isBroadcastOnline);
  }
}
