import * as childProcess from 'child_process';
import * as path from 'path';

type GenerateStreamThumbnailParams = {
  streamKey: string;
  pathToFfmpeg: string;
  mediaroot: string;
  app: string;
};

export const generateStreamThumbnail = (
  param: GenerateStreamThumbnailParams,
): void => {
  const { streamKey, pathToFfmpeg, mediaroot, app } = param;
  console.log(`generateStreamThumbnail: ${streamKey}`);
  const pathToThumbnails = path.join(
    mediaroot,
    app,
    streamKey,
    `${streamKey}.png`,
  );

  const args = [
    '-y',
    '-i',
    `http://127.0.0.1:8888/live/${streamKey}/index.m3u8`,
    '-ss',
    '00:00:01',
    '-vframes',
    '1',
    '-vf',
    'scale=-2:300',
    pathToThumbnails,
  ];

  childProcess
    .spawn(pathToFfmpeg, args, {
      detached: true,
      stdio: 'ignore',
    })
    .on('exit', (...args) => console.log('exit: ', args))
    .on('error', (...args) => console.log('error: ', args))
    .on('message', (...args) => console.log('message: ', args));
};
