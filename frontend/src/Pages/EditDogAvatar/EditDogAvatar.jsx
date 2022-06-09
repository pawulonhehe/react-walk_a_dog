import "./EditDogAvatar.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { notify } from "../../helpers";

export const EditDogAvatar = () => {
  const [dog, setDog] = useState([]);
  const params = useParams();
  const token = sessionStorage.getItem("token");
  const [profilePicture, setProfilePicture] = useState([]);
  const [actualPicture, setActualPicture] = useState();

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

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePicture(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let formData = new FormData();
    const imageFile = document.querySelector("#avatar_url");
    formData.append("id", dog.id);
    imageFile.files[0]
      ? formData.append("image", imageFile.files[0])
      : formData.append("image", "");

    axios
      .patch(`/dogs/${params.id}/`, formData, {
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

  return (
    <div className="EditAvatar">
      <div className="EditAvatar--topText">Edycja Zdjęcia</div>
      <div className="LeftSideBardog">
        <div className="LeftSideBar--avatar">
          <img
            src={actualPicture || dog.image}
            alt="Pudzilla"
            width="100"
            height="100"
          ></img>
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
          <img
            src={profilePicture.length ? profilePicture : dog.image}
            alt="Pudzilla"
            width="100"
            height="100"
          ></img>
        </div>
        <div className="RightSideContainer--form">
          <form onSubmit={handleSubmit}>
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
            <button className="sendjpg-dogbutton" type="submit">
              Wyślij
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
