import React from "react";
import "./Trainers.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";

export const Trainers = () => {
  return (
    <div className="Trainers">
      <div className="Trainers--topText">Nasi Trenerzy</div>
      <div className="Trainers--midContainer">
        <div className="Trainers--midContainer__trainer">
          <div className="midContainer__trainer--Avatar">
            <img src={pudzilla} alt="pudzilla" />
          </div>
          <div className="midContainer__trainer--Title">Jacek Szyuła</div>
          <div className="midContainer__trainer--Stars">gwiazdki</div>
          <button type="submit" className="trainersbutton">
            Odwiedź profil trenera
          </button>
        </div>
        <div className="Trainers--midContainer__trainer">
          <div className="midContainer__trainer--Avatar">
            <img src={pudzilla} alt="pudzilla" />
          </div>
          <div className="midContainer__trainer--Title">Jacek Szyuła</div>
          <div className="midContainer__trainer--Stars">gwiazdki</div>
          <button type="submit" className="trainersbutton">
            Odwiedź profil trenera
          </button>
        </div>
      </div>
    </div>
  );
};
