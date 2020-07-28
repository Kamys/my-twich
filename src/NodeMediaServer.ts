import * as NMServer from 'node-media-server';
import { Config } from 'node-media-server';
import { UsersService } from './users/users.service';

//TODO; move in config service
const config: Config = {
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
        hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
        dash: true,
        dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
      },
    ],
  },
};

export class NodeMediaServer {
  private nms: NMServer;

  constructor(private usersService: UsersService) {
    this.nms = new NMServer(config);
  }

  init(): void {
    this.nms.run();

    this.nms.on('prePublish', async (id, streamPath, args) => {
      console.log(
        'prePublish',
        `id=${id} StreamPath=${streamPath} args=${JSON.stringify(args)}`,
      );
      const streamKey = NodeMediaServer.getStreamKeyFromStreamPath(streamPath);
      const isValidStreamKey = await this.isValidStreamKey(streamKey);
      if (!isValidStreamKey) {
        console.log(`invalid stream key "${streamKey}"`);
        const session = this.nms.getSession(id);
        session.reject();
      } else {
        console.log(`valid stream key ${streamKey}`);
      }
    });
  }

  private async isValidStreamKey(streamKey: string): Promise<boolean> {
    return this.usersService.isValidStreamKey(streamKey);
  }

  private static getStreamKeyFromStreamPath(path: string) {
    const parts = path.split('/');

    return parts[parts.length - 1];
  }
}
