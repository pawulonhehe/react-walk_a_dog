import { useState } from "react";
import "./Login.scss";
import { useNavigate } from "react-router";
import axios from "axios";
import { notify } from "../../helpers";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { email, password };

    axios
      .post("/auth/login/", user)
      .then((res) => {
        sessionStorage.setItem("token", res.data.key);
        sessionStorage.setItem("user", res.data.user);
        sessionStorage.setItem("is_trainer", res.data.is_trainer);
        navigate("/mydogs");
        notify("succes", "Poprawnie zalogowano");
      })
      .catch((error) => {
        console.log(error.response);
        console.log("dupa");
        notify("warning", "Niepoprawne dane logowania");
      })
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
