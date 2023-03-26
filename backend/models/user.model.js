const mongoose = require("mongoose");
const { userRole, defaultAvatar, gender } = require("../utils/constants");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: defaultAvatar,
    },
    role: {
      type: String,
      default: userRole.user,
      enum: [userRole.admin, userRole.user],
    },
    gender: {
      type: String,
      required: true,
      enum: [gender.male, gender.female, gender.other],
    },
    mobile: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    bio: {
      type: String,
    },
    website: {
      type: String,
    },
    follower: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
