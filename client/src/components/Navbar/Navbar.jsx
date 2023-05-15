// import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEnvelope, faHome } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import AppLogo from "../../assets/app-logo.png";
import Avatar from "../../assets/avatar.png";
import Search from "./components/SearchBar";

const Navbar = () => {
  // const handleClick = () => {};

  const accessToken = localStorage.getItem("accessToken");

  return (
    <nav
      // onClick={handleClick}
      className="flex justify-between items-center shadow-lg bg-white px-6 mb-8 navbar"
    >
      <div className="flex items-center app-info">
        <img src={AppLogo} alt="App Logo" className="h-11 mr-2" />
        {/* <span className="text-lg font-bold">MERNY</span> */}
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
        <div className="w-10 h-10 rounded-full border-2 border-blue-300  overflow-hidden">
          <a href="/profile">
            <img
              src={Avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
