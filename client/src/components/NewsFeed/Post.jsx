import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faHeart,
  faShare,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";

const Post = ({
  avatar,
  userName,
  createdAt,
  content,
  images,
  likes,
  comments,
}) => {
  console.log("CHECKING VALUES INSIDE POST COMPONENT");
  console.log(avatar, userName, createdAt, content, images, likes, comments);
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-6">
      {/* First row */}
      <div className="flex items-center">
        <img className="w-10 h-10 rounded-full mr-4" src={avatar} alt="" />
        <div>
          <p className="font-bold text-left">{userName}</p>
          <p className="text-gray-600 text-sm">{createdAt.toLocaleString()}</p>
        </div>
      </div>

      {/* Second row */}
      <p className="my-4 text-left">{content}</p>

      {/* Third row */}
      <div className="flex flex-wrap justify-between p">
        {images.map((image, index) => (
          <img
            key={index}
            className={
              images.length === 1
                ? "w-full h-auto object-cover rounded-lg mb-4"
                : images.length === 2
                ? "w-1/2 h-auto object-cover rounded-lg mb-4"
                : index === 0
                ? "w-full h-auto object-cover rounded-lg mb-4"
                : "w-1/2 h-auto object-cover rounded-lg mb-4"
            }
            style={{
              width:
                images.length === 1
                  ? "100%"
                  : images.length % 2 === 0 && index === images.length - 1
                  ? "calc(50% - 0.25rem)"
                  : images.length % 2 === 1 && index === 0
                  ? "100%"
                  : "calc(50% - 0.50rem)",
            }}
            src={image}
            alt=""
          />
        ))}
      </div>

      {/* Fourth row */}
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
          <FontAwesomeIcon
            icon={faShare}
            className="mr-3 fa-lg  text-gray-600"
          />
        </div>
        <FontAwesomeIcon icon={faBookmark} className="fa-lg text-gray-600" />
      </div>

      {/* Fifth row */}
      <div className="flex justify-between">
        <p className="text-gray-600">{likes.length} likes</p>
        <p className="text-gray-600">{comments.length} comments</p>
      </div>

      {/* Sixth row (comments section) */}
      {/* ... */}
    </div>
  );
};

Post.propTypes = {
  avatar: PropTypes.string,
  userName: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  content: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
  likes: PropTypes.number.isRequired,
  comments: PropTypes.number.isRequired,
};

export default Post;
