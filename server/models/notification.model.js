const mongoose = require("mongoose");
const { notificationTypes } = require("../utils/constants");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipients: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: [],
      },
    ],
    url: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      // required: true,
    },
    content: {
      type: String,
      // required: true,
    },
    image: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    /*
    readAt: {
      type: Date,
      default: null,
    },
    type: {
      type: String,
      enum: [
        notificationTypes.like,
        notificationTypes.comment,
        notificationTypes.follow,
      ],
      required: true,
    },
    */
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
