const messageController = require("../controllers/message.controller");
const { verifyToken } = require("../middlewares/authjwt");

module.exports = (app) => {
  app.post(
    "/merny/api/v1/message/",
    [verifyToken],
    messageController.createMessage
  );

  app.get(
    "/merny/api/v1/conversations",
    [verifyToken],
    messageController.getConversationHistory
  );

  app.get(
    "/merny/api/v1/message/:id",
    [verifyToken],
    messageController.getMessageDetails
  );

  app.delete(
    "/merny/api/v1/message/:id",
    [verifyToken],
    messageController.deleteMessage
  );

  app.delete(
    "/merny/api/v1/conversation/:id",
    [verifyToken],
    messageController.deleteConversation
  );
};
