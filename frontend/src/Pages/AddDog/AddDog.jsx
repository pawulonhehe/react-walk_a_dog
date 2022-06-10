import React, { useState, useEffect } from "react";
import "./AddDog.scss";
import Select from "react-select";
import pies2 from "../../Assets/Images/pies2.png";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { Link } from "react-router-dom";

const options = [
  { value: "M", label: "Samiec" },
  { value: "F", label: "Samica" },
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
    setDog({ ...dog, gender: selectedOption.value });
  const addAge = (event) => setDog({ ...dog, age: event.target.value });

  // const addDog = (event) => {
  //   event.preventDefault();

  //   axios
  //     .post(
  //       "/dogs/create/",
  //       {
  //         owner: sessionStorage.getItem("user"),
  //         name: dog.name,
  //         breed: dog.breed,
  //         weight: dog.weight,
  //         gender: dog.gender,
  //       },
  //       {
  //         headers: { Authorization: `Token ${token}` },
  //       }
  //     )
  //     .then(() => navigate("/mydogs"));
  // };

  console.log(sessionStorage.getItem("user"));

  const addDog = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("name", dog.name);
    form_data.append("breed", dog.breed);
    form_data.append("weight", dog.weight);
    form_data.append("gender", dog.gender);
    form_data.append("owner", sessionStorage.getItem("user"));
    axios
      .post("/dogs/create/", form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(() => navigate("/mydogs"));
  };
  const [profilePicture, setProfilePicture] = useState([]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
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
          <Select options={options} onChange={addGender} />
        </div>
      </div>
      <div className="MiddleForm--container">
        <div className="MiddleForm--addDogImg__text">Dodaj zdjęcie psa</div>
        <div className="MiddleForm--addDogImg__form">
          <div className="MiddleForm-addDogImg__fileattach">
            <label className="RightSideContainer--fileUpload">
              <input
                name="avatar_url"
                id="avatar_url"
                className="button"
                type="file"
                onChange={onImageChange}
                accept="image/png, image/gif, image/jpeg"
              />
              Załącz..
            </label>
          </div>
          <img src={pies2} alt="pies2" width="100" height="100"></img>
          <div className="MiddleForm--lowerText">Wybierz rasę psa</div>
          <Select options={options2} onChange={addBreed} />
          <button type="submit" className="AddDog" onClick={addDog}>
            Dodaj
          </button>
        </div>
      </div>
    </div>
  );
};
