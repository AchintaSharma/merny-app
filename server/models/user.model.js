const mongoose = require("mongoose");
const {
  userRole,
  defaultAvatar,
  gender,
  status,
} = require("../utils/constants");

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
      enum: [gender.male, gender.female, gender.other],
    },
    mobile: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    website: {
      type: String,
      default: "",
    },
    saved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    default: [],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    default: [],
    status: {
      type: String,
      enum: [status.online, status.offline],
      default: status.online,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
