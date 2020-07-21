import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AppConfig } from 'src/app.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(appConfig: AppConfig) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: appConfig.get('jwtSecret'),
    });
  }

  async validate(payload: any) {
    return payload;
  }
}