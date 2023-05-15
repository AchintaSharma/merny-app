// SearchBar.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [setTimeoutId, setSetTimeoutId] = useState(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef(null);

  const accessToken = localStorage.getItem("accessToken");

  const handleSearchUsers = async () => {
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
        const users = response.data.users;
        setSearchResults(users);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Debounce search for optimization
  const handleSearchDebounced = useCallback(() => {
    if (searchQuery.trim() !== "") {
      handleSearchUsers();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (setTimeoutId) {
      clearTimeout(setTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      handleSearchDebounced();
    }, 300);

    setSetTimeoutId(timeoutId);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchQuery, handleSearchDebounced]);

  const filteredUsers =
    searchResults.length === 0
      ? []
      : searchResults.filter((user) => {
          return (
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.userName.toLowerCase().includes(searchQuery.toLowerCase())
          );
        });

  // Show search results only when search input field is focused
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsInputFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative mr-4">
      <input
        type="text"
        placeholder="Search"
        className="pl-10 pr-3 py-2 w-64 md:w-80 rounded-full bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <div className="absolute top-2.5 left-0 pl-3 pr-2 flex items-center">
        <FontAwesomeIcon icon={faSearch} size="lg" className="text-gray-500" />
      </div>
      {/* Render search results */}
      {isInputFocused && filteredUsers.length > 0 && (
        <div className="absolute z-10 bg-white rounded-lg shadow-md mt-2 w-80 p-2">
          <ul className="divide-y divide-gray-300">
            {filteredUsers.map((user) => (
              <li key={user.id} className="p-2 hover:bg-gray-100">
                <a href={`/profile/${user.id}`} className="flex items-center">
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  {/* <span className="text-gray-700">{user.fullName}</span> */}
                  <div className="ml-2  text-left">
                    <h2 className="text-lg font-semibold">{user.fullName}</h2>
                    <p className="text-gray-600 ">@{user.userName}</p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
