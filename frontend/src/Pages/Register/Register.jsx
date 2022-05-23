import React, { ChangeEvent, useState } from "react";
import "./Register.scss";
import { useNavigate } from "react-router";
import axios from "axios";

export const Register = () => {
  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: "",
    password1: "",
    password2: "",
    phonenumber: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("auth/register/", {
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2,
        phonenumber: formData.phonenumber,
      })
      .then((res) => {
        sessionStorage.setItem("token", res.data.key);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div className="register">
      <div className="form">
        <div className="title">Zarejestruj</div>
        <div className="subtitle">Stwórz konto wypełniając pola</div>
        <div className="input-container1">
          <form onSubmit={handleSubmit}>
            <label>
              E-mail:
              <input type="text" name="email" onChange={handleChange} />
            </label>
            <label>
              <br />
              Haslo:
              <input type="password" name="password1" onChange={handleChange} />
            </label>
            <label>
              <br />
              Powtórz hasło:
              <input type="password" name="password2" onChange={handleChange} />
            </label>
            <label>
              <br />
              Numer telefonu:
              <input type="number" name="phonenumber" onChange={handleChange} />
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
