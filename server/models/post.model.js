const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    /*
    title: {    // brief summary or headline for the post.
      type: String,
      required: true,
    },
    tags: {   // allow users to categorize their posts by topic or subject
      type: String,
      required: true,
    },
    location: {  // allow users to tag their posts with a location.
      type: String,
      required: true,
    },
    */
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
