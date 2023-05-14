import { useLocation, useRoutes } from "react-router-dom";

import HomePage from "./pages/Home/HomePage";
// import Copyright from "./";
import ProfilePage from "./pages/Profile/ProfilePage";
import MessengerPage from "./pages/Messenger/MessengerPage";
import SignupPage from "./pages/Signup/Signup";
import LoginPage from "./pages/Login/Login";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

// React router - route definitions

function App() {
  let location = useLocation();

  const routes = useRoutes([
    {
      path: "/register",
      element: <SignupPage />,
    },
    {
      path: "/profile",
      element: <ProfilePage />,
    },
    {
      path: "/messenger",
      element: <MessengerPage />,
    },
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);

  if (location.pathname == "/register") {
    return routes;
  } else {
    return (
      <>
        <Navbar />
        {routes}
      </>
    );
  }
}

export default App;
