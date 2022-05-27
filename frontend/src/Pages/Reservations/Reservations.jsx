import React, { useState } from "react";
import "./Reservations.scss";
import { Icon } from "@iconify/react";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { useNavigate } from "react-router-dom";
import BasicModal from "../BasicModal/BasicModal";
import Popover from "@mui/material/Popover";

// import { Link } from "react-router-dom";

export const Reservations = () => {
  const navigate = useNavigate();
  const switchToBook = () => navigate("/bookwalk");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseP = () => {
    setAnchorEl(null);
  };

  const show = Boolean(anchorEl);
  const id = show ? 'simple-popover' : undefined;
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
              <button type="button" onClick={handleOpen}>
                Szczegóły
              </button>
              <BasicModal open={open} onClose={handleClose} />
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
          <button className="tooltip" onClick={handleClick}>
            <Icon icon="material-symbols:sound-detection-dog-barking" />
            Pies
          </button>
          <Popover
            id={id}
            open={show}
            anchorEl={anchorEl}
            onClose={handleCloseP}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="popover">
              <label htmlFor="">
                <input type="checkbox" name="" id="" />
                Azor
              </label>
            </div>
          </Popover>
          <button className="tooltip">
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
              <div className="Reservations--bottomInfo">
                <div className="Reservations--Avatar">
                  <img src={pudzilla} alt="pudzilla" />
                </div>
                <div>
                  Jacek Szyuła <br></br> Azor, Rocky, Maciej
                </div>
              </div>
              <div className="Reservations--infoButtons">
                <button type="button" onClick={handleOpen}>
                  Szczegóły
                </button>
                <BasicModal open={open} onClose={handleClose} />
                <button>Oceń</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Reservations--book">
        <button onClick={switchToBook}>Rezerwuj spacer</button>
      </div>
    </div>
  );
};
