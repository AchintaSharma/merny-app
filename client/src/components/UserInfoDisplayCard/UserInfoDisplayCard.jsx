import Avatar from "../../assets/avatar.png";

const UserInfoDisplayCard = () => {
  const NAME = "John Doe";
  const USER_NAME = "johndoe";
  const ACTIVE = false;
  const statusCircleColor = ACTIVE ? "bg-green-400" : "bg-gray-300";

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full mb-6">
      <div className="flex items-center">
        <div className="relative">
          <img className="w-10 h-10 rounded-full" src={Avatar} alt="" />
          <span
            className={`bottom-0 left-7 absolute w-3.5 h-3.5 border-2 border-white dark:border-gray-800 rounded-full ${statusCircleColor}`}
          ></span>
        </div>

        <div className="ml-4">
          <h2 className="text-lg font-semibold">{NAME}</h2>
          <p className="text-gray-600">@{USER_NAME}</p>
        </div>
      </div>
    </div>
  );
};

export default UserInfoDisplayCard;
