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

  const [dogs, setDogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedDogs, setSelectedDogs] = useState([]);
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
        <div className="time">
          <TextField
            id="datetime-local"
            type="datetime-local"
            label="Wybierz czas"
            // defaultValue={currentTime}
            sx={{ width: 280 }}
            inputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="selectt">
          <select name="" value={selectedUser} id="user-selection">
            {users.map((user) => (
              <option value={user.first_name}>
                {user.first_name + " " + user.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="selectt">
          <select name="" value={selectedDogs} id="dog-selection">
            {dogs.map((dog) => (
              <option value={dog.name}>{dog.name}</option>
            ))}
          </select>
        </div>
        <button className="btnAddWalk">Zatwierdź</button>
      </div>
    </div>
  );
};
