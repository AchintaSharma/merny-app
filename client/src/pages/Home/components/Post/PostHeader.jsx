import PropTypes from "prop-types";
import { getTimeSinceCreated } from "../../../../utils/Functions";
const PostHeader = ({ avatar, userName, createdAt }) => {
  return (
    <div className="flex items-center">
      <img className="w-10 h-10 rounded-full mr-4" src={avatar} alt="" />
      <div>
        <p className="font-bold text-left">{userName}</p>
        <p className="text-gray-600 text-sm text-left">
          {getTimeSinceCreated(createdAt)}
          {/* ChatGPT code this function getTimeSinceCreated */}
        </p>
      </div>
    </div>
  );
};

PostHeader.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
};

export default PostHeader;
