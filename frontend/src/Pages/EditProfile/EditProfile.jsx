import "./EditProfile.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const EditProfile = () => {
  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem("token");
  const params = useParams();
  const [imageUrl, setImageUrl] = useState("pudzilla");

  const changeFirstName = (event) =>
    setUser({ ...user, first_name: event.target.value });
  const changeLastName = (event) =>
    setUser({ ...user, last_name: event.target.value });
  const changePhoneNumber = (event) =>
    setUser({ ...user, phone_number: event.target.value });
  const changeEmail = (event) =>
    setUser({ ...user, email: event.target.value });

  const editProfile = (event) => {
    event.preventDefault();
    axios.patch(
      `/users/${params.id}/`,
      {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
  };
  console.log(user);
  useEffect(() => {
    axios
      .get(`/users/${params.id}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setUser(res.data);
        setImageUrl(res.data.image ? res.data.image : "pudzilla")
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
          <img src={imageUrl} alt="Pudzilla" width="100" height="100"></img>
        </div>
        <div className="LeftSideBarr--buttonContainer">
        <Link to={`/editprofile/${sessionStorage.getItem("user")}`}>
            <button type="submit" className="LeftSideBar-button">
              Profil
            </button>
          </Link>
          <Link to={`/editavatar/${sessionStorage.getItem("user")}`}>
            <button type="submit" className="LeftSideBar-button">
              Zdjęcie
            </button>
          </Link>
          <Link to={`/editaccount/${sessionStorage.getItem("user")}`}>
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
            <input
              type="text"
              name="firstname"
              value={user.first_name}
              onChange={changeFirstName}
            />
          </label>
          <label>
            Nazwisko:
            <input
              type="text"
              name="lastname"
              value={user.last_name}
              onChange={changeLastName}
            />
          </label>
          <label>
            Numer telefonu:
            <input
              type="number"
              name="phone"
              value={user.phone_number}
              onChange={changePhoneNumber}
            />
          </label>
          <label>
            <br></br>e-mail:<br></br>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={changeEmail}
            />
          </label>
          <button
            type="submit"
            className="Container--changeButton"
            onClick={editProfile}
          >
            Zmień
          </button>
        </form>
      </div>
    </div>
  );
};
