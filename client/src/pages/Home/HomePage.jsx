import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Post from "../Home/components/Post/Post";
import CreatePost from "./components/CreatePost/CreatePost";
import UserInfoDisplayCard from "./components/UserInfoDisplayCard/UserInfoDisplayCard";
import Recommendations from "./components/Recommendations/Recommendations";
import Contacts from "./components/Contacts/Contacts";

const HomePage = () => {
  // useNavigate() hook
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

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mx-6">
      <div className="col-span-1 sm:col-span-8 h-20">
        {/* Create post component */}
        <CreatePost />
        {/* Feed */}
        {/* <Post {...post1} />
        <Post {...post2} />
        <Post {...post3} /> */}
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
