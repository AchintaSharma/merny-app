const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const { userRole } = require("../utils/constants");
module.exports = async () => {
  try {
    const user = await User.findOne({
      role: userRole.admin,
    });

    if (!user) {
      const user = await User.create({
        fullName: "admin",
        userName: "admin",
        password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
        email: "23achinta@gmail.com",
        role: userRole.admin,
      });

      console.log(`Admin user ${user.fullName} created.`);
    } else {
      console.log(`Admin: ${user.fullName}\nEmail: ${user.email}`);
    }
  } catch (err) {
    console.log("Error in DB initialization: ", err.message);
  }
};
