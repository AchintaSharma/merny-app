import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faImage, faTimes } from "@fortawesome/free-solid-svg-icons";

const user = JSON.parse(localStorage.getItem("user"));

const CREATE_POST_API = "http://localhost:4001/merny/api/v1/posts";

function CreatePost({ handleCreatePost }) {
  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handlePostClick = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        return;
      }

      const formData = {
        content: text,
        images,
      };

      const response = await axios.post(CREATE_POST_API, formData, {
        headers: {
          "x-access-token": accessToken,
        },
      });

      // Handle the response as per your requirements
      console.log("Post created successfully:", response.data.newPost);

      // Clear the form inputs and close the modal
      setText("");
      setImages([]);
      setShowModal(false);
      handleCreatePost(response.data.newPost);
    } catch (error) {
      // Handle any errors that occurred during the post request
      console.error("Error creating post:", error);
    }
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const updatedImages = [...images];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();

      reader.onload = () => {
        const imageDataURL = reader.result;
        updatedImages.push(imageDataURL);
        setImages(updatedImages);
      };

      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  return (
    <div className="flex bg-white shadow-md rounded-lg p-4 w-full mb-6 h-18">
      <img className="w-10 h-10 rounded-full mr-2" src={user.avatar} alt="" />
      <input
        type="text"
        className="h-10 px-2 border-none rounded w-11/12 focus:outline-none"
        placeholder={`What's on your mind, ${user.fullName.split(" ")[0]}?`}
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
              <div className="mb-2">
                <textarea
                  className="w-full h-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Write something..."
                  value={text}
                  onChange={handleTextChange}
                />

                {images.length > 0 && (
                  <div className="grid grid-cols-6 gap-2 mt-4">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-w-4 aspect-h-3"
                      >
                        <img
                          className="object-contain w-full h-full rounded-lg"
                          src={image}
                          alt=""
                        />
                        <button
                          className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
                          onClick={() => removeImage(index)}
                        >
                          <FontAwesomeIcon icon={faTimes} className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mb-4 flex justify-between">
              <div className="flex justify-start">
                <label
                  htmlFor="image-upload"
                  className="px-4 py-2 border border-gray-300 rounded-lg mr-2"
                >
                  <FontAwesomeIcon icon={faImage} className="mr-2" />
                  Image
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
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

CreatePost.propTypes = {
  handleCreatePost: PropTypes.func,
};

export default CreatePost;
