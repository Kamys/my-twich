import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/users.entity';
import { MediaModule } from './media/media.module';

// TODO: Get TypeOrmModule setting from ConfigService
@Module({
  imports: [
    MediaModule,
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'root',
      password: '123456',
      database: 'postgres',
      entities: [User],
      synchronize: true,
    }),
  ],
  providers: [],
  exports: [],
})
export class AppModule {}
