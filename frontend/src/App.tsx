import React from "react";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import "./App.module.scss";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import classes from "./App.module.scss";

function App() {
  return (
    <div className={classes["main-app"]}>
      <Router>
        <nav>
          <h1>MENU</h1>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Router>
    </div>
  );
}

export default App;
