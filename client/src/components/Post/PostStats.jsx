import PropTypes from "prop-types";

const PostStats = ({ likes, comments }) => {
  return (
    <div className="flex justify-between mb-4">
      <p className="text-gray-600">{likes.length} likes</p>
      <p className="text-gray-600">{comments.length} comments</p>
    </div>
  );
};

export default PostStats;

PostStats.propTypes = {
  likes: PropTypes.array.isRequired,
  comments: PropTypes.array.isRequired,
};
