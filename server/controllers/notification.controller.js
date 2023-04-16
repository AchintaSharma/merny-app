const Notification = require("../models/notification.model");

const createNotification = async (req, res) => {
  const { recipients, url, text } = req.body;
  const userId = req.user.id;
  try {
    const { recipients, url, text } = req.body;
    const notification = await Notification.create({
      user: userId, // from the auth middleware
      recipients,
      url,
      text,
    });
    res.status(201).send({
      success: true,
      status: 201,
      message: "Notification removed succesfully!",
    });
  } catch (err) {
    console.log(
      `Internal server error occured while creating notification: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while creating notification.",
    });
  }
};

const removeNotification = async (req, res) => {
  const notificationId = req.params.id;
  const userId = req.user.id;

  try {
    const notification = await Notification.findOne({
      _id: notificationId,
      user: userId, // Check that the notification belongs to the logged-in user
    });
    // If the notification isn't found, return a 404 error
    if (!notification) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "Notification not found!",
      });
    }

    // Delete the notification from the database
    await notification.remove();

    // Return a success message
    res.send({
      success: true,
      status: 200,
      message: "Notification removed",
    });
  } catch (err) {
    console.log(
      `Internal server error occured while removing notification: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message: "Internal server error occured while removing notification.",
    });
  }
};

const getAllNotifications = async (req, res) => {
  const userId = req.user.id;
  try {
    const notifications = await Notification.find({
      recipients: req.user._id,
    });

    if (!notifications) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "No notifications found!",
      });
    }

    return res.status(200).send({
      success: true,
      status: 200,
      message: "Success!",
      notifications,
    });
  } catch (err) {
    console.log(
      `Internal server error occured while fetching all notifications: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message:
        "Internal server error occured while fetching all notifications.",
    });
  }
};

const updateNotificationReadStatus = async (req, res) => {
  const notificationId = req.params.id;
  const userId = req.user.id;
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: notificationId, recipients: userId },
      { isRead: true },
      { new: true }
    );
    if (!notification) {
      return res.status(404).send({
        success: false,
        status: 404,
        message: "Notification not found!",
      });
    }
    return res.status(200).send({
      success: true,
      status: 200,
      notification,
    });
  } catch (err) {
    console.log(
      `Internal server error occured while updating notification read status: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message:
        "Internal server error occured while updating notification read status.",
    });
  }
};

const deleteAllNotifications = async (req, res) => {
  try {
    const deletedNotifications = await Notification.deleteMany({
      recipients: req.user._id,
    });
    res.json({
      success: true,
      status: 200,
      n: deletedNotifications.length,
      ok: deletedNotifications.length,
      deletedCount: deletedNotifications.length,
    });
  } catch (err) {
    console.log(
      `Internal server error occured while deleting all notifications: ${err}`
    );
    return res.status(500).send({
      success: false,
      status: 500,
      message:
        "Internal server error occured while deleting all notifications.",
    });
  }
};

module.exports = {
  createNotification,
  removeNotification,
  getAllNotifications,
  updateNotificationReadStatus,
  deleteAllNotifications,
};
