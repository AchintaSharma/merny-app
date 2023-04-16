const Comment = require("../models/comment.model");
const Post = require("../models/post.model");

const addComment = async (req, res) => {
  const { content, tag, reply, postId, postUserId } = req.body;

  try {
    // Check if the post exists
    const existingPost = await Post.findById(postId);
    if (!existingPost) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "This post does not exist.",
      });
    }

    let newComment;

    if (reply) {
      // This is a reply to an existing comment
      const parentComment = await Comment.findById(reply);
      if (!parentComment) {
        return res.status(404).json({
          success: false,
          status: 404,
          message: "This comment does not exist.",
        });
      }
      newComment = new Comment({
        content,
        tag,
        likes: [],
        user: req.user.id,
        postId,
        postUserId,
      });
      await newComment.save();
      parentComment.reply.push(newComment.id);
      await parentComment.save();
    } else {
      // This is a new comment
      newComment = new Comment({
        content,
        tag,
        reply: [],
        likes: [],
        user: req.user.id,
        postId,
        postUserId,
      });
      await newComment.save();
    }

    res.status(201).json({
      success: true,
      status: 201,
      newComment,
    });
  } catch (err) {
    console.log(`Internal server error occured while adding comment: ${err}`);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while adding comment.",
    });
  }
};

const updateComment = async (req, res) => {
  const { content } = req.body;
  const commentId = req.params.id;

  try {
    // Check if the comment exists
    const existingComment = await Comment.findById(commentId);
    if (!existingComment) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "This comment does not exist.",
      });
    }

    // Check if the logged-in user is the owner of the comment
    if (existingComment.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        status: 404,
        message: "Invalid Authentication.",
      });
    }

    // Update the content of the comment
    existingComment.content = content;
    await existingComment.save();

    res.status(200).json({
      success: true,
      status: 200,
      message: "Update Success!",
      comment: existingComment,
    });
  } catch (err) {
    console.log(`Internal server error occured while updating comment: ${err}`);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while updating comment.",
    });
  }
};

const likeComment = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the comment by id
    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Comment not found",
      });
    }

    // Check if the user has already liked the comment
    if (comment.likes.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        staus: 400,
        message: "You have already liked this comment",
      });
    }

    // Add the user's id to the likes array and save the comment
    comment.likes.push(req.user._id);
    await comment.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Liked Comment!",
    });
  } catch (err) {
    console.log(`Internal server error occured while liking comment: ${err}`);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while liking comment.",
    });
  }
};

const unlikeComment = async (req, res) => {
  try {
    const commentId = req.params.id;

    // check if comment exists
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "Comment not found",
      });
    }

    // check if user has liked the comment
    if (!comment.likes.includes(req.user._id)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Comment not liked by user",
      });
    }

    // remove user id from likes array
    comment.likes = comment.likes.filter(
      (like) => like.toString() !== req.user._id.toString()
    );

    // save updated comment
    await comment.save();

    return res.status(200).json({
      success: true,
      status: 200,
      message: "Unliked Comment!",
    });
  } catch (err) {
    console.log(`Internal server error occured while updating comment: ${err}`);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while updating comment.",
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    // Check if the user who created the comment is the same as the authenticated user
    if (comment.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "You are not authorized to delete this comment.",
      });
    }

    // Delete the comment
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      res.status(200).json({
        success: false,
        status: 400,
        message: "Error occurred while deleting comment!",
      });
    }
    res.status(200).json({
      success: true,
      status: 200,
      message: "Deleted Comment!",
    });
  } catch (err) {
    console.log(`Internal server error occured while deleting comment: ${err}`);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while deleting comment.",
    });
  }
};
module.exports = {
  addComment,
  updateComment,
  likeComment,
  unlikeComment,
  deleteComment,
};
