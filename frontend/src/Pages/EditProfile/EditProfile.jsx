import "./EditProfile.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const EditProfile = () => {
  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem("token");
  const params = useParams();

  // const changeName = (event) => setUser({ ...user, name: event.target.value });
  // const changeBreed = (event) =>
  //   setUser({ ...user, breed: event.target.value });
  // const changeWeight = (event) =>
  //   setUser({ ...user, weight: event.target.value });
  // const changeGender = (event) =>
  //   setUser({ ...user, gender: event.target.value });

  const editProfile = (event) => {
    event.preventDefault();
    axios.patch(
      `/dogs/${params.id}/`,
      {
        name: user.name,
        breed: user.breed,
        weight: user.weight,
        gender: user.gender,
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
  };

  useEffect(() => {
    axios
      .get(`/users/${params.id}`, {
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
  console.log(user);

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
            <input type="text" name="firstname" value={user.first_name} />
          </label>
          <label>
            Nazwisko:
            <input type="text" name="lastname" value={user.last_name} />
          </label>
          <label>
            Numer telefonu:
            <input type="number" name="phone" value={user.phone_number} />
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
          <button type="submit" className="Container--changeButton">
            Zmień
          </button>
        </form>
      </div>
    </div>
  );
};
