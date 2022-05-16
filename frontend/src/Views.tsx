import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import { AfterLogin } from "./Pages/AfterLogin/AfterLogin";
import { EditProfile } from "./Pages/EditProfile/EditProfile";
import { EditAvatar } from "./Pages/EditAvatar/EditAvatar";
import { EditAccount } from "./Pages/EditAccount/EditAccount";
import { MyDogs } from "./Pages/MyDogs/MyDogs";
import { AddDog } from "./Pages/AddDog/AddDog";
import { Reservations } from "./Pages/Reservations/Reservations";
import { Statute } from "./Pages/Statute/Statute";
import { Mapa } from "./Pages/Mapa/Mapa";
import { EditDog } from "./Pages/EditDog/EditDog";
import { Users } from "./Pages/Users/Users";
import { Owner } from "./Pages/Trener/Owner/Owner";
import { Dog } from "./Pages/Trener/Dog/Dog";
import { AfterTrener } from "./Pages/Trener/AfterTrener/AfterTrener";
import { YourClients } from "./Pages/Trener/YourClients/YourClients";
import { BookWalk } from "./Pages/BookWalk/BookWalk";
import { Trainers } from "./Pages/Trainers/Trainers";
import { TrainerDetails } from "./Pages/TrainerDetails/TrainerDetails";
import { TrainerDetailsHist } from "./Pages/TrainerDetailsHist/TrainerDetailsHist";
import React from "react";

const Views = () => {
  const isAuth = sessionStorage.getItem("token") !== null;
  // const isAuth = true;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={isAuth ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/register"
          element={isAuth ? <Navigate to={"/"} /> : <Register />}
        />
        <Route path="/get-users" element={<Users />} />
        <Route element={<ProtectedRoutes auth={isAuth} />}>
          <Route path="/afterlogin" element={<AfterLogin />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/editavatar" element={<EditAvatar />} />
          <Route path="/editaccount" element={<EditAccount />} />
          <Route path="/mydogs" element={<MyDogs />} />
          <Route path="/addDog" element={<AddDog />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/testymapa" element={<Mapa />} />
          <Route path="/statute" element={<Statute />} />
          <Route path="/editdog" element={<EditDog />} />
          <Route path="/bookwalk" element={<BookWalk />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainerdetails" element={<TrainerDetails />} />
          <Route path="/trainerdetailshist" element={<TrainerDetailsHist />} />

          {/* nizej trener */}

          <Route path="/owner" element={<Owner />} />
          <Route path="/dog" element={<Dog />} />
          <Route path="/aftertrener" element={<AfterTrener />} />
          <Route path="/yourclients" element={<YourClients />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Views;
