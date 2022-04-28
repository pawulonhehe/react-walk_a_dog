import "./EditProfile.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
// import { Link } from "react-router-dom";

export const EditProfile = () => {
  return (
    <div className="EditProfile">
      <div className="EditProfile--topText">Edycja Profilu</div>
      <div className="LeftSideBar">
        <div className="LeftSideBar--avatar">
          <img src={pudzilla} alt="Pudzilla" width="100" height="100"></img>
        </div>
        <div className="LeftSideBar--buttonContainer">
          <button type="submit" className="LeftSideBar-button">
            Profil
          </button>
          <button type="submit" className="LeftSideBar-button">
            Zdjęcie
          </button>
          <button type="submit" className="LeftSideBar-button">
            Konto
          </button>
        </div>
      </div>
      <div className="RightSideContainer">
        <form>
          <label>
            Imie:
            <input type="text" name="firstname" />
          </label>
          <label>
            Nazwisko:
            <input type="text" name="lastname" />
          </label>
          <label>
            Numer telefonu:
            <input type="number" name="phone" />
          </label>
          <label>
            Data urodzenia:
            <input type="date" name="birthdate" />
          </label>
          <label>
            Haslo:
            <input type="password" name="password" />
          </label>
          <label>
            Adres:
            <input type="text" name="address" />
          </label>
        </form>
      </div>
    </div>
  );
};
