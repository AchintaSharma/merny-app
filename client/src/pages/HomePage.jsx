import UserInfoDisplayCard from "../components/UserInfoDisplayCard/UserInfoDisplayCard";
import Recommendations from "../components/Recommendations/Recommendations";
import "./HomePage.css";
import CreatePost from "../components/CreatePost/CreatePost";
import Post from "../components/NewsFeed/Post";
import { userSuggestions, post1, post2, post3 } from "../MockData";
const { avatar, userName, content, images, likes, comments, createdAt } = post1;
// console.log(userSuggestions);
console.log("CHECKING VALUES INSIDE HOMEPAGE");
console.log("post1: ", post2);
console.log(avatar, userName, content, images, likes, comments, createdAt);
const HomePage = () => {
  return (
    <div className="grid grid-cols-12 gap-6 mx-6">
      <div className="col-span-8 h-20">
        <CreatePost />
        <Post {...post3} />
      </div>
      <div className="col-span-4">
        {/* Logged in user information  */}
        <UserInfoDisplayCard />
        {/* User recommendations */}
        <h1
          className="font-bold mb-4 text-xl text-gray-600"
          style={{ textAlign: "left" }}
        >
          Recommendations
        </h1>
        <Recommendations userSuggestions={userSuggestions} />
        {/* User's following */}
        {/* <h1
          className="font-bold mb-4 text-xl text-gray-600"
          style={{ textAlign: "left" }}
        >
          Contacts
        </h1> */}
      </div>
    </div>
  );
};

export default HomePage;
