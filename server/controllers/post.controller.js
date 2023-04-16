const Post = require("../models/post.model");
const User = require("../models/user.model");

const createPost = async (req, res) => {
  const { content, images } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "User not found!",
      });
    }

    const postCreated = await Post.create({
      content,
      images,
      user,
    });

    if (!postCreated) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Failed to create post!",
      });
    }

    console.log("postCreated: ", postCreated);
    return res.status(201).send({
      success: true,
      status: 201,
      message: "Created Post!",
      newPost: postCreated,
    });
  } catch (err) {
    console.log(`Internal server error occured while creating post: ${err}`);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while creating post.",
    });
  }
};

const getAllPosts = async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "User not found!",
      });
    }

    const posts = await Post.find({ user: userId });

    if (!posts) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "No posts found!",
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Success!",
      result: posts.length,
      posts,
    });
  } catch (err) {
    console.log(`Internal server error occured while retrieving posts: ${err}`);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while retrieving posts.",
    });
  }
};

const updatePost = async (req, res) => {
  const userId = req.user.id;
  const { images, content } = req.body;
  const postId = req.params.id;
  const post = await Post.findOne({
    _id: postId,
    user: userId,
  });

  if (!post) {
    return res.status(404).send({
      success: false,
      status: 404,
      message: "No posts found!",
    });
  }

  post.content = content ?? post.content;
  post.images = images ?? post.images;

  await post.save();

  return res.status(200).send({
    success: true,
    status: 200,
    message: "Updated Post!",
    newPost: post,
  });
};

const getPostById = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "User not found!",
      });
    }

    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "Post not found!",
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Success!",
      post,
    });
  } catch (err) {
    console.log(`Internal server error occured while retrieving post: ${err}`);
    if (err.kind === "ObjectId") {
      return res.status(400).send({
        success: false,
        status: 400,
        msg: "Invalid post ID",
      });
    }
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while retrieving post.",
    });
  }
};

const deletePost = async (req, res) => {
  const userId = req.user.id;
  const postId = req.params.id;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "User not found!",
      });
    }

    const post = await Post.findById(postId);

    // Check if user is the post owner
    if (post.user.toString() !== userId) {
      return res.status(401).send({
        success: false,
        status: 401,
        message: "Unauthorized!",
      });
    }

    const deletedPost = await post.remove();
    if (!deletedPost) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "Post not deleted!",
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Deleted Post!",
      newPost: deletedPost,
    });
  } catch (err) {
    console.log(`Internal server error occured while deleting post: ${err}`);
    if (err.kind === "ObjectId") {
      return res.status(400).send({
        success: false,
        status: 400,
        msg: "Invalid post ID",
      });
    }
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while deleting post.",
    });
  }
};

const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "This post does not exist.",
      });
    }

    if (post.likes.includes(userId)) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "You have already liked this post.",
      });
    }

    post.likes.push(userId);
    await post.save();

    return res.send({
      success: true,
      status: 200,
      message: "Liked Post!",
    });
  } catch (err) {
    console.log(`Internal server error occured while liking post: ${err}`);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while liking post.",
    });
  }
};

const unlikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "This post does not exist.",
      });
    }

    if (!post.likes.includes(userId)) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "You have not liked this post yet.",
      });
    }

    // remove user id from the likes array
    post.likes = post.likes.filter((like) => like !== userId);
    await post.save();

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Unliked Post!",
    });
  } catch (err) {
    console.log(`Internal server error occured while liking post: ${err}`);
    if (err.kind === "ObjectId") {
      return res.status(400).send({
        success: false,
        status: 400,
        message: `Cast to ObjectId failed for value "'
          ${postId} 
          '" at path "_id" for model "post"`,
      });
    }
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while liking post.",
    });
  }
};

const getParticularUsersPosts = async (req, res) => {
  const userId = req.params.id;
  try {
    const userPosts = await Post.find({ user: userId });

    if (!userPosts) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "No posts found.",
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Success!",
      posts: userPosts,
    });
  } catch (err) {
    console.log(
      `Internal server error occured while getting user's post: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while getting user's post.",
    });
  }
};

const savePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  try {
    // Find the post by id
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Post not found!",
      });
    }
    // Check if the post is already saved by the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found!",
      });
    }

    if (user.saved.includes(postId)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Post already saved!",
      });
    }
    // Save the post id in the user's saved array
    user.saved.push(postId);
    await user.save();
    return res.json({
      success: true,
      status: 200,
      message: "Saved Post!",
    });
  } catch (err) {
    console.log(
      `Internal server error occured while getting saving post: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while saving post.",
    });
  }
};

const unsavePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  try {
    // Check if the post exists
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Post not found!",
      });
    }
    // Check if the post is already saved by the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found!",
      });
    }

    if (!user.saved.includes(postId)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Post already unsaved!",
      });
    }
    // Save the post id in the user's saved array
    user.saved.pull(postId);
    await user.save();

    return res.json({
      success: true,
      status: 200,
      message: "Saved Post!",
    });
  } catch (err) {
    console.log(
      `Internal server error occured while getting saving post: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while saving post.",
    });
  }
};

const getAllSavedPosts = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await User.findById(userId).populate("saved");
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found!",
      });
    }

    return res.json({
      success: true,
      status: 200,
      message: "Success!",
      savedPosts: user.saved,
      result: user.saved.length,
    });
  } catch (err) {
    console.log(
      `Internal server error occured while fetching all saved posts: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while  fetching all saved posts.",
    });
  }
};
module.exports = {
  createPost,
  getAllPosts,
  updatePost,
  getPostById,
  deletePost,
  likePost,
  unlikePost,
  getParticularUsersPosts,
  savePost,
  unsavePost,
  getAllSavedPosts,
};
