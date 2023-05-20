const postController = require("../controllers/post.controller");
const { verifyToken } = require("../middlewares/authjwt");

module.exports = (app) => {
  app.post("/merny/api/v1/posts/", [verifyToken], postController.createPost);

  app.get(
    "/merny/api/v1/posts",
    [verifyToken],
    postController.viewUsersFeedPosts
  );

  app.patch("/merny/api/v1/post/:id", [verifyToken], postController.updatePost);

  app.get("/merny/api/v1/post/:id", [verifyToken], postController.getPostById);

  app.delete(
    "/merny/api/v1/post/:id",
    [verifyToken],
    postController.deletePost
  );
  app.patch(
    "/merny/api/v1/post/:id/like",
    [verifyToken],
    postController.likePost
  );

  app.patch(
    "/merny/api/v1/post/:id/unlike",
    [verifyToken],
    postController.unlikePost
  );

  app.get(
    "/merny/api/v1/user_posts/:id",
    [verifyToken],
    postController.getParticularUsersPosts
  );

  app.patch(
    "/merny/api/v1/savePost/:id",
    [verifyToken],
    postController.savePost
  );

  app.patch(
    "/merny/api/v1/unsavePost/:id",
    [verifyToken],
    postController.unsavePost
  );

  app.get(
    "/merny/api/v1/getSavedPosts",
    [verifyToken],
    postController.getAllSavedPosts
  );
};
