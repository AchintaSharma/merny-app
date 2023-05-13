const User = require("../models/user.model");
const { isValidEmail, isValidPassword } = require("../utils/validators");

const validateSignUpRequestBody = async (req, res, next) => {
  const { fullName, userName, email, password } = req.body;
  try {
    // Check if full name is provided
    if (!fullName) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "fullName",
        message: "Full name is not provided.",
      });
    }

    // Check if user name is provided
    if (!userName) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "userName",
        message: "User name is not provided.",
      });
    }

    //TODO: user name should not contain spaces

    // Check if user name already exists
    try {
      const user = await User.findOne({ userName: userName });

      if (user != null) {
        return res.status(400).send({
          status: 400,
          success: false,
          field: "email",
          message: "This user name already exists.",
        });
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        success: false,
        message: "Internal server error while validating the sign-up request.",
      });
    }

    // Check if email is provided
    if (!email) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "email",
        message: "Email is not provided.",
      });
    }

    try {
      const user = await User.findOne({ email: email });

      if (user != null) {
        return res.status(400).send({
          status: 400,
          success: false,
          field: "email",
          message: "This email already exists.",
        });
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        success: false,
        message: "Internal server error while validating the sign-up request.",
      });
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "email",
        message: "Email format is incorrect.",
      });
    }

    // Check if password is provided
    if (!password) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "password",
        message: "Password is not provided.",
      });
    }

    // Validate password format
    if (!isValidPassword(password)) {
      return res.status(400).send({
        status: 400,
        success: false,
        field: "password",
        message:
          "Not a valid password. Password must be 6 to 25 characters containing at least one lowercase letter, one uppercase letter, one numeric digit, and one special character.",
      });
    }

    next();
  } catch (err) {
    console.log("Error while validating sign-up request body.", err.message);
    return res.status(500).send({
      status: 500,
      success: false,
      message:
        "Internal server error occurred while validating the sign-up request.",
    });
  }
};

const validateLoginRequestBody = (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Check if email is provided
    if (!email) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Email Id is not provided",
        field: "email",
      });
    }

    // Validate password
    if (!password) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: "Password is not provided",
        field: "password",
      });
    }
  } catch (err) {
    console.log("Error while validating login request body.", err.message);
    return res.status(500).send({
      status: 500,
      success: false,
      message:
        "Internal server error occurred while validating the login request.",
    });
  }
  next();
};

module.exports = {
  validateSignUpRequestBody,
  validateLoginRequestBody,
};
