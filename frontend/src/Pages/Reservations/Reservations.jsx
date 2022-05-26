import React, { useState, useEffect } from "react";
import "./Reservations.scss";
import { Icon } from "@iconify/react";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { useNavigate } from "react-router-dom";
import BasicModal from "../BasicModal/BasicModal";
import Popover from "@mui/material/Popover";
import axios from "axios";
import moment from "moment";

// import { Link } from "react-router-dom";

export const Reservations = () => {
  const token = sessionStorage.getItem("token");
  const [walk, setWalk] = useState([]);
  const [currentWalk, setCurrentWalk] = useState([]);
  const navigate = useNavigate();
  const switchToBook = () => navigate("/bookwalk");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const currentTime = new Date().toLocaleTimeString();

  const dayOfTheWeek = moment(new Date()).locale("pl").format("dddd");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseP = () => {
    setAnchorEl(null);
  };

  const show = Boolean(anchorEl);
  const id = show ? "simple-popover" : undefined;



  useEffect(() => {
    axios
      .get("/walks/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));

        // const data = res.data;
        const data = [
          {
            'id': 11,
            'dog_count': 1,
            'date': '2022-05-24',
            'start_time': '12:00:00',
            'end_time': '14:00:00',
            'location': '1.000000',
            'trainer': {
              'first_name' : 1,
              'last_name' : 2,
            },
            'dogs': [15],
          },
          {
            'id': 11,
            'dog_count': 2,
            'date': '2022-05-25',
            'start_time': '12:00:00',
            'end_time': '14:00:00',
            'location': '1.000000',
            'trainer': {
              'first_name' : 3,
              'last_name' : 4,
            },
            'dogs': [15],
          },
          {
            'id': 11,
            'dog_count': 3,
            'date': '2022-01-26',
            'start_time': '12:00:00',
            'end_time': '18:00:00',
            'location': '1.000000',
            'trainer': {
              'first_name' : 3,
              'last_name' : 4,
            },
            'dogs': [15],
          },
          {
            'id': 11,
            'dog_count': 3,
            'date': '2022-05-27',
            'start_time': '12:00:00',
            'end_time': '14:00:00',
            'location': '1.000000',
            'trainer': {
              'first_name' : 3,
              'last_name' : 4,
            },
            'dogs': [15],
          },
          {
            'id': 11,
            'dog_count': 3,
            'date': '2022-05-26',
            'start_time': '12:00:00',
            'end_time': '21:00:00',
            'location': '1.000000',
            'trainer': {
              'first_name' : 3,
              'last_name' : 4,
            },
            'dogs': [15],
          },
        ]

        setWalk(data);
        setCurrentWalk(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

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
          {currentWalk
            .filter(
              (walk) =>
                walk.date <= currentDate && walk.end_time < currentTime
            )
            .sort((a, b) => a - b)
            .map((walk) => (
              <div className="Reservations--incomingResList">
                <div className="Reservations--hisDate">
                  <div className="Reservations--dateWeek">{moment(walk.date).locale("pl").format("dddd")}</div>
                  <div className="Reservations--dateTime">
                    {moment(walk.date).locale("pl").format("MMM DD") +' '+ walk.start_time.substr(0, 5)}
                  </div>
                </div>
                <p className="dot"></p>
                <div className="Reservations--hisReservation">
                  <div className="Reservations--bottomInfo">
                    <div className="Reservations--Avatar">
                      <img src={pudzilla} alt="awatar" />
                      {/* <img src={walk.trainer.image} alt="awatar" /> */}
                    </div>
                    <div>
                      {walk.trainer.first_name + " " + walk.trainer.last_name}
                      <br></br> Azor, Rocky, Maciej
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
            ))}
        </div>
      </div>
      <div className="Reservations--book">
        <button onClick={switchToBook}>Rezerwuj spacer</button>
      </div>
    </div>
  );
};
