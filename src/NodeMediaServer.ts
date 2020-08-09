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
      if (!isValidStreamKey) {
        console.log(`invalid stream key "${streamKey}"`);
        const session = this.nms.getSession(id);
        session.reject();
      } else {
        this.generateStreamThumbnail(streamKey);
      }
    });
  }

  private generateStreamThumbnail(streamKey: string) {
    const { trans, http } = this.configService.get('nodeMediaServer');

    generateStreamThumbnail({
      streamKey,
      pathToFfmpeg: trans.ffmpeg,
      mediaroot: http.mediaroot,
      app: trans.tasks[0].app,
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
