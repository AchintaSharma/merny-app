import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

const PostActions = () => {
  return (
    <div className="flex items-center justify-between my-4">
      <div className="flex items-center">
        <FontAwesomeIcon
          icon={faHeart}
          className="mr-3 fa-lg fa-regular text-gray-600"
        />
        <FontAwesomeIcon
          icon={faComment}
          className="mr-3 fa-lg  text-gray-600"
        />
        <FontAwesomeIcon icon={faShare} className="mr-3 fa-lg  text-gray-600" />
      </div>
      <FontAwesomeIcon icon={faBookmark} className="fa-lg text-gray-600" />
    </div>
  );
};

export default PostActions;
