import { Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ModalAddSlot.scss";
import * as moment from "moment";
import axios from "axios";

export const ModalAddSlot = () => {
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const currentTime = moment(new Date()).format("HH:mm");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState(currentTime);
  const [myDate, setMyDate] = useState([
    moment(new Date()).locale("pl").format("MMM Do YY"),
  ]);
  const changeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const changeTime = (event) => {
    setSelectedTime(event.target.value);
  };

  const [selectedDog, setSelectedDog] = useState([]);
  const token = sessionStorage.getItem("token");

  const selectDog = (selectedOption) => {
    setSelectedDog(selectedOption);
    console.log(selectedOption.target.value);
  };

  const addWalk = (event) => {
    event.preventDefault();

    axios.post(
      "/walks/new/",
      {
        trainer: sessionStorage.getItem("user"),
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
  };
  console.log(selectedDate);
  console.log(selectedTime);

  return (
    <div className="ModalAddSlot">
      <div className="AddSlotForm">
        <div className="AddSlotForm--title">
          <h2>Dodaj Slot</h2>
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
            onChange={changeTime}
            defaultValue={currentTime}
            sx={{ width: 280 }}
            inputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="endtime">Koniec spaceru {selectedTime}</div>
        <div className="selectt">
          <span>Wybierz maksymalną ilość psów</span>
          <select
            id="dog-selection"
            name="dogs"
            label="dogs"
            onChange={selectDog}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <button className="AddWalkButton">Zatwierdź</button>
      </div>
    </div>
  );
};
