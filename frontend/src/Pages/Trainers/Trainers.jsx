import React from "react";
import { useState, useEffect } from "react";
import "./Trainers.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { useNavigate } from "react-router-dom";
import { Trainer } from "../../Components/Trainer/Trainer";
import axios from "axios";

export const Trainers = () => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const switchToDetails = () => navigate("/trainerdetails");
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/users", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <div className="Trainers">
      <div className="Trainers--topText">Nasi Trenerzy</div>
      <div className="Trainers--midContainer">
        {user.map((user) => (
          <Trainer {...user} />
        ))}
      </div>
    </div>
  );
};
