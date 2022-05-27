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

  const [walkStartTime, setWalkStartTime] = useState(currentTime);
  const [walkEndTime, setWalkEndTime] = useState(
    calculateWalkEndTime(currentTime)
  );

  const [myDate, setMyDate] = useState([
    moment(new Date()).locale("pl").format("MMM Do YY"),
  ]);
  const changeDate = (event) => {
    setSelectedDate(event.target.value);
  };
  const [walk, setWalk] = useState({
    trainer: sessionStorage.getItem("user"),
    date: selectedDate,
    start_time: walkStartTime,
    end_time: walkEndTime,
    location: 0,
    dogs: [],
  });
  const addStartTime = (time) => setWalk({ ...walk, start_time: time });

  const addEndTime = (time) => setWalk({ ...walk, end_time: time });

  const [selectedDogs, setSelectedDogs] = useState([]);
  const token = sessionStorage.getItem("token");
  const selectDogsaddDogs = (e) => {
    setWalk({ ...walk, dogs: e.target.value });
  };

  const changeStartTime = (event) => {
    setWalkStartTime(event.target.value);
  };
  const changeEndTime = (event) => {
    setWalkEndTime(calculateWalkEndTime(event.target.value));
  };
  const addDate = (date_str) => setWalk({ ...walk, date: date_str });

  // const addDogs = (selectedDog) =>
  //   setWalk({ ...walk, dogs: selectedDog.value });

  const addWalk = (event) => {
    axios
      .post(
        "/walks/new/",
        {
          trainer: sessionStorage.getItem("user"),
          date: walk.date,
          start_time: walk.start_time,
          end_time: walk.end_time,
          dogs: [],
          location: 1,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
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
              changeDate(e);
              addDate(e.target.value);
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
              changeStartTime(e);
              changeEndTime(e);
              addStartTime(e.target.value);
              addEndTime(calculateWalkEndTime(e.target.value));
            }}
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
        <button type="button" className="AddWalkButton" onClick={addWalk}>
          Zatwierdź
        </button>
      </div>
    </div>
  );
};
