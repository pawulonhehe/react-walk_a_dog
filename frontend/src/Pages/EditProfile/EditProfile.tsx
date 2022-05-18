import "./EditProfile.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { Link } from "react-router-dom";

export const EditProfile = () => {
  return (
    <div className="EditProfile">
      <div className="EditProfile--topText">Edycja Profilu</div>
      <div className="LeftSideBar">
        <div className="LeftSideBar--avatar">
          <img src={pudzilla} alt="Pudzilla" width="100" height="100"></img>
        </div>
        <div className="LeftSideBarr--buttonContainer">
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
      <div className="RightSideContainerr">
        <form>
          <label>
            Imie:<br></br>
            <input type="text" name="firstname" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
          <label>
            Nazwisko:
            <input type="text" name="lastname" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
          <label>
            Numer telefonu:
            <input type="number" name="phone" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
          <label>
            Data urodzenia:
            <input type="date" name="birthdate" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
          <label>
            Haslo:
            <input type="password" name="password" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
          <label>
            Adres:
            <input type="text" name="address" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
        </form>
      </div>
    </div>
  );
};
