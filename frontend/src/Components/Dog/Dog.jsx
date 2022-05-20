import React from "react";
import "./Dog.scss";
import pies from "../../Assets/Images/pies.jpg";
import { useNavigate } from "react-router-dom";

export const Dog = (props) => {
  const navigate = useNavigate();
  const switchToEditDog = () => navigate(`/editDog/${props.id}`);
  const switchToEditDogAvatar = () => navigate(`/editDogAvatar/${props.id}`);

  return (
    <div className="MyDogs--dog">
      <div className="MyDogs--dog__title">{props.name}</div>
      <div className="MyDogs--dog__image">
        
        <img src={pies} alt="pies" width="100" height="100"></img>
      </div>
      <div className="MyDogs--dog__Ltext">
        Rasa <br></br> Wiek <br></br>Płeć <br></br>Waga
      </div>
      <div className="MyDogs--dog__Rtext">
        {props.breed} <br></br> 5 lat <br></br> {props.gender} <br></br>{" "}
        {props.weight} kg
      </div>
      <button className="MyDogs--dog__button" onClick={switchToEditDog}>
        Edytuj
      </button>
    </div>
  );
};
