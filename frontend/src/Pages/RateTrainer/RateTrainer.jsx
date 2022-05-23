import React, { useState } from "react";
import "./RateTrainer.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import Rating from "@mui/material/Rating";
import Modal from "@mui/material/Modal";

export const RateTrainer = () => {
  const [value, setValue] = React.useState(2);
  const [showR, setOpenR] = useState(false);
  const handleOpen = () => setOpenR(true);
  const handleCloseR = () => setOpenR(false);

  return (

    <div className="RateTrainer">
      <div className="RateTrainer--content">
        <img src={pudzilla} alt="pudzilla" />
        <h2>Dzięki za skorzystanie z usługi!</h2>
        <div className="RateTrainer--rate">
          <h3>Jak oceniasz trening z trenerem Jackiem Szyułą?</h3>
          <div className="RateTrainer--stars">
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
          </div>

          <textarea name="" id="" cols="35" rows="7">
            Pozostaw komentarz...
          </textarea>
          <button>Prześlij</button>
        </div>
      </div>
    </div>
  );
};
