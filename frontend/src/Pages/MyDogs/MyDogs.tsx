import React from "react";
import "./MyDogs.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import pies from "../../Assets/Images/pies.jpg";
import pies2 from "../../Assets/Images/pies2.png";
import { useNavigate } from "react-router-dom";

export const MyDogs = () => {
  const navigate = useNavigate();
  const switchToAddDog = () => navigate("/addDog"); // wazne

  const switchToEditDog = () => navigate("/editDog");

  return (
    <div className="MyDogs">
      <div className="MyDogs--topText">Twoje Pieski</div>
      <div className="MyDogs--avatar">
        <img src={pudzilla} alt="Pudzilla" width="100" height="100"></img>
      </div>
      <div className="MyDogs--Text">Mariusz Pudzianowski</div>
      <div className="MyDogs--dogsContainer">
        <div className="MyDogs--dog">
          <div className="MyDogs--dog__title">Azor</div>
          <div className="MyDogs--dog__image">
            <img src={pies} alt="pies" width="100" height="100"></img>
          </div>
          <div className="MyDogs--dog__Ltext">
            Rasa <br></br> Wiek <br></br>Płeć <br></br>Waga
          </div>
          <div className="MyDogs--dog__Rtext">
            Labrador <br></br> 5 <br></br> Samiec <br></br>60kg
          </div>
          <button className="MyDogs--dog__button" onClick={switchToEditDog}>
            Edytuj
          </button>
        </div>
        <div className="MyDogs--dog">
          <div className="MyDogs--dog__title">Azor</div>
          <div className="MyDogs--dog__image">
            <img src={pies2} alt="pies2" width="100" height="100"></img>
          </div>
          <div className="MyDogs--dog__Ltext">
            Rasa <br></br> Wiek <br></br>Płeć <br></br>Waga
          </div>
          <div className="MyDogs--dog__Rtext">
            Jamnik <br></br> 15 <br></br> Samiec <br></br>20kg
          </div>
          <button className="MyDogs--dog__button" onClick={switchToEditDog}>
            Edytuj
          </button>
        </div>
      </div>
      {/* <Link to="/addDog"> */}
      <button type="submit" className="MyDogs--addDog" onClick={switchToAddDog}>
        Dodaj pieska
      </button>
      {/* </Link> */}
    </div>
  );
};
