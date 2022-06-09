import React, { useState } from "react";
import "./TrainerHistWalk.scss";
import { RateTrainerTrainer } from "../../Components/RateTrainerTrainer/RateTrainerTrainer";
import { useNavigate } from "react-router";

export const TrainerHistWalk = (props) => {
  const [showR, setOpenR] = useState(false);
  const handleOpenR = () => setOpenR(true);
  const handleCloseR = () => setOpenR(false);
  // const navigate = useNavigate();
  // const GoToDetails = navigate("/");

  return (
    <div className="TrainerHistWalk">
      <div className="walk-date">{props.date}</div>
      <div className="walk-time">{props.start_time + " " + props.end_time}</div>
      <div className="line"></div>
      <div className="title">Spacer</div>
      <div className="trener">{props.trainer}</div>
      <div className="pieski">{props.dogs.map((d) => d.name).join(", ")}</div>
      <button className="trainerhist-btn" onClick={handleOpenR}>
        Szczegóły
      </button>
      <RateTrainerTrainer open={showR} onClose={handleCloseR} {...props}  />
    </div>
  );
};
