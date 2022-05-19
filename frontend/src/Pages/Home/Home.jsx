import React from "react";
import "./Home.scss";
import {Link} from "react-router-dom";
import axios from "axios";
export const Home = () => {

  const handleLogout = () => {
    axios
      .post('auth/logout/')
      .then(() => {
        sessionStorage.removeItem("token");
        window.location.reload();
      });
  };

  if (sessionStorage.getItem("token"))
    return (
      <div className="home">
        <div className="home__container">
          <div className="home__container__title">
            <h1>Welcome to the Home Page</h1>
            <h2>Dashboard</h2>
          </div>
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    );
  else
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
