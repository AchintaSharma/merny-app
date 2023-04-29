import { useState } from "react";
import Avatar from "../../assets/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";
function CreatePost() {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePostClick = () => {
    // Handle post button click
    setShowModal(false);
  };
  const NAME = "John Doe";
  return (
    <div className="flex bg-white shadow-md rounded-lg p-4 w-full mb-6 h-18">
      <img className="w-10 h-10 rounded-full mr-2" src={Avatar} alt="" />
      <input
        type="text"
        className="h-10 px-2 border-none rounded w-11/12 focus:outline-none"
        placeholder={`What's on your mind, ${NAME.split(" ")[0]}?`}
        onClick={handleModalOpen}
        value={text}
        onChange={handleTextChange}
      />
      <button
        className="ml-2 px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
        onClick={handleModalOpen}
      >
        Post
      </button>

      {showModal && (
        <div className="z-[1000] fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-75">
          <div className="bg-white rounded-lg p-8 sm:w-3/4 w-4/5 max-h-screen">
            <div className="flex flex-col items-left justify-between mb-4">
              <h2 className="text-lg font-bold mb-4 text-left text-gray-600">
                Create Post
              </h2>
              {/* <hr className="w-full border-gray-300 mb-4" /> */}
              <div className="mb-2 h-80">
                <textarea
                  className="w-full h-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Write something..."
                  value={text}
                  onChange={handleTextChange}
                />
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-start">
                <button className="px-4 py-2 border border-gray-300 rounded-lg mr-2">
                  <FontAwesomeIcon icon={faImage} className="mr-2" />
                  Image
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg">
                  <FontAwesomeIcon icon={faCamera} className="mr-2" />
                  Camera
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg"
                  onClick={handlePostClick}
                >
                  Post
                </button>
              </div>
            </div>

            {/* <div className="mb-4">
              <button className="px-4 py-2 border border-gray-300 rounded-lg">
                Emoji Selector
              </button>
            </div> */}
          </div>

          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
            onClick={handleModalClose}
          >
            <FontAwesomeIcon icon={faTimes} className="text-2xl" />
          </button>
        </div>
      )}
    </div>
  );
}

export default CreatePost;
