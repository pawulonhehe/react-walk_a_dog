import { useState, useEffect } from "react";
import "./DogList.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import pies from "../../Assets/Images/pies.jpg";
import pies2 from "../../Assets/Images/pies2.png";
import { useNavigate } from "react-router-dom";
import { Dog } from "../../Components/Dog/Dog";
import axios from "axios";

export const DogList = () => {
  const [dogs, setDogs] = useState([]);

  const navigate = useNavigate();
  const switchToAddDog = () => navigate("/addDog");
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get(`/users/${sessionStorage.getItem("user")}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/dogs", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setDogs(
          res.data.filter(
            ({ owner }) => +`${sessionStorage.getItem("user")}` === owner.id
          )
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  console.log(user);
  return (
    <div className="MyDogs">
      <div className="MyDogs--topText">Twoje Pieski</div>
      <div className="MyDogs--Text">
        {/* {user.first_name}  xdd, to raz dziala raz nie to komentuje*/}
      </div>
      <div className="MyDogs--dogsContainer">
        {dogs.map((dog) => (
          <Dog {...dog} />
        ))}
      </div>
      <button className="MyDogs--addDog" onClick={switchToAddDog}>
        Dodaj pieska
      </button>
    </div>
  );
};
