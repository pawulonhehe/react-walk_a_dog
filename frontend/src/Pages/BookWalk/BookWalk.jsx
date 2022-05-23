import React from "react";
import "./BookWalk.scss";
import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";

export const BookWalk = () => {
  const [user, setUser] = useState([]);
  const [dog, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState([]);
  const [walk, setWalk] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/trainers/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        let trainer_list = [];
        for (const [key, value] of Object.entries(res.data)) {
          trainer_list.push(value["user"]);
        }
        setUser(trainer_list);
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
        setWalk(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  console.log(walk);

  const selectDog = (selectedOption) => setSelectedDog(selectedOption);
  const walkTrainer = (event) =>
    setWalk({ ...walk, trainer: event.target.value });
  const walkDogs = (event) => setWalk({ ...walk, dog: event.target.value });
  const bookWalk = (event) => {
    event.preventDefault();
    axios.post(
      "/walks/new/",
      {
        trainer: walk.trainer,
        dog: walk.dog,
      },
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
  };
  console.log(selectedDog);
  return (
    <div className="BookWalk">
      <div className="BookWalk--topText">
        <h3>Rezerwuj spacer</h3>
      </div>
      <div className="BookWalk--select">
        <div className="BookWalk--select">
          <span>Wybierz datę</span>
          <select name="" id="date-select"></select>
        </div>
        <div className="BookWalk--select">
          <span>Trener</span>
          <select name="" id="trainer-selection">
            {user.map((user) => (
              <option value={walk.trainer}>
                {user.first_name}&nbsp;
                {user.last_name}
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
        <span>poniedziałek, 7 marca 2022</span>
        {walk.map((walk) => (
          <div className="BookWalk--availableWalksChoose">
            <div>
              {walk.start_time.substr(0, 5)} <br></br>
              {walk.end_time.substr(0, 5)}
            </div>
            <div className="line"></div>
            <div className="BookWalk--box">
              <div className="BookWalk--info">
                <h5>Spacer</h5>
                <span>
                  {walk.trainer.first_name + " " + walk.trainer.last_name}
                </span>
                <div>
                  <Icon icon="material-symbols:sound-detection-dog-barking" />
                  {3 - walk.dogs.length} wolnych miejsc
                </div>
              </div>
              <div className="BookWalk--button">
                <button>Zapisz się</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
