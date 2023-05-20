const userController = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authjwt");

module.exports = (app) => {
  app.get(
    "/merny/api/v1/search/",
    [verifyToken],
    userController.searchAllUsers
  );
  app.patch("/merny/api/v1/user/", [verifyToken], userController.updateUser);

  app.get("/merny/api/v1/user/:id", [verifyToken], userController.searchUser);

  app.patch(
    "/merny/api/v1/user/:id/follow",
    [verifyToken],
    userController.followUser
  );

  app.patch(
    "/merny/api/v1/user/:id/unfollow",
    [verifyToken],
    userController.unfollowUser
  );

  app.get(
    "/merny/api/v1/suggestionsUser",
    [verifyToken],
    userController.userSuggestions
  );

  app.get("/merny/api/v1/contacts", [verifyToken], userController.userContacts);

  // app.delete(
  //   "/iga/api/v1/users/delete/:id",
  //   [verifyToken, validateUserIdParam],
  //   userController.deleteUser
  // );
};
