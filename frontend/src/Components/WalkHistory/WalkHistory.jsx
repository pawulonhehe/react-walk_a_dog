import React, { useState } from "react";
import "./WalkHistory.scss";
import moment from "moment";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import BasicModal from "../BasicModal/BasicModal";
import { RateTrainer } from "../RateTrainer/RateTrainer";

export const WalkHistory = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const [showR, setOpenR] = useState(false);
  const handleOpenR = () => setOpenR(true);
  const handleCloseR = () => setOpenR(false);

  return (
    <div className="Reservations--incomingResList">
      <div className="Reservations--hisDate">
        <div className="Reservations--dateWeek">
          {moment(props.date).locale("pl").format("dddd")}
        </div>
        <div className="Reservations--dateTime">
          {moment(props.date).locale("pl").format("DD MMM") +
            " " +
            props.start_time.substr(0, 5)}
        </div>
      </div>
      <p className="dot"></p>
      <div className="Reservations--hisReservation">
        <div className="Reservations--bottomInfo">
          <div className="Reservations--Avatar">
            <img src={pudzilla} alt="awatar" />
            {/* <img src={props.trainer.image} alt="awatar" /> */}
          </div>
          <div>
            {props.trainer.first_name + " " + props.trainer.last_name}
            <br></br> {props.dogs.map((d) => d.name).join(", ")}
          </div>
        </div>
        <div className="Reservations--infoButtons">
          <button type="button" onClick={handleOpen}>
            Szczegóły
          </button>
          <BasicModal open={open} onClose={handleClose} {...props} />
          <button type="button" onClick={handleOpenR}>
            Oceń
          </button>
          <RateTrainer open={showR} onClose={handleCloseR} />
        </div>
      </div>
    </div>
  );
};
