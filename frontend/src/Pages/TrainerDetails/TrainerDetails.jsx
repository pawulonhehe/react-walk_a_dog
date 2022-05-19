import React from "react";
import "./TrainerDetails.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { useNavigate } from "react-router-dom";

export const TrainerDetails = () => {
  const navigate = useNavigate();
  const switchToBook = () => navigate("/bookwalk");
  const switchToHist = () => navigate("/trainerdetailshist");
  return (
    <div className="TrainerDetails">
      <div className="TrainerDetails--topText">Szczegóły trenera</div>
      <div className="TrainerDetails--topCointainer">
        <div className="topContainer--Title">Jacek Szyuła</div>
        <div className="topContainer--Stars">gwiazdki</div>
        <div className="topContainer--LData">
          wiek<br></br>płeć<br></br>doświadczenie<br></br>dostępność
        </div>
        <div className="topContainer--RData">
          25 lat<br></br>mężczyzna<br></br>3 lata<br></br>sloty
        </div>
        <div className="topContainer--Avatar">
          <img src={pudzilla} alt="pudzilla" />
        </div>
      </div>
      <div className="TrainerDetails--MidContainer">
        <div className="MidContainer--Title">
          Trzy ostatnie opinie na temat trenera
        </div>
        <div className="MidContainer--Opinion">
          <div className="Opinion__Title">Jan Kowalski</div>
          <div className="Opinion__Stars">gwiazdki</div>
          <div className="Opinion__Article">lorem ipsum cos tam cos</div>
        </div>
        <div className="MidContainer--Opinion">
          <div className="Opinion__Title">Jan Kowalski</div>
          <div className="Opinion__Stars">gwiazdki</div>
          <div className="Opinion__Article">lorem ipsum cos tam cos</div>
        </div>
        <div className="MidContainer--Opinion">
          <div className="Opinion__Title">Jan Kowalski</div>
          <div className="Opinion__Stars">gwiazdki</div>
          <div className="Opinion__Article">lorem ipsum cos tam cos</div>
        </div>
        <button
          type="submit"
          className="Opinion--button"
          onClick={switchToHist}
        >
          Zobacz całą historię
        </button>
      </div>
      <div className="TrainerDetails--BottomContainer">
        <button
          type="submit"
          className="BottomContainer--lbutton"
          onClick={switchToBook}
        >
          Zamów
        </button>
        <button type="submit" className="BottomContainer--rbutton">
          Następny
        </button>
      </div>
    </div>
  );
};
