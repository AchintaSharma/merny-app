const User = require("../models/user.model");
const { userRole } = require("../utils/constants");
// Function for viewing all users
const searchAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    // Filter out the admin user
    const filteredUsers = users.filter((user) => user.role !== userRole.admin);

    if (filteredUsers.length === 0) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "No users found.",
      });
    }

    const userResult = filteredUsers.map((user) => ({
      avatar: user.avatar,
      id: user._id,
      fullName: user.fullName,
      userName: user.userName,
    }));

    console.log(`Found ${userResult.length} users in the database.`);
    return res.status(200).send({
      success: true,
      status: 200,
      message: `Successfully fetched ${userResult.length} users.`,
      users: userResult,
    });
  } catch (err) {
    console.log("Error while fetching all users data: ", err.message);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error while fetching all users data.",
    });
  }
};

// Function for searching a user by ID
const searchUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user is authenticated
    if (!req.user) {
      return res.status(401).send({ message: "Invalid Authentication." });
    }

    const user = await User.findById(userId);

    // Check if user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: `Cast to ObjectId failed for value ${userId} at path \"_id\" for model \"user\"`,
      });
    }

    console.log(`Found user ${user.fullName} in database.`);

    const { password, ...response } = user.toObject();

    return res.status(200).send({
      success: true,
      status: 200,
      user: response,
    });
  } catch (err) {
    console.log("Error while fetching user data: ", err.message);
    if (err.name === "CastError") {
      return res.status(404).send({
        success: false,
        status: 404,
        message: err.message,
      });
    }
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error while fetching user data.",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { avatar, fullName, bio, mobile, address, story, website, gender } =
      req.body;
    const userId = req.user.id; // Assumes the user ID is stored in the request object after authentication

    //TODO: Store avatar if provided

    // Find the user by ID and update their details
    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatar,
        fullName,
        bio,
        mobile,
        address,
        story,
        website,
        gender,
      },
      { new: true } // Return the updated user object
    );

    // Check if the user exists
    if (!user) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: `User with ID ${userId} not found`,
      });
    }

    console.log(`User ${user.fullName} details updated.`);
    return res.status(200).send({
      success: true,
      status: 200,
      message: "Update Success!",
    });
  } catch (err) {
    console.log("Error while updating user: ", err.message);
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error while updating user.",
    });
  }
};

const followUser = async (req, res) => {
  try {
    const follwerUserId = req.user.id; // logged-in user id
    const followingUserId = req.params.id; // id of the user to follow

    if (follwerUserId === followingUserId) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Users can't follow themselves",
      });
    }

    const following = await User.findById(followingUserId);
    if (!following) {
      return res.status(500).json({
        success: false,
        status: 500,
        message: `Cast to ObjectId failed for value \"${followingUserId}\" at path \"_id\" for model \"user\" `,
      });
    }

    // Check if the follower is already following the user
    const follower = await User.findById(follwerUserId);
    if (follower.following.includes(followingUserId)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "You already follow this user.",
      });
    }

    // Follow the user
    await Promise.all([
      User.findByIdAndUpdate(follwerUserId, {
        $addToSet: { following: followingUserId },
      }),
      User.findByIdAndUpdate(followingUserId, {
        $addToSet: { followers: follwerUserId },
      }),
    ]);

    // Get the updated user details
    const newUser = await User.findById(followingUserId).populate("followers");

    console.log(`User ${follower.fullName} followed ${newUser.fullName}`);
    // Send the updated user details as response
    res.json({
      success: true,
      status: 200,
      newUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      status: 500,
      message: err.message,
    });
  }
};

const unfollowUser = async (req, res) => {
  const unfollowerUserId = req.user.id;
  const unfollowingUserId = req.params.id;

  if (unfollowerUserId === unfollowingUserId) {
    return res.status(400).send({
      success: false,
      status: 400,
      message: "Users can't unfollow themselves",
    });
  }
  try {
    // Find the user to unfollow
    const unfollowUser = await User.findById(unfollowingUserId);
    if (!unfollowUser) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: `Cast to ObjectId failed for value \"${unfollowingUserId}\" at path \"_id\" for model \"user\" `,
      });
    }
    console.log(req.user.following);
    const user = await User.findById(unfollowerUserId);
    // Check if the user has already unfollowed the user
    if (!user.following.includes(unfollowingUserId)) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: `You have already unfollowed this user.`,
      });
    }

    // Remove the unfollowed user from the following list of the logged-in user
    const updatedUser = await User.findByIdAndUpdate(
      unfollowerUserId,
      { $pull: { following: unfollowingUserId } },
      { new: true }
    );
    console.log(updatedUser.following);
    // Remove the logged-in user from the followers list of the unfollowed user
    const updatedUnfollowUser = await User.findByIdAndUpdate(
      unfollowingUserId,
      { $pull: { followers: unfollowerUserId } },
      { new: true }
    );

    console.log(
      `User ${updatedUser.fullName} unfollowed ${updatedUnfollowUser.fullName}`
    );

    res.json({
      success: true,
      status: 200,
      newUser: updatedUnfollowUser,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: err.message });
  }
};

// TODO: Optimize
// brute force
const userSuggestions = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id).populate("following");
    // console.log(currentUser);
    const followingList = currentUser.following.map((user) => user._id);
    console.log("followingList", followingList);
    const followerSuggestions = [];
    const followingSuggestions = [];

    for (const followingUserId of followingList) {
      const followingUser = await User.findById(followingUserId)
        .populate("followers", "_id")
        .populate("following", "_id");

      for (const follower of followingUser.followers) {
        if (
          !followingList.includes(follower._id) &&
          follower._id.toString() !== req.user.id
        ) {
          followerSuggestions.push(follower);
        }
      }

      for (const following of followingUser.following) {
        if (
          !followingList.includes(following._id) &&
          following._id.toString() !== req.user.id
        ) {
          followingSuggestions.push(following);
        }
      }
    }

    console.log("followingSuggestions: ", followingSuggestions);
    console.log("followerSuggestions: ", followerSuggestions);
    const suggestedUsers = [
      ...followerSuggestions,
      ...followingSuggestions,
    ].filter(
      (user, index, array) =>
        array.findIndex((u) => u._id.equals(user._id)) === index
    );

    const suggestions = suggestedUsers.filter(
      (user) =>
        !currentUser.following.some((following) =>
          following._id.equals(user._id)
        )
    );

    return res.json(suggestions);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};

// query optimized
// const userSuggestions = async (req, res) => {
//   try {
//     const currentUser = await User.findById(req.user.id).populate("following");
//     const followingList = currentUser.following.map((user) => user._id);

//     const followerSuggestions = await User.aggregate([
//       { $match: { _id: { $in: followingList } } },
//       {
//         $lookup: {
//           from: "users",
//           localField: "followers",
//           foreignField: "_id",
//           as: "followers",
//         },
//       },
//       { $unwind: "$followers" },
//       { $replaceRoot: { newRoot: "$followers" } },
//       { $match: { _id: { $nin: followingList, $ne: currentUser._id } } },
//       { $group: { _id: "$_id", user: { $first: "$$ROOT" } } },
//       { $replaceRoot: { newRoot: "$user" } },
//     ]);

//     const followingSuggestions = await User.aggregate([
//       { $match: { _id: { $in: followingList } } },
//       {
//         $lookup: {
//           from: "users",
//           localField: "following",
//           foreignField: "_id",
//           as: "following",
//         },
//       },
//       { $unwind: "$following" },
//       { $replaceRoot: { newRoot: "$following" } },
//       { $match: { _id: { $nin: followingList, $ne: currentUser._id } } },
//       { $group: { _id: "$_id", user: { $first: "$$ROOT" } } },
//       { $replaceRoot: { newRoot: "$user" } },
//     ]);

//     console.log("followingSuggestions: ", followingSuggestions);
//     console.log("followerSuggestions: ", followerSuggestions);

//     const suggestedUsers = [...followerSuggestions, ...followingSuggestions];
//     const suggestedUserIds = suggestedUsers.map((user) => user._id);

//     const suggestions = await User.find({
//       _id: { $in: suggestedUserIds, $nin: followingList, $ne: currentUser._id },
//     });

//     return res.json(suggestions);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "Server error" });
//   }
// };

module.exports = {
  searchAllUsers,
  searchUser,
  updateUser,
  followUser,
  unfollowUser,
  userSuggestions,
};
