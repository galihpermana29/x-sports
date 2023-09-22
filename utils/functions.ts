export const parseVideoId = (url: string) => {
  const regex = /(?:\/|v=)([A-Za-z0-9_-]{11})/;

  const match = url?.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return '';
};
