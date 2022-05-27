import { Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ModalAddSlot.scss";
import * as moment from "moment";
import axios from "axios";

const calculateWalkEndTime = (time) => {
  let [hours, minutes, seconds] = time.split(":");
  hours = +hours + 1;
  return moment(new Date()).set({ hours, minutes, seconds }).format("HH:mm:ss");
};

export const ModalAddSlot = () => {
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const currentTime = moment(new Date()).format("HH:mm:ss");

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [walkStartTime, setWalkStartTime] = useState(currentTime);
  const [walkEndTime, setWalkEndTime] = useState(
    calculateWalkEndTime(currentTime)
  );

  const token = sessionStorage.getItem("token");

  // const addDogs = (selectedDog) =>
  //   setWalk({ ...walk, dogs: selectedDog.value });

  // const addDogs = (selectedDog) =>
  //   setWalk({ ...walk, dogs: selectedDog.value });

  const addWalk = (event) => {
    const obj = {
      trainer: sessionStorage.getItem("user"),
      date: selectedDate,
      start_time: walkStartTime,
      end_time: walkEndTime,
      dogs: [],
      location: 1,
    };
    console.log(obj);
    axios
      .post(
        "/walks/new/",
         obj ,
        { headers: { Authorization: `Token ${token}` } }
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data));
  };
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
            onChange={(e) => {
              setSelectedDate(e.target.value);
            }}
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
            onChange={(e) => {
              setWalkStartTime(e.target.value);
              setWalkEndTime(calculateWalkEndTime(e.target.value));
            }}
            defaultValue={currentTime}
            sx={{ width: 280 }}
            inputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="endtime">Koniec spaceru {walkEndTime}</div>

        <button type="button" className="AddWalkButton" onClick={addWalk}>
          Zatwierdź
        </button>
      </div>
    </div>
  );
};
