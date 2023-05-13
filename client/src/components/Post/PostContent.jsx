import PropTypes from "prop-types";

const PostContent = ({ content, images }) => {
  return (
    <>
      <p className="my-4 text-left">{content}</p>
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
    </>
  );
};

export default PostContent;

PostContent.propTypes = {
  content: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string),
};
