const getTimeSinceCreated = (createdAt) => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  const timeDiff = Math.abs(currentDate - createdDate);

  // Calculate time differences
  const seconds = Math.floor(timeDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const years = Math.floor(days / 365);

  if (seconds < 30) {
    return "Just now";
  } else if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else if (weeks < 52) {
    return `${weeks} weeks ago`;
  } else {
    return `${years} years ago`;
  }
};

export default getTimeSinceCreated;

const getTimeElapsed = (createdAt) => {
  const diff = Math.round((new Date() - new Date(createdAt)) / 60000);
  if (diff < 60) {
    return `${diff}m`;
  } else if (diff < 1440) {
    return `${Math.floor(diff / 60)}h`;
  } else {
    return `${Math.floor(diff / 1440)}d`;
  }
};
const formatDate = (date) => {
  const diffTime = Math.abs(new Date() - date);
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  if (diffMinutes < 60) {
    return `${diffMinutes} minutes ago`;
  }
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
};

export { getTimeElapsed, formatDate, getTimeSinceCreated };
