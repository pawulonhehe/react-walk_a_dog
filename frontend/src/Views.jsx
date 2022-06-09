import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import { AfterLogin } from "./Pages/AfterLogin/AfterLogin";
import { EditProfile } from "./Pages/EditProfile/EditProfile";
import { EditAvatar } from "./Pages/EditAvatar/EditAvatar";
import { EditAccount } from "./Pages/EditAccount/EditAccount";
import { DogList } from "./Pages/DogsList/DogList";
import { AddDog } from "./Pages/AddDog/AddDog";
import { Reservations } from "./Pages/Reservations/Reservations";
import { Statute } from "./Pages/Statute/Statute";
import { EditDog } from "./Pages/EditDog/EditDog";
import { Users } from "./Models/Users";
import { Owner } from "./Pages/Trener/Owner/Owner";
import { Dog } from "./Pages/Trener/Dog/Dog";
import { AfterTrener } from "./Pages/Trener/AfterTrener/AfterTrener";
import { YourClients } from "./Pages/Trener/YourClients/YourClients";
import { BookWalk } from "./Pages/BookWalk/BookWalk";
import { Trainers } from "./Pages/Trainers/Trainers";
import { TrainerDetails } from "./Pages/TrainerDetails/TrainerDetails";
import { TrainerDetailsHist } from "./Pages/TrainerDetailsHist/TrainerDetailsHist";
import { StartWork } from "./Pages/Trener/StartWork/StartWork";
import { WalkDetails } from "./Pages/WalkDetails/WalkDetails";
import { TrainerHist } from "./Pages/Trener/TrainerHist/TrainerHist";
import { EditDogAvatar } from "./Pages/EditDogAvatar/EditDogAvatar";
import { MyOpinions } from "./Pages/Trener/MyOpinions/MyOpinions";
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
          <Route path="/editprofile/:id" element={<EditProfile />} />
          <Route path="/editavatar/:id" element={<EditAvatar />} />
          <Route path="/editaccount/:id" element={<EditAccount />} />
          <Route path="/mydogs/" element={<DogList />} />
          <Route path="/addDog" element={<AddDog />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/statute" element={<Statute />} />
          <Route path="/editdog/:id" element={<EditDog />} />
          <Route path="/bookwalk" element={<BookWalk />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/trainerdetails/:id" element={<TrainerDetails />} />
          <Route path="/trainerdetailshist" element={<TrainerDetailsHist />} />
          <Route path="/walkdetails/:id" element={<WalkDetails />} />
          <Route path="/editdogavatar/:id" element={<EditDogAvatar />} />

          {/* nizej trener */}

          <Route path="/owner" element={<Owner />} />
          <Route path="/dog" element={<Dog />} />
          <Route path="/aftertrener" element={<AfterTrener />} />
          <Route path="/yourclients/:id" element={<YourClients />} />
          <Route path="/startwork" element={<StartWork />} />
          <Route path="/trainerhist/:id" element={<TrainerHist />} />
          <Route path="/myopinions/:id" element={<MyOpinions />} />
        </Route>
        <Route path="*" element={<h1>404 Not Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
export default Views;
