const authController = require("../controllers/auth.controller");
const {
  validateSignUpRequestBody,
  validateLoginRequestBody,
} = require("../middlewares/validateAuthRequests");

module.exports = (app) => {
  // Signup route
  app.post(
    "/merny/api/v1/auth/register",
    validateSignUpRequestBody,
    authController.signUp
  );

  // Login route
  app.post(
    "/merny/api/v1/auth/login",
    validateLoginRequestBody,
    authController.login
  );

  // Logout route
  app.post(
    "/merny/api/v1/auth/logout",
    validateLoginRequestBody,
    authController.logout
  );
};
