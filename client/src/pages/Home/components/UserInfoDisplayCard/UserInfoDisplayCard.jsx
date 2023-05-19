const UserInfoDisplayCard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    const { fullName, userName, avatar, status } = user;
    const statusCircleColor =
      status == "Online" ? "bg-green-400" : "bg-gray-300";

    return (
      <div className="bg-white shadow-md rounded-lg p-4 w-full mb-6">
        <div className="flex items-center">
          <div className="relative">
            <img className="w-10 h-10 rounded-full" src={avatar} alt="" />
            <span
              className={`bottom-0 left-7 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full ${statusCircleColor}`}
            ></span>
          </div>

          <div className="ml-4  text-left">
            <h2 className="text-lg font-semibold">{fullName}</h2>
            <p className="text-gray-600 ">@{userName}</p>
          </div>
        </div>
      </div>
    );
  }
};

export default UserInfoDisplayCard;
