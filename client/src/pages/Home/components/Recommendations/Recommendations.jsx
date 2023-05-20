import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";

const USER_SUGGESTION_API =
  "http://localhost:4001/merny/api/v1/suggestionsUser";

const Recommendations = () => {
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    const fetchUserRecommendations = async () => {
      try {
        const response = await axios.get(USER_SUGGESTION_API, axiosConfig);
        setUserSuggestions(response.data);
        setLoading(false);
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    fetchUserRecommendations();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or any loading indicator you prefer
  }

  const handleFollowButton = async (userId) => {
    // Code
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        // Handle access token not found
        return;
      }

      const axiosConfig = {
        headers: {
          "x-access-token": accessToken,
        },
      };

      const FOLLOW_USER_API = `http://localhost:4001/merny/api/v1/user/${userId}/follow`;

      await axios.patch(FOLLOW_USER_API, null, axiosConfig);

      // Remove the user from the userSuggestions state
      setUserSuggestions((prevSuggestions) =>
        prevSuggestions.filter((user) => user._id !== userId)
      );

      // Handle successful follow
      console.log("User followed successfully.");
    } catch (error) {
      // Handle follow error
      console.log("Error following user:", error);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg pt-4 px-4 w-full mb-6 relative">
      {userSuggestions.map((user) => (
        <div className="flex items-center pb-4" key={user._id}>
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full"
              src={user.avatar}
              alt={user.fullName}
            />
            <span
              className={`bottom-0 left-7 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full ${
                user.status == "online" ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
          </div>

          <div className="ml-4 text-left">
            <h2 className="text-lg font-semibold">{user.fullName}</h2>
            <p className="text-gray-600">@{user.userName}</p>
          </div>

          <button
            className="ml-auto rounded-lg px-4 py-2 text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => handleFollowButton(user._id)}
          >
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

Recommendations.propTypes = {
  userSuggestions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
    })
  ),
};

export default Recommendations;
