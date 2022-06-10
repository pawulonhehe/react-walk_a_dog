import React, { useState } from "react";
import "./RateTrainerTrainer.scss";
import pudzilla from "../../Assets/Images/pudzilla.png";
import Rating from "@mui/material/Rating";
import { Modal, Select } from "@mui/material";
import { useNavigate } from "react-router";
import axios from "axios";

export const RateTrainerTrainer = (props) => {
  const [value, setValue] = useState(2);
  const [comment, setComment] = useState([]);
  const token = sessionStorage.getItem("token");
  const [selectedDog, setSelectedDog] = useState("");
  const [walk, setWalk] = useState("");

  const changeDog = (event) => {
    setSelectedDog(event.target.value);
  };

  const changeComment = (event) => {
    setComment(event.target.value);
  };

  console.log("stars: ", value);
  console.log("comment: ", comment);
  console.log(props);

  const navigate = useNavigate();

  const addOpinion = (event) => {
    event.preventDefault();
    let data = {
      value: value,
      comment: comment,
      walk: props.id,
      dog: +selectedDog,
      evaluator: +sessionStorage.getItem("user"),
    };
    axios
      .post("/dogs/rating/add/", data, {
        headers: {
          Authorization: `Token ${sessionStorage.getItem("token")}`,
        },
      })
      .then(() => {
        navigate(`/trainerhist/${sessionStorage.getItem("user")}`);
        setSelectedDog("");
      });
  };
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <div className="RateTrainer">
        <div className="RateTrainer--content">
          <img src={pudzilla} alt="pudzilla" />
          <h2>Dzięki za skorzystanie z usługi!</h2>
          <div className="RateTrainer--rate">
            <h3>
              Jak oceniasz trening z trenerem{" "}
              {props.trainer.first_name + " " + props.trainer.last_name}?{" "}
            </h3>
            <div className="RateTrainer--stars">
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </div>
            <div className="selectHolder">
              <select onChange={changeDog}>
                <option value="">Wybierz psa</option>
                {props.dogs.map((dog) => (
                  <option value={dog.id}>{dog.name}</option>
                ))}
              </select>
            </div>
            <textarea
              placeholder=" Pozostaw komentarz..."
              name=""
              id=""
              cols="35"
              rows="7"
              value={comment}
              onChange={changeComment}
            ></textarea>
            <button onClick={addOpinion}>Prześlij</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
// props.dogs.map((dog) => ({
//   label: dog.name,
//   value: dog.id,
// }));
