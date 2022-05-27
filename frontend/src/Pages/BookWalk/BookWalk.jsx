import React, { useEffect, useState } from "react";
import "./BookWalk.scss";
import axios from "axios";
import Select from "react-select";
import TextField from "@mui/material/TextField";
import { Walk } from "../../Components/Walk/Walk";
import * as moment from "moment";
require("moment/min/locales.min");

export const BookWalk = () => {
  const [user, setUser] = useState([]);
  const [dog, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState([]);
  const [selectedTrainer, setSelectedTrainer] = useState("Dowolny");
  const [walk, setWalk] = useState([]);
  const [currentWalk, setCurrentWalk] = useState([]);
  const [myDate, setMyDate] = useState([
    moment(new Date()).locale("pl").format("dddd, DD MMMM yyyy "),
  ]);
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const [selectedDate, setSelectedDate] = useState(currentDate);

  const token = sessionStorage.getItem("token");

  let selectedDateFormat = moment(new Date())
    .locale("pl")
    .format("dddd, DD MMMM yyyy ");
  let chosenDate = moment(new Date()).format("YYYY-MM-DD");

  const changeDate = (event) => {
    selectedDateFormat = moment(event.target.value)
      .locale("pl")
      .format("dddd, DD MMMM yyyy ");
    setMyDate(selectedDateFormat);

    chosenDate = moment(event.target.value).format("YYYY-MM-DD");
    setSelectedDate(chosenDate);
  };

  const changeTrainer = (event) => setSelectedTrainer(event.target.value);

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
        console.log([]);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const selectDog = (selectedOption) => {
    setSelectedDog(selectedOption);
    changeDog(selectedOption);
  };

  const changeDog = (selectedOption) => {
    setCurrentWalk(walk);
    setCurrentWalk(
      walk.filter((w) => 3 - w.dogs.length >= selectedOption.length)
    );
  };
  // const walkTrainer = (event) =>
  //   setWalk({ ...walk, trainer: event.target.value });
  // const walkDogs = (event) => setWalk({ ...walk, dog: event.target.value });

  // const bookWalk = (event) => {
  //   event.preventDefault();
  //   axios.post(
  //     "/walks/new/",
  //     {
  //       trainer: walk.trainer,
  //       dog: walk.dog,
  //     },
  //     {
  //       headers: { Authorization: `Token ${token}` },
  //     }
  //   );
  // };
  // console.log(selectedDog);

  return (
    <div className="BookWalk">
      <div className="BookWalk--topText">
        <h3>Rezerwuj spacer</h3>
      </div>
      <div className="BookWalk--select">
        <div className="BookWalk--select">
          <span>Wybierz datę</span>
          <div className="calendar">
            <TextField
              id="date"
              type="date"
              onChange={changeDate}
              defaultValue={currentDate}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <div className="BookWalk--select">
          <span>Trener</span>
          <select
            name=""
            value={selectedTrainer}
            id="trainer-selection"
            onChange={changeTrainer}
          >
            <option value="Dowolny">Dowolny trener</option>
            {user.map((user) => (
              <option value={walk.trainer} key={user.first_name}>
                {user.first_name + " " + user.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="BookWalk--select">
          <span>Wybierz psy</span>
          <Select
            options={dog.map((dog) => ({ label: dog.name, value: dog.id }))}
            name=""
            id="dog-selection"
            isMulti
            value={selectedDog}
            onChange={selectDog}
          />
        </div>
      </div>
      <div className="BookWalk--availableWalks">
        {/* <span>{myDate}</span> */}
        {currentWalk
          .filter(
            (walk) =>
              moment(walk.date).isSame(selectedDate) &&
              (walk.trainer.first_name + " " + walk.trainer.last_name ===
                selectedTrainer ||
                selectedTrainer === "Dowolny")
          )
          .map((walk) => (
            <Walk {...walk} />
          ))}
      </div>
    </div>
  );
};
