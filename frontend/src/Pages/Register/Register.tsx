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
              E-mail:
              <input type="text" />
            </label>
            <label>
              <br></br>Haslo:
              <input type="password" />
            </label>
            <label>
              <br></br>Powtórz hasło:
              <input type="password" />
            </label>
            <label>
              <br></br>Numer telefonu:
              <input type="password" />
            </label>
            <button type="submit" className="registerbutton">
              Potwierdź
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
