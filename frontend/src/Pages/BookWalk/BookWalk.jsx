import React, { useEffect, useState } from "react";
import "./BookWalk.scss";
import { Icon } from "@iconify/react";
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
  const [selectedTrainer, setSelectedTrainer] = useState("");
  const [walk, setWalk] = useState([]);
  const [currentWalk, setCurrentWalk] = useState([]);
  const [myDate, setMyDate] = useState([
    moment(new Date()).locale("pl").format("MMM Do YY"),
  ]);
  const token = sessionStorage.getItem("token");
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  let selectedDate = moment(new Date()).locale("pl").format("MMM Do YY");

  function changeDate(event) {
    selectedDate = moment(event.target.value).locale("pl").format("MMM Do YY");
    setMyDate(selectedDate);
  }

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

        //TODO
        const data = res.data;

        setWalk(data);
        setCurrentWalk(data);
        console.log([]);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  const [choosenDogs, setChoosenDogs] = useState([]);

  const applyForWalk = (event) => {
    const obj = {
      dogs: [choosenDogs],
    };
    console.group(obj);
    axios
    .patch("/walks/{id}/", obj, {
    headers: { Authorization: `Token ${token}` },
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => console.log(err.response.data));
  };

  const selectDog = (selectedOption) => {
    setSelectedDog(selectedOption);
    changeDog(selectedOption);
  };

  function changeDog(selectedOption) {
    setCurrentWalk(walk);
    setCurrentWalk(
      walk.filter((w) => 3 - w.dogs.length >= selectedOption.length)
    );
  }
  console.log(selectedTrainer);
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
            <option value="Dowolny">Dowolny</option>
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
        <span>{myDate}</span>
        {currentWalk
          .filter(
            (walk) =>
              walk.trainer.first_name + " " + walk.trainer.last_name ===
                selectedTrainer || selectedTrainer === "Dowolny"
          )
          .map((walk) => (
            <Walk {...walk} onClick={() => applyForWalk}/>
          ))}
      </div>
    </div>
  );
};
