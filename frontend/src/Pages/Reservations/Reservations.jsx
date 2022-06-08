import React, { useState, useEffect } from "react";
import "./Reservations.scss";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
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
  const [checked, setChecked] = useState([]);
  const switchToBook = () => navigate("/bookwalk");
  const userId = sessionStorage.getItem("user");
  const currentDate = moment(new Date()).format("YYYY-MM-DD");

  const [selectedDate, setSelectedDate] = useState(0);

  const changeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const [selectedDog, setSelectedDog] = useState("all");
  const [selectedTrainer, setSelectedTrainer] = useState("all");

  const changeDog = (event) => {
    setSelectedDog(event.target.value);
  };

  const changeTrainer = (event) => {
    setSelectedTrainer(event.target.value);
  };


  const clearFilters = () => {
    setSelectedDate(0);
    setSelectedDog("all");
    setSelectedTrainer("all");
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
      .get(`/users/${userId}/incoming-walks/`, {
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
          <select
            name=""
            id=""
            className="tooltip Reservations--filterButton"
            value={selectedDog}
            onChange={changeDog}
          >
            <option value="all" selected>
              Pies
            </option>
            {dog.map((dog) => (
              <option value={dog.name}>{dog.name}</option>
            ))}
          </select>
          <select
            name=""
            id=""
            className="tooltip Reservations--filterButton"
            value={selectedTrainer}
            onChange={changeTrainer}
          >
            <option value="all" selected>
              Trener
            </option>
            {user.map((trainer) => (
              <option value={trainer.first_name + " " + trainer.last_name}>
                {trainer.first_name + " " + trainer.last_name}
              </option>
            ))}
          </select>
          <button className="Reservations--filtersClean" onClick={clearFilters}>
            <Icon icon="bi:x-lg" />
          </button>
        </div>
        <div className="Reservations--hisList">
          {walkHistory
            .filter(
              (walk) =>
                (moment(walk.date).isSame(selectedDate) ||
                selectedDate === 0) &&
                  (walk.dogs.filter( val => val['name'] === {selectedDog}).length >
                    0 ||
                    selectedDog === "all") &&
                  (walk.trainer.first_name + " " + walk.trainer.last_name ===
                    selectedTrainer ||
                    selectedTrainer === "all")
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
