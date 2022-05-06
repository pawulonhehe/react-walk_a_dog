import "./Dog.scss";
import pies from "../../../Assets/Images/pies.jpg";

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
    </div>
  );
};
