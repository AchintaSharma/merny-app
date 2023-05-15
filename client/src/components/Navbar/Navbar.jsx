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
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  // const handleClick = () => {};
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const accessToken = localStorage.getItem("accessToken");
  console.log(searchQuery);
  const handleSearch = async () => {
    try {
      if (accessToken) {
        const response = await axios.get(
          `http://localhost:4001/merny/api/v1/search`,
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        );
        const results = response.data;
        setSearchResults(results);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      handleSearch();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

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
        <div className="relative mr-4">
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-3 py-2 w-64 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      {/* Render search results */}
      {searchResults.length > 0 && (
        <div className="absolute z-10 bg-white rounded-lg shadow-md mt-2 w-64">
          <ul className="divide-y divide-gray-300">
            {searchResults.map((user) => (
              <li key={user.id} className="p-2 hover:bg-gray-100">
                <a href={`/profile/${user.id}`} className="flex items-center">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-gray-700">{user.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
