declare module 'node-media-server' {
  type EventCallback = (id: string, streamPath: string, args: any) => void;
  type EventNames = 'prePublish';
  type Session = {
    reject: () => void;
  };

  class NMServer {
    constructor(config: NMServer.Config);
    on: (eventName: EventNames, callback: EventCallback) => void;
    run: () => void;
    getSession: (id: string) => Session;
  }

  namespace NMServer {
    type Config = {
      auth: {
        api: boolean;
        play?: boolean;
        publish?: boolean;
        secret?: string;
      };
      rtmp: {
        port: number;
        chunk_size: number;
        gop_cache: boolean;
        ping: number;
        ping_timeout: number;
      };
      http: {
        port: number;
        mediaroot: string;
        allow_origin: string;
        api: boolean;
      };
      trans: {
        ffmpeg: string;
        tasks: [
          {
            app: string;
            hls: boolean;
            hlsFlags: string;
            dash: boolean;
            dashFlags: string;
          },
        ];
      };
    };
  }

  export = NMServer;
}
