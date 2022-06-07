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
import { RateTrainer } from "../../Components/RateTrainer/RateTrainer";
// import { Link } from "react-router-dom";

export const Reservations = () => {
  const token = sessionStorage.getItem("token");
  const [walk, setWalk] = useState([]);
  const [user, setUser] = useState([]);
  const [walkHistory, setWalkHistory] = useState([]);
  const [dog, setDogs] = useState([]);
  const [currentWalk, setCurrentWalk] = useState([]);
  const navigate = useNavigate();
  const [checked, setChecked] = useState([]);
  const switchToBook = () => navigate("/bookwalk");
  const userId = sessionStorage.getItem("user");
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

  const changeDate = (event) => {
    setSelectedDate(event.target.value);
  };


  
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList.indexOf(event.target.value) === -1 ? updatedList.push(event.target.value) : updatedList.splice(checked.indexOf(event.target.value), 1);
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);

    console.log(updatedList)


  };

  const clearFilters = () => {
    setSelectedDate(0)
  }

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
      .get( `/users/${userId}/incoming-walks/`, {
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
      .get(`/users/${userId}/walk-history/`, {
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
                <div key={index}>
                  <input value={dog.name} type="checkbox" onChange={handleCheck} />
                  <span>{dog.name}</span>
                </div>
              ))}


            </div>
          </Popover>
          <button className="tooltip Reservations--filterButton">
            <Icon icon="material-symbols:person" />
            Trener
          </button>
          <button className="Reservations--filtersClean" onClick={clearFilters}>
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
