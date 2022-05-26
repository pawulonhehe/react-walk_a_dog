import { Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./ModalAddSlot.scss";
import * as moment from "moment";
import axios from "axios";

export const ModalAddSlot = () => {
  const calculateWalkEndTime = (time) => {
    let [hours, minutes, seconds] = time.split(":");
    hours = +hours + 1;
    return moment(new Date())
      .set({ hours, minutes, seconds })
      .format("HH:mm:ss");
  };
  const currentDate = moment(new Date()).format("YYYY-MM-DD");
  const currentTime = moment(new Date()).format("HH:mm:ss");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedTime, setSelectedTime] = useState(currentTime);
  const [walkEndTime, setWalkEndTime] = useState(
    calculateWalkEndTime(currentTime)
  );
  const [myDate, setMyDate] = useState([
    moment(new Date()).locale("pl").format("MMM Do YY"),
  ]);
  const changeDate = (event) => {
    setSelectedDate(event.target.value);
  };
  const changeTime = (event) => {
    setWalkEndTime(calculateWalkEndTime(event.target.value));
  };
  const [selectedDogs, setSelectedDogs] = useState([]);
  const token = sessionStorage.getItem("token");
  const selectDogsaddDogs = (e) => {
    setWalk({ ...walk, dogs: e.target.value });
  };

  const [walk, setWalk] = useState({
    trainer: sessionStorage.getItem("user"),
    date: selectedDate,
    start_time: selectedTime,
    end_time: walkEndTime,
    dogs: 1,
    location: 0,
  });

  const addDate = (event) => setWalk({ ...walk, date: event.target.value });
  const addStartTime = (event) =>
    setWalk({ ...walk, start_time: event.target.value });
  const addEndTime = (event) =>
    setWalk({ ...walk, end_time: event.target.value });
  // const addDogs = (selectedDog) =>
  //   setWalk({ ...walk, dogs: selectedDog.value });

  const addWalk = (event) => {
    event.preventDefault();
    axios
      .post(
        "/walks/new/",
        {
          trainer: sessionStorage.getItem("user"),
          date: walk.date,
          start_time: walk.start_time,
          end_time: walk.end_time,
          dogs: [walk.dogs],
          location: 1,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .catch((err) => console.log(err.response.data));
  };
  console.log(currentTime);
  console.log(walkEndTime);
  console.log(walk);
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
            onChange={changeDate + addDate}
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
            onChange={changeTime + addStartTime + addEndTime}
            defaultValue={currentTime}
            sx={{ width: 280 }}
            inputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="endtime">Koniec spaceru {walkEndTime}</div>
        <div className="selectt">
          <span>Wybierz maksymalną ilość psów</span>
          <select
            id="dog-selection"
            name="dogs"
            label="dogs"
            onChange={selectDogsaddDogs}
            defaultValue={1}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
          </select>
        </div>
        <button className="AddWalkButton" onClick={addWalk}>
          Zatwierdź
        </button>
      </div>
    </div>
  );
};
