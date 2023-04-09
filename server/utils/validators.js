// Function to validate email id format
const isValidEmail = (email) => {
  // checks valid email format
  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9._]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

//Function to validate Password
const isValidPassword = (password) => {
  // checks password meets requirements
  return password.match(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,25}$/
  );
};

// Checks if a given string represents a base64-encoded JPEG or PNG image.
const isBase64JpgOrPng = (str) => {
  const regex =
    /^data:image\/(jpeg|png);base64,([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;

  if (!regex.test(str)) {
    return false;
  }
  const mime = str.split(";")[0].split(":")[1];
  if (mime !== "image/jpeg" && mime !== "image/png") {
    return false;
  }

  return true;
};

module.exports = {
  isValidEmail,
  isValidPassword,
  isBase64JpgOrPng,
};
