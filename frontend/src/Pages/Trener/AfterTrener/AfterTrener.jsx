import React, { useState, useEffect } from "react";
import "./AfterTrener.scss";
import pudzilla from "../../../Assets/Images/pudzilla.jpg";
import { Icon } from "@iconify/react";
import { Slots } from "../../../Components/Slots/Slots";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WalkModalTrainerxd } from "../../../Components/WalkModalTrainer/WalkModalTrainer";
// import { Link } from "react-router-dom";

export const AfterTrener = () => {
  const navigate = useNavigate();
  const switchToMyProfile = () =>
    navigate(`/editaccount/${sessionStorage.getItem("user")}`);
  const switchToYourClients = () =>
    navigate(`/yourclients/${sessionStorage.getItem("user")}`);
  const switchToStartWork = () => navigate("/startwork");
  const switchToMyOpinions = () =>
    navigate(`/myopinions/${sessionStorage.getItem("user")}`);

  const token = sessionStorage.getItem("token");
  const [trainer, setTrainer] = useState();
  console.log(sessionStorage.getItem("user"));

  const [walk, setWalk] = useState([]);
  useEffect(() => {
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
  }, []);

  useEffect(() => {
    axios
      .get(`/trainers/${sessionStorage.getItem("user")}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setTrainer(res.data);
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

  console.log(walk);

  return (
    <div className="AfterLogin">
      {walk.map((walk) => (
        <WalkModalTrainerxd {...walk} />
      ))}
      <div className="Avatar">
        <img src={pudzilla} alt="Pudzilla" width="140" height="140" />
      </div>
      <div className="MainContainer">
        <div className="WelcomeMessage">Witaj {trainer?.first_name}!</div>
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
        <button type="submit" className="startWork" onClick={switchToStartWork}>
          Zacznij pracę!
        </button>
        <button className="logoutAfterLogin" onClick={handleLogout}>
          Wyloguj
        </button>
        {/* <div className="sloty"><Slots /></div> */}
      </div>
    </div>
  );
};
