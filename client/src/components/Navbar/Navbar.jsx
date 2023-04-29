// import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faEnvelope,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";
import AppLogo from "../../assets/app-logo.png";
import Avatar from "../../assets/avatar.png";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center shadow-lg bg-white px-6 mb-8 navbar">
      <div className="flex items-center app-info">
        <img src={AppLogo} alt="App Logo" className="h-11 mr-2" />
        {/* <span className="text-lg font-bold">MERNY</span> */}
      </div>

      <div className="flex items-center">
        <div className="relative mr-4">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-3 py-2 w-64 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <div className="absolute top-2.5 left-0 pl-3 pr-2 flex items-center">
            <FontAwesomeIcon
              icon={faSearch}
              size="lg"
              className="text-gray-500"
            />
          </div>
        </div>
        <button className="mr-4">
          <FontAwesomeIcon icon={faBell} size="lg" color="#1778f2" />
        </button>
        <button className="mr-4">
          <FontAwesomeIcon icon={faEnvelope} size="lg" color="#1778f2" />
        </button>
        <button className="mr-4">
          <FontAwesomeIcon icon={faHome} size="lg" color="#1778f2" />
        </button>
        <div className="w-10 h-10 rounded-full border-2 border-blue-300 border-radiu overflow-hidden">
          <img
            src={Avatar}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
