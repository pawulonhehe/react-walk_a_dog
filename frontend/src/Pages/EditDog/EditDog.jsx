import "./EditDog.scss";
import pies from "../../Assets/Images/pies.jpg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const EditDog = () => {
  const [dog, setDog] = useState([]);
  const token = sessionStorage.getItem("token");
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/dogs/${params.id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setDog(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const changeName = (event) => setDog({ ...dog, name: event.target.value });
  const changeBreed = (event) => setDog({ ...dog, breed: event.target.value });
  const changeWeight = (event) =>
    setDog({ ...dog, weight: event.target.value });
  const changeGender = (event) =>
    setDog({ ...dog, gender: event.target.value });

  const editProfile = (event) => {
    event.preventDefault();
    axios.patch(
      `/dogs/${params.id}/`,
      {
        name: dog.name,
        breed: dog.breed,
        weight: dog.weight,
        gender: dog.gender,
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
  };

  const deleteDog = (event) => {
    event.preventDefault();
    axios
      .delete(`/dogs/${params.id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then(() => navigate("/mydogs"));
  };

  return (
    <div className="EditProfile">
      <div className="EditDog--topText">Edycja Profilu Psa</div>
      <div className="LeftSideBar">
        <div className="LeftSideBar--avatar">
          <img src={pies} alt="pies" width="100" height="100"></img>
        </div>
        <div className="LeftSideBar--buttonContainer">
          <Link to={`/editDog/${dog.id}`}>
            <button type="submit" className="LeftSideBar-button">
              Profil
            </button>
          </Link>
          <Link to={`/editdogavatar/${dog.id}`}>
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
            <input
              type="text"
              name="name"
              value={dog.name}
              onChange={changeName}
            />
          </label>
          <label>
            Rasa:
            <input
              type="text"
              name="race"
              value={dog.breed}
              onChange={changeBreed}
            />
          </label>
          <label>
            Waga:
            <input
              type="number"
              name="weight"
              value={dog.weight}
              onChange={changeWeight}
            />
          </label>
          <label>
            Płeć:
            <input
              type="text"
              name="sex"
              value={dog.gender}
              onChange={changeGender}
            />
          </label>
          <button
            className="RightSideContainer--changeButton"
            onClick={editProfile}
          >
            Zmień
          </button>
          <button
            className="RightSideContainer--deleteButton"
            onClick={deleteDog}
          >
            Usuń
          </button>
        </form>
      </div>
    </div>
  );
};
