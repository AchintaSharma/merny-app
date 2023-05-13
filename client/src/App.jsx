import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Copyright from "./components/Footer/Copyright";
import ProfilePage from "./pages/ProfilePage";
import MessengerPage from "./pages/MessengerPage";
import SignupPage from "./pages/Signup/Signup";

// React router - route definitions
const router = createBrowserRouter([
  {
    path: "/register",
    element: <SignupPage />,
  },
  {
    path: "/",
    element: <HomePage />,
  },

  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/messenger",
    element: <MessengerPage />,
  },
]);

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <RouterProvider router={router} />
      {/* <Copyright /> */}
    </React.Fragment>
  );
}

export default App;
