import PropTypes from "prop-types";
import axios from "axios";
import { useEffect, useState } from "react";

const USER_CONTACTS_API = "http://localhost:4001/merny/api/v1/contacts";

const Contacts = () => {
  const [userContacts, setUserContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log("userContacts: ", userContacts);
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

    const fetchUserContacts = async () => {
      try {
        const response = await axios.get(USER_CONTACTS_API, axiosConfig);
        setUserContacts(response.data.contacts);
        setLoading(false);
      } catch (error) {
        alert(error.response.data.message);
      }
    };

    fetchUserContacts();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // or any loading indicator you prefer
  }

  const handleMessageButton = async (userId) => {
    // Code
    try {
      console.log("Sending message to user: ", userId);
    } catch (error) {
      // Handle follow error
      console.log("Error messsaging user:", error);
    }
  };
  return (
    <div className="bg-white shadow-md rounded-lg pt-4 px-4 w-full mb-6 relative">
      {userContacts.map((user) => (
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
            onClick={() => handleMessageButton(user._id)}
          >
            Message
          </button>
        </div>
      ))}
    </div>
  );
};

Contacts.propTypes = {
  userContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      bio: PropTypes.string,
    })
  ),
};

export default Contacts;
