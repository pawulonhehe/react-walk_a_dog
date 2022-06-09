import React from "react";
import "./App.scss";
import Views from "./Views";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "https://backend-wad.herokuapp.com/api/";
export const App = () => {
  return (
    <div className="main-app">
      <Views />
      <ToastContainer />
    </div>
  );
};

export default App;
