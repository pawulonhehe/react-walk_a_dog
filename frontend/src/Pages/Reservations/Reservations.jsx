import React, { useState, useEffect } from "react";
import "./Reservations.scss";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { WalkHistory } from "../../Components/WalkHistory/WalkHistory";
import axios from "axios";
import moment from "moment";
import TextField from "@mui/material/TextField";
import { IncomingRes } from "../../Components/IncomingRes/IncomingRes";

// import { Link } from "react-router-dom";

export const Reservations = () => {
  const token = sessionStorage.getItem("token");
  const [walk, setWalk] = useState([]);
  const [user, setUser] = useState([]);
  const [walkHistory, setWalkHistory] = useState([]);
  const [dog, setDogs] = useState([]);
  const [currentWalk, setCurrentWalk] = useState([]);
  const navigate = useNavigate();
  const [checked, setChecked] = React.useState(true);
  const switchToBook = () => navigate("/bookwalk");

  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseP = () => {
    setAnchorEl(null);
  };

  const show = Boolean(anchorEl);
  const id = show ? "simple-popover" : undefined;

  const [selectedDate, setSelectedDate] = useState(0);
  console.log("data: ", selectedDate);

  const changeDate = (event) => {
    setSelectedDate(event.target.value);
    console.log("datechange: ", moment(selectedDate).format("YYYY-MM-DD"));
  };

  const handleChange = (position) => {
    const updatedCheckedState = checked.map((item, index) =>
      index === position ? !item : item
    );
    setChecked(updatedCheckedState);
    console.log(position);
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

        const data = res.data;

        setWalk(data);
        setCurrentWalk(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/users/1/walk-history/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));

        const walkData = res.data;

        setWalkHistory(walkData);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <div className="Reservations">
      <div className="Reservations--topText">Twoje Rezerwacje</div>
      <div className="Reservations--incomingRes">
        {currentWalk
          .filter((walk) => moment(walk.date).isSameOrAfter(currentDate))
          // .sort((a, b) => (a.start_time < b.start_time) ? 1 : ((b.start_time < a.start_time) ? -1 : 0))
          .map((walk) => (
            <IncomingRes {...walk} />
          ))}
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
              defaultValue={selectedDate}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                max: currentDate,
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
                      <input type="checkbox" onChange={handleChange} />
                      {dog.name}
                    </label>
                  </li>
                </ul>
              ))}
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
          {walkHistory
            .filter(
              (walk) =>
                moment(walk.date).isSame(selectedDate) || selectedDate === 0
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
