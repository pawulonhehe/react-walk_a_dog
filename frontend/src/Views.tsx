import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import {Home} from "./Pages/Home/Home";
import {Login} from "./Pages/Login/Login";
import {Register} from "./Pages/Register/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import {AfterLogin} from "./Pages/AfterLogin/AfterLogin";
import {EditProfile} from "./Pages/EditProfile/EditProfile";
import {EditAvatar} from "./Pages/EditAvatar/EditAvatar";
import {EditAccount} from "./Pages/EditAccount/EditAccount";
import {MyDogs} from "./Pages/MyDogs/MyDogs";
import {AddDog} from "./Pages/AddDog/AddDog";
import React from "react";

const Views = () => {
  const isAuth = sessionStorage.getItem("token") !== null;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={isAuth ? <Navigate to={"/"}/> : <Login/>}/>
        <Route path="/register" element={isAuth ? <Navigate to={"/"}/> : <Register/>}/>
        <Route element={<ProtectedRoutes auth={isAuth}/>}>
          <Route path="/afterlogin" element={<AfterLogin/>}/>
          <Route path="/editprofile" element={<EditProfile/>}/>
          <Route path="/editavatar" element={<EditAvatar/>}/>
          <Route path="/editaccount" element={<EditAccount/>}/>
          <Route path="/mydogs" element={<MyDogs/>}/>
          <Route path="/addDog" element={<AddDog/>}/>
        </Route>
        <Route path="*" element={<h1>404 Not Found!</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default Views;
