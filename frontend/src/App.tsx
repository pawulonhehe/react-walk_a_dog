import React from "react";

import "./App.scss";
import Views from "./Views";

import axios from "axios";
axios.defaults.baseURL = "https://backend-wad.herokuapp.com/api/";
export const App = () => {
  return (
    <div className="main-app">
      <Views />
    </div>
  );
};

export default App;
