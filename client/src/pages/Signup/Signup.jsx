import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/app-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

// TODO: Refactor to an API file later.
const AUTH_SIGNUP_API = "http://localhost:4001/merny/api/v1/auth/register";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    const { fullName, userName, email, password, gender } =
      event.target.elements;
    if (!fullName || !userName || !email || !password || !gender) {
      alert("All fields are required.");
      return;
    }
    if (password.length < 8) {
      alert("Password should be at least 8 characters.");
      return;
    }

    const signupFormData = {
      fullName: fullName.value,
      userName: userName.value,
      email: email.value,
      password: password.value,
      gender: gender.value,
    };

    try {
      const response = await axios.post(AUTH_SIGNUP_API, signupFormData);
      const { accessToken, user, message } = response.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("user", JSON.stringify(user));

        alert(`${message} User ${user.fullName} registered.`);

        navigate("/");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleShowPasswordDown = () => {
    setShowPassword(true);
  };

  const handleShowPasswordUp = () => {
    setShowPassword(false);
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="justify-center bg-white shadow-md rounded-lg p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <form onSubmit={handleSignup} className="flex flex-col justify-center">
          <div className="w-full max-w-sm">
            <img src={AppLogo} className="mb-5" />
            <h1 className="font-bold text-center text-2xl mb-5 text-gray-600 ">
              Create an Account
            </h1>
          </div>

          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="font-bold mb-2 text-gray-700 block text-start"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              placeholder="Full name"
              onChange={(event) => setFullName(event.target.value)}
              className=" p-2 w-full px-5 py-2 rounded-lg bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="userName"
              className="font-bold mb-2 text-gray-700 block text-start"
            >
              Username
            </label>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              className=" p-2 w-full px-5 py-2 rounded-lg bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="font-bold mb-2 text-gray-700 block text-start"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(event) => setEmail(event.target.value)}
              className=" p-2 w-full px-5 py-2 rounded-lg bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="font-bold mb-2 text-gray-700 block text-start"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="p-2 w-full px-5 py-2 rounded-lg bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                type="button"
                onMouseDown={handleShowPasswordDown}
                onMouseUp={handleShowPasswordUp}
                className="absolute right-4 top-5 transform -translate-y-1/2 bg-transparent border-none focus:outline-none"
              >
                <FontAwesomeIcon
                  icon={faEye}
                  size="md"
                  className="text-gray-400"
                />
              </button>
            </div>
          </div>
          <div className="mb-5">
            <label
              htmlFor="gender"
              className="font-bold mb-2 text-gray-700 block text-start"
            >
              Gender
            </label>
            <div className="text-start">
              <label
                htmlFor="male"
                className="inline-flex items-center cursor-pointer"
              >
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="Male"
                  className="form-radio h-5 w-5 text-gray-600"
                  required
                />
                <span className="ml-2 text-gray-700">Male</span>
              </label>
              <label
                htmlFor="female"
                className="inline-flex items-center ml-6 cursor-pointer"
              >
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="Female"
                  className="form-radio h-5 w-5 text-gray-600"
                  required
                />
                <span className="ml-2 text-gray-700">Female</span>
              </label>
              <label
                htmlFor="other"
                className="inline-flex items-center ml-6 cursor-pointer"
              >
                <input
                  type="radio"
                  id="other"
                  name="gender"
                  value="Other"
                  className="form-radio h-5 w-5 text-gray-600"
                  required
                />
                <span className="ml-2 text-gray-700">Other</span>
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
          <h1>
            Already Registered?{" "}
            <a className="text-blue-500" href="/login">
              Login.
            </a>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
