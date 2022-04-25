import React from "react";
import "./Register.scss";

export const Register = () => {
  return (
    <div className="register">
      <div className="form">
        <div className="title">Zarejestruj</div>
        <div className="subtitle">Stwórz konto wypełniając pola</div>
        <div className="input-container1">
          <form>
            <label>
              Login:
              <input type="text" />
            </label>
            <label>
              <br></br>Haslo:
              <input type="password" />
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};
