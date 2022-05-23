import React from "react";
import "./TrainerDetailsHist.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import pies from "../../Assets/Images/pies.jpg";

export const TrainerDetailsHist = () => {
  return (
    <div className="TrainerDetailsHist">
      <div className="TDS--topText">Historia trenera</div>
      <div className="TDS--topAvatar">
        <img src={pudzilla} alt="pudzilla" />
      </div>
      <div className="TDS--topUserName">Jacek Szyuła</div>
      <div className="TDS--midContainer">
        <div className="midContainer--one">
          <div className="one--title">Spacer</div>
          <div className="one--owner">Właściciel:</div>
          <div className="one--owner__user">Janina Kowalska</div>
          <div className="one--dogTitle">Azor</div>
          <div className="one--LdogData">
            wiek<br></br>płeć<br></br>rasa<br></br>waga
          </div>
          <div className="one--RdogData">
            5 lat<br></br>Samiec<br></br>Labrador<br></br>10 kg
          </div>
          <div className="one--dogAvatar">
            <img src={pies} alt="pies" />
          </div>
          <div className="one--dogDate">Data</div>
        </div>
        <div className="midContainer--one">
          <div className="one--title">Spacer</div>
          <div className="one--owner">Właściciel:</div>
          <div className="one--owner__user">Janina Kowalska</div>
          <div className="one--dogTitle">Azor</div>
          <div className="one--LdogData">
            wiek<br></br>płeć<br></br>rasa<br></br>waga
          </div>
          <div className="one--RdogData">
            5 lat<br></br>Samiec<br></br>Labrador<br></br>10 kg
          </div>
          <div className="one--dogAvatar">
            <img src={pies} alt="pies" />
          </div>
          <div className="one--dogDate">Data</div>
        </div>
      </div>
    </div>
  );
};
