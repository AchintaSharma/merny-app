import UserInfoDisplayCard from "./components/UserInfoDisplayCard/UserInfoDisplayCard";
import Recommendations from "./components/Recommendations/Recommendations";
import CreatePost from "./components/CreatePost/CreatePost";
// import Post from "./components/Post/Post";
import { posts, userSuggestions } from "../../../mockData2";
// console.log("posts[0] mock data 2 in home page: ", posts[0]);
const HomePage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mx-6">
      <div className="col-span-1 sm:col-span-8 h-20">
        <CreatePost />
        {/* <Post {...posts[0]} /> */}
        {/* <Post {...post2} /> */}
        {/* <Post {...post3} /> */}
        {/* <Post {...posts[0]} /> */}
        {/* <Post {...posts[0]} /> */}
        {/* <CommentSection {...post3} /> */}
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
