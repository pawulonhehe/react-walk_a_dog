import React from "react";
import "./AfterLogin.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import { User } from "../../Models/Users";
import axios from "axios";
import { useState, useEffect } from "react";
import { WalkModal } from "../../Components/WalkModal/WalkModal";
import GoogleMapReact from "google-map-react";
import { WalkModalTrainerxd } from "../../Components/WalkModalTrainer/WalkModalTrainer";
// import { Link } from "react-router-dom";

export const AfterLogin = () => {
  const is_trainer = sessionStorage.getItem("is_trainer");
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState();
  const [walk, setWalk] = useState([]);
  const [imageUrl, setImageUrl] = useState(pudzilla);

  const switchToMyProfile = () =>
    navigate(`/editaccount/${sessionStorage.getItem("user")}`);
  const switchToMyDogs = () => navigate("/mydogs");
  const switchToReservations = () => navigate("/reservations");
  const switchToTrainers = () => navigate("/trainers");
  /* active walks*/
  useEffect(() => {
    if (is_trainer === "true") {
      axios
        .get(`/trainers/${sessionStorage.getItem("user")}/active-walks`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          sessionStorage.setItem("data", JSON.stringify(res.data));
          setWalk(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    } else {
      axios
        .get(`/users/${sessionStorage.getItem("user")}/active-walks`, {
          headers: { Authorization: `Token ${token}` },
        })
        .then((res) => {
          sessionStorage.setItem("data", JSON.stringify(res.data));
          setWalk(res.data);
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(`/users/${sessionStorage.getItem("user")}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setUser(res.data);
        setImageUrl(res.data.image ? res.data.image : pudzilla);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const handleLogout = () => {
    axios.post("auth/logout/").then(() => {
      sessionStorage.removeItem("token");
      window.location.reload();
    });
  };

  if (is_trainer === "false") {
    return (
      <div className="AfterLoginsss">
        {walk.map((walk) => (
          <WalkModal {...walk} />
        ))}
        <div className="AfterLogin">
          <div className="Avatar">
            <img src={imageUrl} alt="Pudzilla" width="140" height="140" />
          </div>
          <div className="MainContainer">
            <div className="WelcomeMessage">Witaj {user?.first_name}!</div>
            <div className="NiceButton" onClick={switchToMyProfile}>
              <div className="Icon">
                <Icon
                  icon="material-symbols:manage-accounts"
                  style={{ fontSize: "54px" }}
                />
              </div>
              <div className="title">
                <h3>Mój Profil</h3>
              </div>
              <div className="subtitle">
                Zaaktualizuj swoje dane kontaktowe i inne szczegóły
              </div>
            </div>
            <div className="NiceButton" onClick={switchToMyDogs}>
              <div className="Icon">
                <Icon
                  icon="material-symbols:sound-detection-dog-barking"
                  style={{ fontSize: "54px" }}
                />
              </div>
              <div className="title">
                <h3>Moje psy</h3>
              </div>
              <div className="subtitle">
                Dodaj i zaaktualizuj dane swojego zwierzaka
              </div>
            </div>
            <div className="NiceButton" onClick={switchToReservations}>
              <div className="Icon">
                <Icon
                  icon="material-symbols:calendar-month-outline"
                  style={{ fontSize: "54px" }}
                />
              </div>
              <div className="title">
                <h3>Rezerwacje</h3>
              </div>
              <div className="subtitle">
                Zobacz swoje nadchodzące usługi lub rezerwuj nowe
              </div>
            </div>
            <div className="NiceButtonb" onClick={switchToTrainers}>
              <div className="Icon">
                <Icon
                  icon="material-symbols:person"
                  style={{ fontSize: "54px" }}
                />
              </div>
              <div className="title">
                <h3>Trenerzy</h3>
              </div>
              <div className="subtitle">
                Przeglądaj profile potenclajnych trenerów
              </div>
            </div>
            <button className="logoutAfterLogin" onClick={handleLogout}>
              Wyloguj
            </button>
          </div>
        </div>
      </div>
    );
  } else if (is_trainer === "true") {
    const switchToYourClients = () =>
      navigate(`/yourclients/${sessionStorage.getItem("user")}`);
    const switchToStartWork = () => navigate("/startwork");
    const switchToMyOpinions = () =>
      navigate(`/myopinions/${sessionStorage.getItem("user")}`);

    return (
      <div className="AfterLogin">
        {walk.map((walk) => (
          <WalkModalTrainerxd {...walk} />
        ))}
        <div className="Avatar">
          <img src={imageUrl} alt="Pudzilla" width="140" height="140" />
        </div>
        <div className="MainContainer">
          <div className="WelcomeMessage">Witaj {user?.first_name}!</div>
          <div className="NiceButton" onClick={switchToMyProfile}>
            <div className="Icon">
              <Icon
                icon="material-symbols:manage-accounts"
                style={{ fontSize: "54px" }}
              />
            </div>
            <div className="title">
              <h3>Mój Profil</h3>
            </div>
            <div className="subtitle">
              Zaaktualizuj swoje dane kontaktowe i inne szczegóły
            </div>
          </div>
          <div className="NiceButton" onClick={switchToMyOpinions}>
            <div className="Icon">
              <Icon
                icon="material-symbols:calendar-month-outline"
                style={{ fontSize: "54px" }}
              />
            </div>
            <div className="title">
              <h3>Opinie</h3>
            </div>
            <div className="subtitle">
              Zobacz opinie wystawione przez klientów na twój temat
            </div>
          </div>
          <div className="NiceButton" onClick={switchToYourClients}>
            <div className="Icon">
              <Icon
                icon="material-symbols:account-circle"
                style={{ fontSize: "54px" }}
              />
            </div>
            <div className="title">
              <h3>Klienci</h3>
            </div>
            <div className="subtitle">
              Przeglądaj profile potencjalnych klientów{" "}
            </div>
          </div>
          <button
            type="submit"
            className="startWork"
            onClick={switchToStartWork}
          >
            Zacznij pracę!
          </button>
          <button className="logoutAfterLogin" onClick={handleLogout}>
            Wyloguj
          </button>
          {/* <div className="sloty"><Slots /></div> */}
        </div>
      </div>
    );
  }
};
// AIzaSyAyOgCp9cy7G2rg1uP-00bGEpVNKsZ-eek
