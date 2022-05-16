import React from "react";
import "./AddDog.scss";
import Select from "react-select";
import pies2 from "../../Assets/Images/pies2.png";
import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

const options = [
  { value: "samiec", label: "Samiec" },
  { value: "samica", label: "Samica" },
];

const options2 = [
  { value: "owczarek", label: "Owczarek" },
  { value: "jamnik", label: "Jamnik" },
];
export const AddDog = () => {
  const navigate = useNavigate();
  const switchToMyDogs = () => navigate("/mydogs");
  return (
    <div className="AddDog">
      <div className="AddDog--topText">Dodaj pieska</div>
      <div className="UpperForm--container">
        <form>
          <input type="text" name="dogname" placeholder="Nazwa" />
          <input type="text" name="dogage" placeholder="Wiek" />
        </form>
        <div className="UpperForm--selectRace">
          <Select options={options} />
        </div>
      </div>
      <div className="MiddleForm--container">
        <div className="MiddleForm--addDogImg__text">Dodaj zdjęcie psa</div>
        <div className="MiddleForm--addDogImg__form">
          <div className="MiddleForm--addDogImg__fileurl">
            <input
              type="text"
              name=""
              id=""
              className="RightSideContainer--url"
              placeholder="wpisz url..."
            />
          </div>
          <div className="MiddleForm-addDogImg__fileattach">
            lub<br></br> <br></br>
            <label className="RightSideContainer--fileUpload">
              <input type="file" id="avatar" name="avatar" />
              Załącz...
            </label>
          </div>
          <img src={pies2} alt="pies2" width="100" height="100"></img>
          <div className="MiddleForm--lowerText">Wybierz rasę psa</div>
          <Select options={options2} />
          <button type="submit" className="AddDog" onClick={switchToMyDogs}>
            Prześlij
          </button>
        </div>
      </div>
    </div>
  );
};
