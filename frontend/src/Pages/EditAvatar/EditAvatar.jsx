import "./EditAvatar.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { notify } from "../../helpers";

export const EditAvatar = () => {
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState("");
  const [profilePicture, setProfilePicture] = useState([]);
  const [actualPicture, setActualPicture] = useState();

  useEffect(() => {
    axios
      .get(`/users/${sessionStorage.getItem("user")}/`, {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    const imageFile = document.querySelector("#avatar_url");
    formData.append("email", user.email);
    formData.append("id", user.id);
    imageFile.files[0]
      ? formData.append("image", imageFile.files[0])
      : formData.append("image", "");

    axios
      .patch(`/users/${sessionStorage.getItem("user")}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          accept: "application/json",
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setActualPicture(res.data.image);
        notify("success", "Zdjęcie zostało zaktualizowane");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };
  return (
    <div className="EditAvatar">
      <div className="EditAvatar--topText">Edycja Zdjęcia</div>
      <div className="LeftSideBar">
        <div className="LeftSideBar--avatar">
          <img
            src={actualPicture || user.image}
            alt="Pudzilla"
            width="100"
            height="100"
          ></img>
        </div>
        <div className="LeftSideBar--buttonContainer">
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
      <div className="RightSideContainer">
        <h3>Podgląd</h3>
        <div className="RightSideContainer--avatar">
          <img
            src={profilePicture.length ? profilePicture : user.image}
            alt="Pudzilla"
            width="100"
            height="100"
          ></img>
        </div>
        <div className="RightSideContainer--form">
          <form onSubmit={handleSubmit}>
            <div className="Container--form__zalacz">
              <label className="RightSideContainer--fileUpload">
                <input
                  name="avatar_url"
                  id="avatar_url"
                  className="button"
                  type="file"
                  onChange={onImageChange}
                  accept="image/png, image/gif, image/jpeg"
                />
                Załącz...
              </label>
            </div>
            <button className="sendjpg-button" type="submit">
              Wyślij
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
