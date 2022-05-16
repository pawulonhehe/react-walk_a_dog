import React from "react";
import "./AfterTrener.scss";
import pudzilla from "../../../Assets/Images/pudzilla.jpg";
import { Icon } from "@iconify/react";
// import { Link } from "react-router-dom";

export const AfterTrener = () => {
  return (
    <div className="AfterLogin">
      <div className="Avatar">
        <img src={pudzilla} alt="Pudzilla" width="140" height="140" />
      </div>
      <div className="MainContainer">
        <div className="WelcomeMessage">Witaj Mariusz!</div>
        <div className="NiceButton">
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
        <div className="NiceButton">
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
        <div className="NiceButton">
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
        <button type="submit" className="startWork">
          Zacznij pracę!
        </button>
        <div className="sloty">tu beda sloty spacerowe</div>
      </div>
    </div>
  );
};
