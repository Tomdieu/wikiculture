export const calculateReadingTime = (articleContent: string) => {
  const words = articleContent.split(" ");
  const word_count = words.length;
  const averageReadingSpeed = 200;
  const readingTimeMinute = word_count / averageReadingSpeed;
  return Math.round(readingTimeMinute);
};
