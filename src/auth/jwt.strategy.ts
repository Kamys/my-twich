import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { UserJwtPayload } from '../users/users.types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(appConfig: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.get('jwtSecret'),
    });
  }

  async validate(payload: any): Promise<UserJwtPayload> {
    return { userId: payload.sub, username: payload.username };
  }
}
