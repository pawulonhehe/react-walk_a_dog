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
// import { Link } from "react-router-dom";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export const AfterLogin = () => {
  {/*część usera*/}
  const navigate = useNavigate();
  const switchToMyProfile = () =>
    navigate(`/editaccount/${sessionStorage.getItem("user")}`);
  const switchToMyDogs = () => navigate("/mydogs");
  const switchToReservations = () => navigate("/reservations");
  const switchToTrainers = () => navigate("/trainers");
  const token = sessionStorage.getItem("token");
  const [user, setUser] = useState();

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

  const [walk, setWalk] = useState([]);
  useEffect(() => {
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
  }, []);

  console.log(walk);

  return (
    <div className="AfterLoginsss">
      {walk.map((walk) => (
        <WalkModal {...walk} />
      ))}
      <div className="AfterLogin">
        <div className="Avatar">
          <img src={pudzilla} alt="Pudzilla" width="140" height="140" />
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
        </div>
      </div>
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAyOgCp9cy7G2rg1uP-00bGEpVNKsZ-eek" }}
          defaultCenter={{
            lat: 59.95,
            lng: 30.33,
          }}
          defaultZoom={25}
        >
          {/* <div className="cos" lat={59.955413} lng={30.337844}>
            JD
          </div> */}
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    </div>
  );
};
// AIzaSyAyOgCp9cy7G2rg1uP-00bGEpVNKsZ-eek
