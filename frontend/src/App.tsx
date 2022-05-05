import React from "react";

import "./App.scss";
import Views from "./Views";

export const App = () => {
  sessionStorage.setItem("token", "12345");
  return (
    <div className="main-app">
      <Views />
    </div>
  );
};

export default App;
