import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AppLogo from "../../assets/app-logo.png";

// TODO: Refactor to an API file later.
const AUTH_LOGIN_API = "http://localhost:4001/merny/api/v1/auth/login";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    if (!email) {
      alert("Enter email.");
      return;
    }
    if (!password) {
      alert("Enter password.");
      return;
    }

    const loginFormData = {
      email: email.value,
      password: password.value,
    };

    try {
      const response = await axios.post(AUTH_LOGIN_API, loginFormData);
      console.log(response.data);
      const { accessToken, user, message } = response.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(user));

      alert(`${message} User ${user.fullName} logged in.`);

      navigate("/");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
      <div className="justify-center bg-white shadow-md rounded-lg p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <form onSubmit={handleLogin} className="flex flex-col justify-center">
          <div className="w-full max-w-sm">
            <img src={AppLogo} className="mb-5" />
            <h1 className="font-bold text-center text-2xl mb-5 text-gray-600 ">
              Login to Account
            </h1>
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
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className=" p-2 w-full px-5 py-2 rounded-lg bg-gray-100 border-0 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-3 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
          <h1>
            Don't have an account?{" "}
            <a className="text-blue-500" href="/register">
              Sign up.
            </a>
          </h1>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
