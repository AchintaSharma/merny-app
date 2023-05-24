import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Post from "../Post/Post";

const VIEW_FEEDPOST_API = "http://localhost:4001/merny/api/v1/posts";

const Posts = () => {
  // Create api call
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // alert("Access token not found");
        return;
      }
      const axiosConfig = {
        headers: {
          "x-access-token": accessToken,
        },
      };

      const response = await axios.get(VIEW_FEEDPOST_API, axiosConfig);
      const postsData = response.data.posts;
      const sortedPosts = postsData.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setPosts(sortedPosts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (!posts || posts.length === 0) {
    return <div>No posts to show.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
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
  posts1: PropTypes.array,
};

export default Posts;
