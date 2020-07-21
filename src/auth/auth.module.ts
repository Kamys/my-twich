import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule } from 'src/config/config.module';
import { ConfigService } from 'src/config/config.service';

// TODO: Replase with app.config
export const jwtConstants = {
  secret: 'sd7ifyb8s7ya8sy87dsfm7',
};

console.log('forwardRef:', forwardRef(() => ConfigModule));


@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [forwardRef(() => ConfigModule)],
      inject: [ConfigService],
      useFactory: () => ({
        secret: 'asdsad',
        signOptions: { expiresIn: '60s' },
      }),
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
