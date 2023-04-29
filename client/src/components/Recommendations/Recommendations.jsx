import PropTypes from "prop-types";

// import Avatar from "../../assets/avatar.png";

const Recommendations = ({ userSuggestions }) => {
  return (
    <div className="bg-white shadow-md rounded-lg pt-4 px-4 w-full mb-6 relative">
      {userSuggestions.map((user) => (
        <div className="flex items-center pb-4" key={user._id}>
          <div className="relative">
            <img
              className="w-10 h-10 rounded-full"
              src={user.avatar}
              alt={user.name}
            />
            <span
              className={`bottom-0 left-7 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full ${
                user.isOnline ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
          </div>

          <div className="ml-4">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">@{user.userName}</p>
          </div>

          <button
            className="ml-auto rounded-lg px-4 py-2 text-white bg-blue-500 hover:bg-blue-600"
            onClick={() => {
              // Handle follow button click
            }}
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
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      bio: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Recommendations;
