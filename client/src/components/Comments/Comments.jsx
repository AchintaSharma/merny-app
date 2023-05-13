import PropTypes from "prop-types";
import { useState } from "react";

const CommentSection = ({
  avatar,
  userName,
  createdAt,
  content,
  likes,
  comments,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isFollowing, setIsFollowing] = useState(likes[0].isFollowing);
  const [text, setText] = useState("");
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [isLikesModalOpen, setIsLikesModalOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isAddCommentFocused, setIsAddCommentFocused] = useState(false);

  const handleAddComment = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      // Handle new comment submission here
      setNewComment("");
    }
  };

  const handleNewCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleAddCommentFocus = () => {
    setIsAddCommentFocused(true);
  };

  const handleReply = (commenter) => {
    setNewComment(`@${commenter} `);
  };

  const getLikesText = () => {
    const count = likes.length;
    if (count === 1) {
      return "1 like";
    } else if (count > 1) {
      return `${count} likes`;
    } else {
      return "";
    }
  };

  const handleLikesModal = () => {
    setIsLikesModalOpen(!isLikesModalOpen);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleFollowClick = () => {
    setIsFollowing(true);
  };

  const handleReplyClick = () => {
    setText(`@${userName} `);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handlePostComment = () => {
    // handle posting of comment
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

  return (
    <div className="flex flex-col gap-4 p-4 bg-gray-100 rounded-lg shadow-lg">
      <div className="flex gap-2">
        <div className="flex-shrink-0 w-10 h-10 rounded-full overflow-hidden">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="flex flex-col justify-between w-full">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">{userName}</h3>
            <div className="flex gap-2">
              <button
                className="text-blue-500 hover:text-blue-600 focus:outline-none"
                onClick={handleLikeClick}
              >
                {isLiked ? "1 like" : `${likes.length} likes`}
              </button>
              <button
                className={`${
                  isFollowing ? "bg-gray-500 cursor-default" : "bg-blue-500"
                } hover:bg-blue-600 text-white px-4 py-2 rounded-lg focus:outline-none`}
                onClick={handleFollowClick}
                disabled={isFollowing}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>
          <p>{content}</p>
          <div className="flex justify-between">
            <div className="text-gray-500 text-sm">{formatDate(createdAt)}</div>
            <button
              className="text-blue-500 hover:text-blue-600 focus:outline-none"
              onClick={() => setShowLikesModal(true)}
            >
              {isLiked ? "You" : "Be the first"} liked this
            </button>
          </div>
        </div>
      </div>

      {comments && (
        <div className="flex flex-col space-y-2">
          {comments.map((comment, index) => (
            <div className="flex my-4" key={index}>
              <img
                src={comment.avatar}
                alt={comment.userName}
                className="w-10 h-10 rounded-full mr-2"
              />
              <div>
                <div>
                  <span className="font-bold mr-2">{comment.userName}</span>
                  <span>{comment.comment}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <span className="mr-2">
                    {getTimeElapsed(comment.createdAt)}
                  </span>
                  <button
                    className="mr-2 text-blue-500 hover:text-blue-700"
                    onClick={() => handleLikesModal(comment.likes)}
                  >
                    {getLikesText(comment.likes)}
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleReply(comment.userName)}
                  >
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex w-full mb-6 h-18">
        <img
          className="w-10 h-10 rounded-full mr-2"
          src={avatar}
          alt={userName}
        />
        <input
          type="text"
          className="h-10 px-2 border-none rounded w-11/12 focus:outline-none"
          placeholder={`Add a comment...`}
          onClick={handleAddCommentFocus}
          value={newComment}
          onChange={handleNewCommentChange}
        />
        <button
          className="ml-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          onClick={handleAddComment}
        >
          Post
        </button>
      </div>
    </div>
  );
};

CommentSection.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  content: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
};
export default CommentSection;
