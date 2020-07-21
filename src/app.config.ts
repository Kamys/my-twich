import { Injectable } from '@nestjs/common';

type AppConfigData = {
  jwtSecret: string,
}

// TOOD: load security config from .env 
@Injectable()
export class AppConfig {
  private readonly config: AppConfigData;

  constructor() {
    this.config = {
      jwtSecret: 'qw8eyrv36q7ry4098&T&^yn09m8dfu',
    }
  }

  get<T extends keyof AppConfigData>(key: T): AppConfigData[T] {
    return this.config[key];
  }
}