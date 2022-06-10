import React, { useState } from "react";
import "./RateTrainer.scss";
import pudzilla from "../../Assets/Images/pudzilla.png";
import Rating from "@mui/material/Rating";
import { Modal } from "@mui/material";
import axios from "axios";


export const RateTrainer = (props) => {
  const [value, setValue] = useState();
  const [comment, setComment] = useState([]);

  const changeComment = (event) => {
    setComment(event.target.value);
  };


  const rate = (a) => {
    const userId = sessionStorage.getItem("user");
    const trainerId = props.id;

    const update = {
      value: value,
      comment: comment,
      trainer: trainerId,
      evaluator: userId
    };


    axios
      .post(`/trainers/rating/add/`, {
        ...update,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
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
              {props.first_name + " " + props.last_name}?{" "}
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

            <textarea
              placeholder=" Pozostaw komentarz..."
              name=""
              id=""
              cols="35"
              rows="7"
              value={comment}
              onChange={changeComment}
            ></textarea>
            <button onClick={rate}>Prześlij</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
