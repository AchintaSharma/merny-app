const commentController = require("../controllers/comment.controller");
const { verifyToken } = require("../middlewares/authjwt");

module.exports = (app) => {
  app.get(
    "/merny/api/v1/comment/",
    [verifyToken],
    commentController.addComment
  );

  app.post(
    "/merny/api/v1/comment/:id",
    [verifyToken],
    commentController.updateComment
  );

  app.post(
    "/merny/api/v1/comment/:id/like",
    [verifyToken],
    commentController.likeComment
  );

  app.post(
    "/merny/api/v1/comment/:id/unlike",
    [verifyToken],
    commentController.unlikeComment
  );

  app.delete(
    "/merny/api/v1/comment/:id",
    [verifyToken],
    commentController.deleteComment
  );
};
