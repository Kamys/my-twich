import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';
import {
  Controller,
  Get,
  Param,
  Res,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { validateMediaFileName } from './media.helpers';
import { ConfigService } from '@/config/config.service';

@Controller('media')
export class MediaController {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {}

  @Get('broadcasts/:userName/:fileName')
  async getByUser(
    @Res() res: Response,
    @Param() params: { userName: string; fileName: string },
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

    const fullPathToBroadcasts = this.configService.get('fullPathToBroadcasts');

    const fullPathToRequestFile = path.join(
      fullPathToBroadcasts,
      user.streamKey,
      fileName,
    );

    if (!fs.existsSync(fullPathToRequestFile)) {
      throw new NotFoundException(`File ${fileName} not found.`);
    }

    res.sendFile(fullPathToRequestFile);
  }

  @Get('broadcasts')
  async getAll(): Promise<any> {
    const users = await this.usersService.getAllStreamers();
    return users.map(user => {
      return {
        id: user.id,
        username: user.username,
      };
    });
  }
}
