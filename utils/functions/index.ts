export const parseVideoId = (url: string) => {
  const regex = /(?:\/|v=)([A-Za-z0-9_-]{11})/;

  const match = url?.match(regex);

  if (match && match[1]) {
    return match[1];
  }

  return '';
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
