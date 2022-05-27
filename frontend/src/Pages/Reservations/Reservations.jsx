import React, { useState, useEffect } from "react";
import "./Reservations.scss";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import BasicModal from "../../Components/BasicModal/BasicModal";
import Popover from "@mui/material/Popover";
import { WalkHistory } from "../../Components/WalkHistory/WalkHistory";
import axios from "axios";
import moment from "moment";
import TextField from "@mui/material/TextField";

// import { Link } from "react-router-dom";

export const Reservations = () => {
  const token = sessionStorage.getItem("token");
  const [walk, setWalk] = useState([]);
  const [user, setUser] = useState([]);
  const [dog, setDogs] = useState([]);
  const [currentWalk, setCurrentWalk] = useState([]);
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);
  const switchToBook = () => navigate("/bookwalk");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const currentTime = new Date().toLocaleTimeString();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseP = () => {
    setAnchorEl(null);
  };

  const show = Boolean(anchorEl);
  const id = show ? "simple-popover" : undefined;

  const [selectedDate, setSelectedDate] = useState([]);
  const changeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleChange = (position) => {
    const updatedCheckedState = checked.map((item, index) =>
    index === position ? !item : item
  );
  setChecked(updatedCheckedState);
  console.log(position)
  };

  useEffect(() => {
    axios
      .get("/trainers/", {
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

  useEffect(() => {
    axios
      .get("/dogs/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setDogs(
          res.data.filter(
            ({ owner }) => +`${sessionStorage.getItem("user")}` === owner.id
          )
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

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
            id: 11,
            dog_count: 1,
            date: "2022-05-24",
            start_time: "12:00:00",
            end_time: "14:00:00",
            location: "1.000000",
            trainer: {
              first_name: "Jan",
              last_name: "Kowalski",
            },
            dogs: [15],
          },
          {
            id: 11,
            dog_count: 2,
            date: "2022-05-25",
            start_time: "12:00:00",
            end_time: "14:00:00",
            location: "1.000000",
            trainer: {
              first_name: "John",
              last_name: "Smith",
            },
            dogs: [15],
          },
          {
            id: 11,
            dog_count: 3,
            date: "2022-01-28",
            start_time: "12:00:00",
            end_time: "18:00:00",
            location: "1.000000",
            trainer: {
              first_name: "Jan",
              last_name: "Kowalski",
            },
            dogs: [15, 8],
          },
          {
            id: 11,
            dog_count: 3,
            date: "2022-05-27",
            start_time: "07:00:00",
            end_time: "20:00:00",
            location: "1.000000",
            trainer: {
              first_name: "Jan",
              last_name: "Kowalski",
            },
            dogs: [15],
          },
          {
            id: 11,
            dog_count: 3,
            date: "2022-05-27",
            start_time: "23:00:00",
            end_time: "08:00:00",
            location: "1.000000",
            trainer: {
              first_name: "Jan",
              last_name: "Kowalski",
            },
            dogs: [15],
          },
        ];

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
          <div className="calendar">
            <TextField
              id="date"
              type="date"
              onChange={changeDate}
              value={selectedDate}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: "2022-05-27",
              }}
            />
          </div>
          <button
            className="tooltip Reservations--filterButton"
            onClick={handleClick}
          >
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
              {dog.map((dog, index) => (
                <ul>
                  <li key={index}>
                    <label htmlFor="">
                      <input
                        type="checkbox"
                        // checked={checked}
                        onChange={handleChange}
                      />
                      {dog.name}
                    </label>
                  </li>
                </ul>
              ))}
              {/* {dog.map((dog, i) => (
                <div key={i}>
                  <label htmlFor="">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={handleChange}
                      value={dog.id}
                    />
                    {dog.name}
                  </label>
                </div>
              ))} */}
            </div>
          </Popover>
          <button className="tooltip Reservations--filterButton">
            <Icon icon="material-symbols:person" />
            Trener
          </button>
          <button className="Reservations--filtersClean">
            <Icon icon="bi:x-lg" />
          </button>
        </div>
        <div className="Reservations--hisList">
          {currentWalk
            .filter(
              (walk) => moment(walk.date).isSameOrBefore(currentDate)
              // && moment(walk.end_time).isSameOrBefore(currentTime)
              // || moment(walk.date).isSame(selectedDate)
            )
            .sort((a, b) => (a.date < b.date ? 1 : b.date < a.date ? -1 : 0))
            .map((walk) => (
              <WalkHistory {...walk} />
            ))}
        </div>
      </div>
      <div className="Reservations--book">
        <button onClick={switchToBook}>Rezerwuj spacer</button>
      </div>
    </div>
  );
};
