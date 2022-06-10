import "./Owner.scss";
import pudzilla from "../../../Assets/Images/pudzilla.png";
import pies from "../../../Assets/Images/pies.jpg";
import { useNavigate } from "react-router-dom";

export const Owner = () => {
  const navigate = useNavigate();
  const switchToDog = () => navigate("/dog");

  return (
    <div className="Owner">
      <div className="owner--topText">Pudzilla</div>
      <div className="owner--topContainer">
        <div className="owner--topInfo">
          Warszawa<br></br>
          ul. Barwna 34/1b <br></br>Kobieta 30 lat <br></br>+48 665 221 552
        </div>
        <div className="owner--topAvatar">
          <img src={pudzilla} alt="pudzilla" className="" />
        </div>
      </div>
      <div className="owner--midContainer">
        <div className="owner--midTopText">POSIADANE PSY</div>
        <div className="owner--midDog">
          <div className="owner--midDog__topText">AZOR</div>
          <div className="owner--midDog__avatar">
            <img src={pies} alt="pies" />
          </div>
          <div className="owner--midDog__Ltext">
            Rasa <br></br> Wiek <br></br>Płeć <br></br>Waga
          </div>
          <div className="owner--midDog__Rtext">
            Labrador <br></br> 5 <br></br> Samiec <br></br>60kg
          </div>
          <button
            type="submit"
            className="midDog--button"
            onClick={switchToDog}
          >
            Szczegóły
          </button>
        </div>
        <div className="owner--midDog">
          <div className="owner--midDog__topText">AZOR</div>
          <div className="owner--midDog__avatar">
            <img src={pies} alt="pies" />
          </div>
          <div className="owner--midDog__Ltext">
            Rasa <br></br> Wiek <br></br>Płeć <br></br>Waga
          </div>
          <div className="owner--midDog__Rtext">
            Labrador <br></br> 5 <br></br> Samiec <br></br>60kg
          </div>
          <button
            type="submit"
            className="midDog--button"
            onClick={switchToDog}
          >
            Szczegóły
          </button>
        </div>
        <div className="owner--midDog">
          <div className="owner--midDog__topText">AZOR</div>
          <div className="owner--midDog__avatar">
            <img src={pies} alt="pies" />
          </div>
          <div className="owner--midDog__Ltext">
            Rasa <br></br> Wiek <br></br>Płeć <br></br>Waga
          </div>
          <div className="owner--midDog__Rtext">
            Labrador <br></br> 5 <br></br> Samiec <br></br>60kg
          </div>
          <button
            type="submit"
            className="midDog--button"
            onClick={switchToDog}
          >
            Szczegóły
          </button>
        </div>

        {/* pewnie jakis foreach */}
      </div>
    </div>
  );
};
