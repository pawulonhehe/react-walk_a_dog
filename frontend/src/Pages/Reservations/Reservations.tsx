import React from "react";
import "./Reservations.scss";
import { Icon } from "@iconify/react";
// import { Link } from "react-router-dom";

export const Reservations = () => {
  return (
    <div className="Reservations">
      <div className="Reservations--topText">Twoje Rezerwacje</div>
      <div className="Reservations--incomingRes">
        <div className="Reservations--incomingResList">
          <div className="Reservations--date">Dziś</div>
          <p className="dot"></p>
          <div className="Reservations--reservation">
            Nie masz dziś zaplanowanych żadnych spacerów ani trenigów
          </div>
        </div>
      </div>
      <div className="Reservations--history">
        <h4>Historia</h4>
        <div className="Reservations--filters">
          Filtruj
          <button>
            <Icon icon="material-symbols:calendar-month-outline" />
            Data
          </button>
          <button>
            <Icon icon="material-symbols:sound-detection-dog-barking" />
            Pies
          </button>
          <button>
            <Icon icon="material-symbols:person" />
            Trener
          </button>
        </div>
        <div className="Reservations--hisList">
          <div className="Reservations--incomingResList">
            <div className="Reservations--hisDate">
              <div className="Reservations--dateWeek">Czwartek</div>
              <div className="Reservations--dateTime">30gru 12:15</div>
            </div>
            <p className="dot"></p>
            <div className="Reservations--hisReservation">
              <p>Spacer</p>
            </div>
          </div>
        </div>
      </div>
      <div className="Reservations--book">
        <button>Rezerwuj spacer</button>
      </div>
    </div>
  );
};
