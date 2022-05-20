import React, { useState, useEffect } from "react";
import "./AddDog.scss";
import Select from "react-select";
import pies2 from "../../Assets/Images/pies2.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";

const options = [
  { value: "samiec", label: "Samiec" },
  { value: "samica", label: "Samica" },
];

const options2 = [
  { value: "owczarek", label: "Owczarek" },
  { value: "jamnik", label: "Jamnik" },
  { value: "labrador", label: "Labrador" },
];

export const AddDog = () => {
  const [dog, setDog] = useState({
    name: "",
    breed: "",
    weight: "",
    gender: "",
    age: "",
  });
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const switchToMyDogs = () => navigate("/mydogs");

  const addName = (event) => setDog({ ...dog, name: event.target.value });
  const addBreed = (selectedOption) =>
    setDog({ ...dog, breed: selectedOption.label });
  const addWeight = (event) => setDog({ ...dog, weight: event.target.value });
  const addGender = (selectedOption) =>
    setDog({ ...dog, gender: selectedOption.label });
  const addAge = (event) => setDog({ ...dog, age: event.target.value });

  const addDog = (event) => {
    event.preventDefault();

    axios
      .post(
        "/dogs/",
        {
          name: dog.name,
          breed: dog.breed,
          weight: dog.weight,
          gender: dog.gender,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then(() => navigate("/mydogs"));
  };
  console.log(dog);
  return (
    <div className="AddDog">
      <div className="AddDog--topText">Dodaj pieska</div>
      <div className="UpperForm--container">
        <form>
          <input
            type="text"
            name="dogname"
            placeholder="nazwa"
            onChange={addName}
            value={dog.name}
          />
          <input
            type="text"
            name="dogage"
            placeholder="wiek"
            onChange={addAge}
            value={dog.age}
          />
          <input
            type="text"
            name="dogweight"
            placeholder="waga"
            onChange={addWeight}
            value={dog.weight}
          />
        </form>
        <div className="UpperForm--selectRace">
          <Select options={options} onChange={addBreed} />
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
          <Select options={options2} onChange={addGender} />
          <button type="submit" className="AddDog" onClick={addDog}>
            Prześlij
          </button>
        </div>
      </div>
    </div>
  );
};
