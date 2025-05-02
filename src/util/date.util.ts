export function getRelativeTime(past: Date): string {
    const now = new Date();
    const diff = (now.getTime() - past.getTime()) / 1000; // in seconds
  
    if (diff < 60) {
      return "just now";
    } else if (diff < 3600) {
      const minutes = Math.floor(diff / 60);
      return `${minutes}m ago`;
    } else if (diff < 86400) {
      const hours = Math.floor(diff / 3600);
      return `${hours}h ago`;
    } else if (diff < 604800) {
      const days = Math.floor(diff / 86400);
      return `${days}d ago`;
    } else if (diff < 2592000) {
      const weeks = Math.floor(diff / 604800);
      return `${weeks}w ago`;
    } else if (diff < 31536000) {
      const months = Math.floor(diff / 2592000);
      return `${months}mo ago`;
    } else {
      const years = Math.floor(diff / 31536000);
      return `${years}y ago`;
    }
  }