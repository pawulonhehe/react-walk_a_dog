import React, {ChangeEvent, useState} from "react";
import "./Login.scss";
import {useNavigate} from "react-router";
import axiosInstance from "../../axios/login";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const Login = () => {

  const navigate = useNavigate();
  const initialFormData = Object.freeze({
    email: '',
    password: '',
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
      .post(BACKEND_URL + 'auth/login/', {
        email: formData.email,
        password: formData.password,
      })
      .then((res) => {
        localStorage.setItem('access_key', res.data.key);
        console.log(res.data.key);
        navigate('/');
      })
      .catch((error) => {
        console.log(error.response.data);
      })
  }


  return (
    <div className="login">
      <div className="form">
        <div className="title">Zaloguj</div>
        <div className="subtitle">Zaloguj się wypełniając pola</div>
        <div className="input-container1">
          <form noValidate>
            <label>
              E-mail:
              <input type="email"
                     name="email"
                     onChange={handleChange}
              />
            </label>
            <label>
              <br/>Haslo:
              <input type="password"
                     name="password"
                     onChange={handleChange}
              />
            </label>
            <button type="submit" className="loginbutton" onClick={handleSubmit}>
              Potwierdź
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
