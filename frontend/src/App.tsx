import React from "react";

import "./App.scss";
import Views from "./Views";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/api/";
export const App = () => {
  return (
    <div className="main-app">
      <Views />
    </div>
  );
};

export default App;
