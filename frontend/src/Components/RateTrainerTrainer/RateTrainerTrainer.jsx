import React, { useState } from "react";
import "./RateTrainerTrainer.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import Rating from "@mui/material/Rating";
import { Modal } from "@mui/material";

export const RateTrainerTrainer = (props) => {
  const [value, setValue] = useState(2); 
  const [comment, setComment] = useState([]);
  const token = sessionStorage.getItem("token");

  const changeComment = (event) => {
    setComment(event.target.value);
  };

  // console.log("stars: ", value);
  // console.log("comment: ", comment);

  /* useEffect(() => {
    axios
    .post("/dogs/rating/add/",
    {
      value: opinion.stars,
      comment: opinion.comment,
      evaluator: opinion.trainer,
      walk: props.id,
      dog: props.dog,
    },
    {
      headers: { Authorization: `Token ${token}` },
    }
    })) */

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

            <textarea
              placeholder=" Pozostaw komentarz..."
              name=""
              id=""
              cols="35"
              rows="7"
              value={comment}
              onChange={changeComment}
            ></textarea>
            <button>Prześlij</button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
