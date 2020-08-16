import * as NMServer from 'node-media-server';
import { UsersService } from './users/users.service';
import { ConfigService } from '@/config/config.service';
import { generateStreamThumbnail } from '@/helpers';

export class NodeMediaServer {
  private nms: NMServer;

  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    const nodeMediaServerConfig = configService.get('nodeMediaServer');
    this.nms = new NMServer(nodeMediaServerConfig);
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
      if (isValidStreamKey) {
        this.generateStreamThumbnail(streamKey);
      } else {
        const session = this.nms.getSession(id);
        session.reject();
      }
    });
  }

  private generateStreamThumbnail(streamKey: string) {
    const fullPathToBroadcasts = this.configService.get('fullPathToBroadcasts');
    const { trans } = this.configService.get('nodeMediaServer');

    setTimeout(() => {
      generateStreamThumbnail({
        streamKey,
        pathToFfmpeg: trans.ffmpeg,
        fullPathToBroadcasts,
      });
    }, 5000);
  }

  private async isValidStreamKey(streamKey: string): Promise<boolean> {
    return this.usersService.isValidStreamKey(streamKey);
  }

  private static getStreamKeyFromStreamPath(path: string) {
    const parts = path.split('/');

    return parts[parts.length - 1];
  }
}
