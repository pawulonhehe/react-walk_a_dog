import "./EditAccount.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { Link } from "react-router-dom";

export const EditAccount = () => {
  return (
    <div className="EditAccount">
      <div className="EditAccount--topText">Edycja Konta</div>
      <div className="LeftSideBar">
        <div className="LeftSideBar--avatar">
          <img src={pudzilla} alt="Pudzilla" width="100" height="100"></img>
        </div>
        <div className="LeftSideBar--buttonContainer">
          <Link to="/editprofile">
            <button type="submit" className="LeftSideBar-button">
              Profil
            </button>
          </Link>
          <Link to="/editavatar">
            <button type="submit" className="LeftSideBar-button">
              Zdjęcie
            </button>
          </Link>
          <Link to="/editaccount">
            <button type="submit" className="LeftSideBar-button">
              Konto
            </button>
          </Link>
        </div>
      </div>
      <div className="RightSideContainer">
        <button type="submit" className="RightSideButton">
          Twoje Pieski
        </button>
        <button type="submit" className="RightSideButton">
          Twoja historia
        </button>
        <button type="submit" className="RightSideButton">
          Regulamin
        </button>
        <button type="submit" className="RightSideButton">
          Zgłoś usterkę
        </button>
      </div>
    </div>
  );
};