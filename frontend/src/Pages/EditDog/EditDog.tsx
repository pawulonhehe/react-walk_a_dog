import "./EditDog.scss";
import pies from "../../Assets/Images/pies.jpg";
import { Link } from "react-router-dom";

export const EditDog = () => {
  return (
    <div className="EditProfile">
      <div className="EditDog--topText">Edycja Profilu Psa</div>
      <div className="LeftSideBar">
        <div className="LeftSideBar--avatar">
          <img src={pies} alt="pies" width="100" height="100"></img>
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
        </div>
      </div>
      <div className="RightSideContainer">
        <form>
          <label>
            Imie:<br></br>
            <input type="text" name="name" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
          <label>
            Rasa:
            <input type="text" name="race" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
          <label>
            Waga:
            <input type="number" name="weight" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
          <label>
            Płeć:
            <input type="text" name="sex" />
          </label>
          <button type="submit" className="RightSideContainer--changeButton">
            Zmień
          </button>
        </form>
      </div>
    </div>
  );
};
