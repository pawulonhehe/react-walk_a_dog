import React from "react";
import "./TrainerHistWalk.scss";
import { RateTrainerTrainer } from "../../Components/RateTrainerTrainer/RateTrainerTrainer";

export const TrainerHistWalk = (props) => {
  
  return (
    <div className="TrainerHistWalk">
      <div className="walk-date">{props.date}</div>
      <div className="walk-time">{props.start_time + " " + props.end_time}</div>
      <div className="line"></div>
      <div className="title">Spacer</div>
      <div className="trener">{props.trainer}</div>
      <div className="pieski">Jason, Mamoa, Reksio</div>
      <button className="trainerhist-btn">Stwórz raport</button>
    </div>
  );
};
