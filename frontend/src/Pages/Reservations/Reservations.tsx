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
          <span className="Reservations--date">Dziś</span>
          <p className="dot"></p>
          <div className="Reservations--reservation">
            Nie masz dziś zaplanowanych żadnych spacerów ani trenigów
          </div>
        </div>
        <div className="Reservations--incomingResList">
          <span className="Reservations--date">
            Czwartek <br></br>
            10 mar 10:15
          </span>
          <p className="dot"></p>
          <div className="Reservations--reservation">
            <div className="Reservations--info">
              <span>Jacek Szyuła - Azor, Rocky, Maciej</span>
              <div>
                <Icon icon="material-symbols:pin-drop-sharp" />
                Aleja Warszawska 107, <br></br>10-720 Olsztyn
              </div>
            </div>
            <div className="Reservations--infoButtons">
              <button>Anuluj</button>
              <button>Szczegóły</button>
            </div>
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
          <li className="tooltip">
            <button className="tooltip">
              <Icon icon="material-symbols:sound-detection-dog-barking" />
              Pies
            </button>
            <div className="tooltipMenu bottomSide">
              <ul>
                <li>
                  <label>
                    <input type="checkbox" />
                    Azor
                  </label>
                </li>
                <li>
                  <label>
                    <input type="checkbox" />
                    Rocky
                  </label>
                </li>
              </ul>
            </div>
          </li>
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
