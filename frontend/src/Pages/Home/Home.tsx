import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className="home">
      <div className="hometitle--container">
        <div className="hometitle">
          <h1>Walk-A-Dog</h1>
        </div>
      </div>
      <div className="buttoncontainer">
        <Link to="login">
          <button type="submit" className="button">
            Zaloguj
          </button>
        </Link>
        <Link to="register">
          <button type="submit" className="button">
            Zarejestruj
          </button>
        </Link>
      </div>
    </div>
  );
};
