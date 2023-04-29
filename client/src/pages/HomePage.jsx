import UserInfoDisplayCard from "../components/UserInfoDisplayCard/UserInfoDisplayCard";
import Recommendations from "../components/Recommendations/Recommendations";
import "./HomePage.css";
import Avatar from "../assets/avatar.png";
const userSuggestions = [
  {
    _id: "1",
    name: "Michael Johnson",
    userName: "michaeljohnson",
    avatar: { Avatar },
    isOnline: true,
  },
  {
    _id: "2",
    name: "Jane Smith",
    userName: "janesmith",
    avatar: { Avatar },
    isOnline: true,
  },
  {
    _id: "3",
    name: "Bob Johnson",
    userName: "bobjohnson",
    avatar: { Avatar },
    isOnline: false,
  },
  {
    _id: "4",
    name: "Sara Lee",
    userName: "saralee",
    avatar: { Avatar },
    isOnline: false,
  },
  {
    _id: "5",
    name: "Tom Jones",
    userName: "tomjones",
    avatar: { Avatar },
    isOnline: true,
  },
];

console.log(userSuggestions);
const HomePage = () => {
  return (
    <div className="grid grid-cols-12 gap-6 mx-6">
      <div className="col-span-8 bg-gray-200 h-32"></div>
      <div className="col-span-4">
        {/* Logged in user information  */}
        <UserInfoDisplayCard />
        {/* User recommendations */}
        <h1 className="font-bold absolute">RECOMMENDATIONS</h1>
        <Recommendations userSuggestions={userSuggestions} />
      </div>
    </div>
  );
};

export default HomePage;
