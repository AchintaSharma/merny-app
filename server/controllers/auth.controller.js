const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const authConfig = require("../configs/auth.config");
const { salt, jwtExpiryTime } = require("../configs/auth.config");

// Function for user signup
const signUp = async (req, res) => {
  // Create user and store user data in user object
  const { fullName, userName, email, password, gender } = req.body;

  const hashedPassword = bcrypt.hashSync(password, parseInt(salt));
  try {
    const userCreated = await User.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
      gender,
    });

    // Remove password from response
    const { password, ...response } = userCreated.toObject();
    console.log(`${response.role} ${response.fullName} registered.`);

    // Issue jwt token and add user name and email to payload
    const token = jwt.sign(
      {
        name: userCreated.name,
        email: userCreated.email,
        purpose: "authentication",
      },
      authConfig.secret,
      { expiresIn: jwtExpiryTime }
    );

    // Send response
    return res.status(201).send({
      status: 201,
      success: true,
      message: "Register Success!",
      accessToken: token,
      user: response,
    });
  } catch (err) {
    console.log("Error while creating user: ", err.message);
    return res.status(500).send({
      status: 500,
      success: false,
      message: "Internal server message while creating user.",
    });
  }
};

//Function for user login
const login = async (req, res) => {
  const { email, password } = req.body;
  // Fetch user and verify password
  try {
    // Check if user exists
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).send({
        status: 404,
        success: false,
        field: "email",
        message: "This email does not exist.",
      });
    }

    // Check if the password is correct
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        status: 401,
        success: false,
        field: "password",
        message: "Password is incorrect.",
      });
    }

    // Issue jwt token and add user name and email to payload
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        purpose: "authentication",
      },
      authConfig.secret,
      { expiresIn: jwtExpiryTime }
    );
    console.log(`${user.role} ${user.fullName} successfully logged in.`);

    // Remove password field from user object
    const userObj = user.toObject();
    delete userObj.password;

    // const response = user.toObject();
    return res.status(200).send({
      status: 200,
      success: true,
      message: "Login Success!",
      accessToken: token,
      user: userObj,
    });
  } catch (err) {
    console.log("Error during user login: ", err.message);
    return res.status(500).send({
      status: 500,
      success: false,
      message: "Internal server error during user login.",
    });
  }
};

//Function for user login
const logout = async (req, res) => {
  const { email, password } = req.body;
  // Fetch user and verify password
  try {
    // Check if user exists
    const user = await User.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).send({
        status: 404,
        success: false,
        field: "email",
        message: "This email does not exist.",
      });
    }

    // Check if the password is correct
    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        status: 401,
        success: false,
        field: "password",
        message: "Password is incorrect.",
      });
    }

    // Remove the JWT token from the client-side storage
    // res.clearCookie("jwt");

    // Redirect the user to the login page or any other page
    //res.redirect("/login");

    console.log(`${user.role} ${user.fullName} successfully logged out.`);

    return res.status(200).send({
      status: 200,
      success: true,
      message: "Logged Out!",
    });
  } catch (err) {
    console.log("Error during user login: ", err.message);
    return res.status(500).send({
      status: 500,
      success: false,
      message: "Internal server error during user login.",
    });
  }
};

module.exports = {
  signUp,
  login,
  logout,
};
