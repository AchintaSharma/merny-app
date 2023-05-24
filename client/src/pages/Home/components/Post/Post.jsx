import PropTypes from "prop-types";

import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import PostActions from "./PostActions";
import PostStats from "./PostStats";
import CommentSection from "./CommentSection";

const Post = ({
  avatar,
  userName,
  createdAt,
  content,
  images,
  likes,
  comments,
}) => {
  const postHeaderProps = { avatar, userName, createdAt };
  const postContentProps = { content, images };
  const postStatsProps = { likes, comments };
  const commentSectionProps = {
    avatar,
    userName,
    createdAt,
    content,
    likes,
    comments,
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* Post Header*/}
      <PostHeader {...postHeaderProps} />
      {/* Post Content */}
      <PostContent {...postContentProps} />
      {/* Post Actions */}
      <PostActions />
      {/* Post Stats*/}
      <PostStats {...postStatsProps} />
      {/* Comment Section */}
      <CommentSection {...commentSectionProps} />
      {/* Sixth row (comments section) */}
      {/* Seventh row (Add a comment) */}
      <div className="flex w-full mb-6 h-18">
        <img className="w-10 h-10 rounded-full mr-2" src={avatar} alt="" />
        <input
          type="text"
          className="h-10 px-2 border-none rounded w-11/12 focus:outline-none"
          placeholder={`Add a comment...`}
          // onClick=""
          // value={text}
          // onChange={handleTextChange}
        />
        <button
          className="ml-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
          // onClick={handleModalOpen}
        >
          Post
        </button>
      </div>
    </div>
  );
};

Post.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
};

export default Post;
