import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import AppLogo from "../../assets/app-logo.png";
import Avatar from "../../assets/avatar.png";
import Search from "./components/SearchBar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Check for user
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        // alert("User not found");
        return;
      }
      console.log("user:", user._id);
      const AUTH_LOGOUT_API = `http://localhost:4001/merny/api/v1/auth/logout?userId=${user._id}`;
      // Pass access token to axios header
      // const axiosConfig = {
      //   headers: {
      //     "x-access-token": accessToken,
      //   },
      // };
      await axios.post(AUTH_LOGOUT_API);
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");

      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
      console.error(error);
    }
  };

  const handleAvatarClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex justify-between items-center shadow-lg bg-white px-6 mb-8 navbar">
      <div className="flex items-center app-info">
        <img src={AppLogo} alt="App Logo" className="h-11 mr-2" />
      </div>

      <div className="flex items-center">
        <Search />
        <button className="mr-4">
          <FontAwesomeIcon icon={faBell} size="lg" color="#1778f2" />
        </button>
        <button className="mr-4">
          <a href="/messenger">
            <FontAwesomeIcon icon={faEnvelope} size="lg" color="#1778f2" />
          </a>
        </button>
        <button className="mr-4">
          <a href="/">
            <FontAwesomeIcon icon={faHome} size="lg" color="#1778f2" />
          </a>
        </button>
        <div className="w-10 h-10 rounded-full border-2 border-blue-300 overflow-hidden">
          <button onClick={handleAvatarClick}>
            <img
              src={Avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
        {isMenuOpen && (
          <div className="absolute z-10 top-16 right-2 bg-white border rounded-md shadow-lg w-100 mt-2 p-2">
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                navigate("/profile");
                setIsMenuOpen(false);
              }}
            >
              Profile
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
