import React from "react";
import "./Login.scss";

export const Login = () => {
  return (
    <div className="login">
      <div className="form">
        <div className="title">Zaloguj</div>
        <div className="subtitle">Zaloguj się wypełniając pola</div>
        <div className="input-container1">
          <form>
            <label>
              E-mail:
              <input type="text" />
            </label>
            <label>
              <br></br>Haslo:
              <input type="password" />
            </label>
            <button type="submit" className="loginbutton">
              Potwierdź
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
