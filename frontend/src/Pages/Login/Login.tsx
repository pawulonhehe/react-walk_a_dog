<<<<<<< HEAD
import React, { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import axiosInstance from "../../axios/axios";
=======
import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import axios from "axios";
>>>>>>> 573ecd9ec23d5574ea2c863e39bae81cb1458266

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const user = { email, password };
<<<<<<< HEAD
    axiosInstance
      .post("auth/login/", user)
=======
    axios
      .post("/auth/login/", user)
>>>>>>> 573ecd9ec23d5574ea2c863e39bae81cb1458266
      .then((res) => {
        sessionStorage.setItem("token", res.data.key);
        navigate("/");
      })
      .catch((error) => {
<<<<<<< HEAD
        console.log(error.response.status, error.response.data.statusText);
=======
        console.log(error);
>>>>>>> 573ecd9ec23d5574ea2c863e39bae81cb1458266
      });
  };

  return (
    <div className="login">
      <div className="form">
        <div className="title">Zaloguj</div>
        <div className="subtitle">Zaloguj się wypełniając pola</div>
        <div className="input-container1">
          <form noValidate>
            <label>
              E-mail:
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              <br />
              Haslo:
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <button
              type="submit"
              className="loginbutton"
              onClick={handleSubmit}
            >
              Potwierdź
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
