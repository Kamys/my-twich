import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [MediaController],
})
export class MediaModule {}
