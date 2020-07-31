import * as path from 'path';
import { Response, Request } from 'express';
import {
  Controller,
  Get,
  Param,
  Res,
  Req,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { validateMediaFileName } from './media.helpers';

@Controller()
export class MediaController {
  constructor(private usersService: UsersService) {}

  @Get('media/broadcast/:userName/:fileName')
  async getByUser(
    @Req() req: Request,
    @Res() res: Response,
    @Param() params,
  ): Promise<void> {
    const { userName, fileName } = params;
    const user = await this.usersService.findOne(userName);

    const isFileNameValid = validateMediaFileName(fileName);

    if (!isFileNameValid) {
      throw new BadRequestException(`Media file name "${fileName}" not valid.`);
    }
    if (!user) {
      throw new NotFoundException(`Not found user with username ${userName}`);
    }
    if (!user.isBroadcastOnline) {
      throw new BadRequestException(`User "${userName}" not streaming now`);
    }

    res.sendFile(
      path.join(__dirname, `../../media/live/`, user.streamKey, fileName),
    );
  }

  @Get('media/broadcast')
  async getAll(): Promise<any> {
    const users = await this.usersService.getAllStreamers();
    return users.map(user => {
      return {
        username: user.username,
      };
    });
  }
}
