const notificationController = require("../controllers/notification.controller");
const { verifyToken } = require("../middlewares/authjwt");

module.exports = (app) => {
  app.post(
    "/merny/api/v1/notification/",
    [verifyToken],
    notificationController.createNotification
  );

  app.delete(
    "/merny/api/v1/notification/:id",
    [verifyToken],
    notificationController.removeNotification
  );

  app.get(
    "/merny/api/v1/notifications",
    [verifyToken],
    notificationController.getAllNotifications
  );

  app.get(
    "/merny/api/v1/isReadNotification/:id",
    [verifyToken],
    notificationController.updateNotificationReadStatus
  );

  app.delete(
    "/merny/api/v1/deleteAllNotification",
    [verifyToken],
    notificationController.deleteAllNotifications
  );
};
