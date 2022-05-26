import { TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ModalAddSlot.scss";
import * as moment from "moment";
import axios from "axios";

export const ModalAddSlot = () => {
  const [myDate, setMyDate] = useState([
    moment(new Date()).locale("pl").format("MMM Do YY"),
  ]);
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  let selectedDate = moment(new Date()).locale("pl").format("MMM Do YY");
  const changeDate = (event) => {
    selectedDate = moment(event.target.value).locale("pl").format("MMM Do YY");
    setMyDate(selectedDate);
  };
  const currentTime = moment(new Date()).format("HH:mm");

  const [dogs, setDogs] = useState([]);
  const [users, setUsers] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/dogs/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setDogs(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  useEffect(() => {
    axios
      .get("/users/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  console.log(dogs);
  console.log(users);

  return (
    <div className="ModalAddSlot">
      <div className="AddSlotForm">
        <div className="AddSlotForm--title">
          <h2>Dodaj spacer</h2>
        </div>
        <div className="calendar">
          <TextField
            id="date"
            type="date"
            label="Wybierz date"
            onChange={changeDate}
            defaultValue={currentDate}
            sx={{ width: 280 }}
            inputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="starttime">
          <TextField
            id="time"
            type="time"
            label="Wybierz czas rozpoczęcia"
            defaultValue={currentTime}
            sx={{ width: 280 }}
            inputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="endtime">
          <TextField
            id="time"
            type="time"
            label="Wybierz czas zakończenia"
            defaultValue={currentTime}
            sx={{ width: 280 }}
            inputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="selectt">
          <select name="">
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
      </div>
      <button className="btnAddWalk">Zatwierdź</button>
    </div>
  );
};
