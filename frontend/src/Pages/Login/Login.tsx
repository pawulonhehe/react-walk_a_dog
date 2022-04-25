import React, {ChangeEvent, useState} from "react";
import "./Login.scss";
import {useNavigate} from "react-router";
import axiosInstance from "../../axios/login";


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
    console.log(formData);

    axiosInstance
      .post('auth/token', {
        grant_type: 'password',
        username: formData.email,
        password: formData.password,
        client_id: 'Li6fdB8b9CAAtJSpQ6Xt42B4fMmuAmK905WbceMR',
        client_secret: 'jYyHojpnnB8po6nW0d9V3eXGePNzljG2pzhA3GWLfV0Q7SkQUxkE33MqMZv8bhunbVagMzUikx8MDPuZCTU4BmlXlAeGObkGB5vJuS3gAkaUhPS1jNRRFkTIkhJSrkOk'
      })
      .then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        localStorage.setItem('refresh_token', res.data.refresh_token);
        navigate('/');
        window.location.reload();
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
              <input type="text"
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
