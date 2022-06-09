import "./EditDogAvatar.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import pies from "../../Assets/Images/pies.jpg";

export const EditDogAvatar = () => {
  const [dog, setDog] = useState([]);
  const params = useParams();
  const token = sessionStorage.getItem("token");

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

  return (
    <div className="EditAvatar">
      <div className="EditAvatar--topText">Edycja Zdjęcia</div>
      <div className="LeftSideBardog">
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
        <h3>Podgląd</h3>
        <div className="RightSideContainer--avatar">
          <img src={pies} alt="pies" width="100" height="100"></img>
        </div>
        <div className="RightSideContainer--form">
          <form>
            <input
              type="text"
              name=""
              id=""
              className="RightSideContainer--url"
              placeholder="wpisz url..."
            />
            <p>lub</p>
            <label className="RightSideContainer--fileUpload">
              <input type="file" id="avatar" name="avatar" />
              Załącz...
            </label>
          </form>
        </div>
      </div>
    </div>
  );
};
