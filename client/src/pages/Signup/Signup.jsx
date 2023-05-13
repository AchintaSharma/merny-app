import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// TODO: Refactor to an API file later.
const AUTH_SIGNUP_API = "http://localhost:4001/merny/api/v1/auth/register";

const SignupPage = () => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      console.log(response.data);
      const { accessToken, user, message } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      alert(`${message} User ${user.fullName} registered.`);

      // TODO @bard Bard I want you to focus on this part
      // redirect to home page (path: "/")
      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <h1 className="font-bold text-center text-2xl mb-5">
          Create an Account
        </h1>
        <form
          onSubmit={handleSignup}
          className="bg-white rounded-lg shadow p-10"
        >
          <div className="mb-5">
            <label
              htmlFor="fullName"
              className="font-bold mb-1 text-gray-700 block"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="border border-gray-400 p-2 w-full rounded-lg"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="userName"
              className="font-bold mb-1 text-gray-700 block"
            >
              Username
            </label>
            <input
              type="text"
              name="userName"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              className="border border-gray-400 p-2 w-full rounded-lg"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="font-bold mb-1 text-gray-700 block"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border border-gray-400 p-2 w-full rounded-lg"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="font-bold mb-1 text-gray-700 block"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-gray-400 p-2 w-full rounded-lg"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="gender"
              className="block mb-2 font-bold text-gray-700"
            >
              Gender
            </label>
            <div>
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
