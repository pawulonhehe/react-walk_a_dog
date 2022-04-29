import "./EditAvatar.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { Link } from "react-router-dom";

export const EditAvatar = () => {
  return (
    <div className="EditAvatar">
      <div className="EditAvatar--topText">Edycja Zdjęcia</div>
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
        <h3>Podgląd</h3>
        <div className="RightSideContainer--avatar">
          <img src={pudzilla} alt="Pudzilla" width="100" height="100"></img>
        </div>
        <div className="RightSideContainer--form">
          <form>
            <label>
              <br></br>Zmień zdjęcie poglądowe
            </label>
            <div className="RightSideContainer--AvatarChange">
              <input type="file" id="avatar" name="avatar" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
