import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./WalkModal.scss";
import WalkDetailsClient from "../WalkDetailsClient/WalkDetailsClient";

export const WalkModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="WalkModal">
      <div className="walk-date">{props.date}</div>
      <div className="walk-time">{props.start_time + "-" + props.end_time}</div>
      <div className="walk-trainer">
        {props.trainer.first_name + " " + props.trainer.last_name}
      </div>
      <div className="walk-details" onClick={handleOpen}>
        Szczegóły
      </div>
      <WalkDetailsClient open={open} onClose={handleClose} {...props} />
    </div>
  );
};
