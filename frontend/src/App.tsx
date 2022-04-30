import React from "react";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { AfterLogin } from "./Pages/AfterLogin/AfterLogin";
import { EditProfile } from "./Pages/EditProfile/EditProfile";
import { EditAvatar } from "./Pages/EditAvatar/EditAvatar";
import { EditAccount } from "./Pages/EditAccount/EditAccount";
import { MyDogs } from "./Pages/MyDogs/MyDogs";
import { AddDog } from "./Pages/AddDog/AddDog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";

export const App = () => {
  return (
    <div className="main-app">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/afterlogin" element={<AfterLogin />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/editavatar" element={<EditAvatar />} />
          <Route path="/editaccount" element={<EditAccount />} />
          <Route path="/mydogs" element={<MyDogs />} />
          <Route path="/addDog" element={<AddDog />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
