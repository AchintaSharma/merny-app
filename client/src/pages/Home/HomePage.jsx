import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Posts from "../Home/components/Posts/Posts";
import CreatePost from "./components/CreatePost/CreatePost";
import UserInfoDisplayCard from "./components/UserInfoDisplayCard/UserInfoDisplayCard";
import Recommendations from "./components/Recommendations/Recommendations";
import Contacts from "./components/Contacts/Contacts";

const VIEW_FEEDPOST_API = "http://localhost:4001/merny/api/v1/posts";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true); // Add a loading state

  let navigate = useNavigate();
  //
  useEffect(() => {
    const checkLoginStatus = () => {
      // Check access token
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        navigate("/login");
      }
    };
    checkLoginStatus();
  }, []);

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
      setLoadingPosts(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
    console.log("api call");
  }, []);

  const handleCreatePost = (newPost) => {
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    // fetchPosts();
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mx-6">
      <div className="col-span-1 sm:col-span-8 h-20">
        {/* Create post component */}
        <CreatePost handleCreatePost={handleCreatePost} />
        {/* Feed Posts component */}
        {loadingPosts ? ( // Conditionally render based on loading state
          <div>Loading...</div> // Render "Loading..." when loading is true
        ) : (
          <Posts posts={posts} /> // Render posts when loading is false
        )}
      </div>
      <div className="col-span-1 sm:col-span-4 hidden sm:block">
        {/* Logged in user information  */}
        <UserInfoDisplayCard />
        {/* User recommendations */}
        <h1
          className="font-bold mb-4 text-xl text-gray-600"
          style={{ textAlign: "left" }}
        >
          Recommendations
        </h1>
        <Recommendations />
        {/* User's following */}
        <h1
          className="font-bold mb-4 text-xl text-gray-600"
          style={{ textAlign: "left" }}
        >
          Contacts
        </h1>
        <Contacts />
      </div>
    </div>
  );
};

export default HomePage;
