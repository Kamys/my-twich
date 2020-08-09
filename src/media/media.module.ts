import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { UsersModule } from '@/users/users.module';
import { ConfigModule } from '@/config/config.module';

@Module({
  imports: [UsersModule, ConfigModule],
  controllers: [MediaController],
})
export class MediaModule {}
