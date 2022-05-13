import "./Dog.scss";
import pies from "../../../Assets/Images/pies.jpg";
import pudzilla from "../../../Assets/Images/pudzilla.jpg";

export const Dog = () => {
  return (
    <div className="Dog">
      <div className="dog--topText">AZOR</div>
      <div className="dog--topContainer">
        <div className="dog--topContainer__leftSide">
          <div className="leftSide__left">
            Rasa <br></br> Wiek <br></br>Płeć <br></br>Waga
          </div>
          <div className="leftSide__right">
            Labrador <br></br> 5 <br></br> Samiec <br></br>60kg
          </div>
        </div>
        <div className="dog--topContainer__rightSide">
          <img src={pies} alt="pies" width="120%" height="100" />
        </div>
      </div>
      <div className="dog--dogGrade">
        tu jakies gwiazdki jako ocena plugin sie znajdzie
      </div>
      <div className="dog--midContainer__owner">
        <div className="dog--midContainer__topText">WŁAŚCICIEL</div>
        <div className="dog--midContainer__avatar">
          <img src={pudzilla} alt="pudzilla" width="100%" height="100" />
        </div>
        <div className="dog--midContainer__infoTitle">Mariusz Pudzilla</div>
        <div className="dog--midContainer__info">
          Olsztyn<br></br>ul. Świetlista 14b<br></br>Mężczyzna<br></br>666 555
          444
        </div>
        <div className="dog--midContainer__lastSeen">ostatnio widziany</div>
        <div className="dog--midContainer__map">tu bedzie mapa</div>
      </div>
    </div>
  );
};
