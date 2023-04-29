import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import UserInfoDisplayCard from "./components/UserInfoDisplayCard/UserInfoDisplayCard";
function App() {
  return (
    <>
      <Navbar />
      <div className="grid grid-cols-12 gap-6 mx-6">
        <div className="col-span-8 bg-gray-200 h-32"></div>
        <div className="col-span-4">
          <UserInfoDisplayCard />
        </div>
      </div>

      <>{/*  */}</>
    </>
  );
}

export default App;
