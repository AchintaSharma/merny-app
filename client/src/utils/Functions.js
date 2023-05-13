const getTimeSinceCreated = (createdDate) => {
  const currentDate = new Date();
  console.log(currentDate);
  const timeDiffInMs = currentDate?.getTime() - createdDate.getTime();
  console.log(timeDiffInMs);
  // Calculate time differences in seconds, minutes, hours, days, and weeks
  const seconds = Math.floor(timeDiffInMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  // Return appropriate time stamp
  if (seconds < 30) {
    return "Just now";
  } else if (seconds < 60) {
    return `${seconds} seconds`;
  } else if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (hours < 24) {
    return `${hours}h`;
  } else if (days <= 6) {
    return `${days}d`;
  } else {
    return `${weeks}w`;
  }
};

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
