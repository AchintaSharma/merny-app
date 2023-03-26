const User = require("./models/user.model");
const bcrypt = require("bcryptjs");
const { userRole } = require("./utils/constants");

module.exports = async () => {
  try {
    const user = await User.findOne({
      role: userRole.admin,
    });

    if (user) {
      console.log(`Admin user ${user.fullName} exists.`);
      return;
    } else {
      const user = await Employee.create({
        // fname: "Achinta",
        // lname: "Sharma",
        // employeeId: "admin",
        // password: bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8),
        // email: "sample@gmail.com",
        // phone: "1234567890",
        // employeeType: constants.employeeType.admin,
        // emailVerified: true,
        // phoneVerified: true,
        // employeeStatus: constants.employeeStatus.approved,
      });

      console.log("#### Admin user created ####");
    }
  } catch (err) {
    console.log("#### Error in DB initialization ####", err.message);
  }
};
