import * as childProcess from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

type GenerateStreamThumbnailParams = {
  streamKey: string;
  pathToFfmpeg: string;
  fullPathToBroadcasts: string;
};

export const getRootPath = (): string => {
  const pathToSrc = path.dirname(
    require.main.filename || process.mainModule.filename,
  );

  return path.join(pathToSrc, '..');
};

const createDirIfNotExist = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

export const generateStreamThumbnail = (
  param: GenerateStreamThumbnailParams,
): void => {
  const { streamKey, pathToFfmpeg, fullPathToBroadcasts } = param;

  const pathToBroadcast = path.join(fullPathToBroadcasts, streamKey);
  const pathToThumbnails = path.join(pathToBroadcast, `thumbnail.png`);

  createDirIfNotExist(pathToBroadcast);

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
