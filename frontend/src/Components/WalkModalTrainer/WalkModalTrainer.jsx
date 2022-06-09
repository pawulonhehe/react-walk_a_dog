import React, { useState } from "react";
import "./WalkModalTrainer.scss";
import { WalkDetailsTrainer } from "../WalkDetailsTrainer/WalkDetailsTrainer";


export const WalkModalTrainerxd = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="WalkModalTrainer">
      <div className="walk-date">{props.date}</div>
      <div className="walk-time">{props.start_time + "-" + props.end_time}</div>
      <div className="walk-trainer">tu psy/trener</div>
      <div className="walk-details" onClick={handleOpen}>
        Szczegóły
      </div>
      <WalkDetailsTrainer open={open} onClose={handleClose} {...props} />
    </div>
  );
};
