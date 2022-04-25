import React from "react";
import { Home } from "./Pages/Home/Home";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
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
        </Routes>
      </Router>
    </div>
  );
};

export default App;
