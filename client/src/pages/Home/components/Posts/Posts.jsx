import PropTypes from "prop-types";
import Post from "../Post/Post";

const Posts = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post._id}
          avatar={post.user.avatar}
          userName={post.user.userName}
          createdAt={post.createdAt}
          content={post.content}
          images={post.images}
          likes={post.likes}
          comments={post.comments}
        />
      ))}
    </div>
  );
};

Posts.propTypes = {
  posts: PropTypes.array,
};

export default Posts;
