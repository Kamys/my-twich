import { Injectable } from '@nestjs/common';
import { NodeMediaServerConfig } from 'node-media-server';

type AppConfigData = {
  jwtSecret: string;
  nodeMediaServer: NodeMediaServerConfig;
};

// TOOD: load security config from .env
@Injectable()
export class ConfigService {
  private readonly config: AppConfigData;

  constructor() {
    this.config = {
      jwtSecret: 'qw8eyrv36q7ry4098&T&^yn09m8dfu',
      nodeMediaServer: {
        auth: {
          api: false,
        },
        rtmp: {
          port: 1935,
          chunk_size: 60000,
          gop_cache: true,
          ping: 60,
          ping_timeout: 30,
        },
        http: {
          port: 8888,
          mediaroot: './media',
          allow_origin: 'http://localhost/',
          api: false,
        },
        trans: {
          ffmpeg: '/usr/bin/ffmpeg',
          tasks: [
            {
              app: 'live',
              hls: true,
              hlsFlags:
                '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
              dash: true,
              dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
            },
          ],
        },
      },
    };
  }

  get<T extends keyof AppConfigData>(key: T): AppConfigData[T] {
    return this.config[key];
  }
}
