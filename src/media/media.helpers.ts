const FIRST_MEDIA_FILE_NAME = 'index.m3u8';
const THUMBNAIL_FILE_NAME = 'thumbnail.png';
const MEDIA_FILE_REGEX = /index([-.0-9]+)\.ts/;

/**
 * This validation need for limitations available media file name.
 */
export const validateMediaFileName = (fileName: string): boolean => {
  const allowedFiles = [FIRST_MEDIA_FILE_NAME, THUMBNAIL_FILE_NAME];
  if (allowedFiles.includes(fileName)) {
    return true;
  }

  return MEDIA_FILE_REGEX.test(fileName);
};
