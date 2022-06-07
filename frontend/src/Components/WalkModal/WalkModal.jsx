import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./WalkModal.scss";

export const WalkModal = (props) => {
  const navigate = useNavigate();
  const switchToDetails = () => navigate(`/walkdetails/${props.id}`);

  return (
    <div className="WalkModal">
      <div className="walk-date">{props.date}</div>
      <div className="walk-time">{props.start_time + "" + props.end_time}</div>
      <div className="walk-trainer">
        {props.trainer.first_name + " " + props.trainer.last_name}
      </div>
      <div className="walk-details" onClick={switchToDetails}>
        Szczegóły
      </div>
    </div>
  );
};
