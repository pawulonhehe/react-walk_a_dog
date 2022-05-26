import { useState, useEffect } from "react";
import "./DogList.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import pies from "../../Assets/Images/pies.jpg";
import pies2 from "../../Assets/Images/pies2.png";
import { useNavigate } from "react-router-dom";
import { Dog } from "../../Components/Dog/Dog";
import axios from "axios";

export const DogList = () => {
  const [dogstowalk, setDogs] = useState([]);

  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/slots", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setDogs(
          res.data.filter(
            ({ trainer }) => +`${sessionStorage.getItem("user")}` === trainer.id
          )
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <div className="MyDogs">
      <div className="MyDogs--topText">Psy do wyprowadzenia</div>
      <div className="MyDogs--avatar">
        <img src={pudzilla} alt="Pudzilla" width="100" height="100"></img>
      </div>
      <div className="MyDogs--Text">Mariusz Pudzianowski</div>
      <div className="MyDogs--dogsContainer">
        {dogstowalk.map((dog) => (
          <Dog {...dog} />
        ))}
      </div>
      <button className="MyDogs--addDog" onClick={switchToAddDog}>
        Dodaj pieska
      </button>
    </div>
  );
};
