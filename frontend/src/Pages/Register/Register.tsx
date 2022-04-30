import React, {ChangeEvent, useState} from "react";
import "./Register.scss";
import {useNavigate} from "react-router";
import axiosInstance from "../../axios/axios";

const API_URL = "http://127.0.0.1:8000/api/v1/";

export const Register = () => {

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: '',
    password1: '',
    password2: '',
  })

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      [e.currentTarget.name]: e.currentTarget.value.trim(),
    });
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();

    axiosInstance
      .post(API_URL + 'auth/register/', {
        email: formData.email,
        password1: formData.password1,
        password2: formData.password2,
      })
      .then((res) => {
        sessionStorage.setItem('token', res.data.key);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.response.status, error.response.data.statusText);
      })
  }
  return (
    <div className="register">
      <div className="form">
        <div className="title">Zarejestruj</div>
        <div className="subtitle">Stwórz konto wypełniając pola</div>
        <div className="input-container1">
          <form onSubmit={handleSubmit}>
            <label>
              E-mail:
              <input type="text"
                     name="email"
                     onChange={handleChange}
              />
            </label>
            <label>
              <br/>Haslo:
              <input type="password"
                     name="password1"
                     onChange={handleChange}
              />
            </label>
            <label>
              <br/>Powtórz hasło:
              <input type="password"
                     name="password2"
                     onChange={handleChange}
              />
            </label>
            <button type="submit"
                    className="registerbutton"
            >
              Potwierdź
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
