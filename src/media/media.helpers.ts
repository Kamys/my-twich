const FIRST_MEDIA_FILE_NAME = 'index.m3u8';
const MEDIA_FILE_REGEX = /index([-.0-9]+)\.ts/;

/**
 * This validation need for limitations available media file name.
 */
export const validateMediaFileName = (fileName: string): boolean => {
  if (fileName === FIRST_MEDIA_FILE_NAME) {
    return true;
  }

  return MEDIA_FILE_REGEX.test(fileName);
};
