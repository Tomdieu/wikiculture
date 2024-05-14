export const formatTimeSincePost = (postCreatedAt: string): string => {
    const now: Date = new Date();
    const createdAt: Date = new Date(postCreatedAt);
    const diffInSeconds: number = Math.floor((now.getTime() - createdAt.getTime()) / 1000);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s ago`;
    } else if (diffInSeconds < 3600) {
      const diffInMinutes: number = Math.floor(diffInSeconds / 60);
      return `${diffInMinutes}min ago`;
    } else if (diffInSeconds < 86400) {
      const diffInHours: number = Math.floor(diffInSeconds / 3600);
      return `${diffInHours}hrs ago`;
    } else if (diffInSeconds < 172800) {
      return "yesterday";
    } else {
      const diffInDays: number = Math.floor(diffInSeconds / 86400);
      return `${diffInDays} days ago`;
    }
};
