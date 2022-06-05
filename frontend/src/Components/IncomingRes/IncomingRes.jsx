import React, { useState } from "react";
import "./IncomingRes.scss";
import moment from "moment";
import BasicModal from "../BasicModal/BasicModal";
import { Icon } from "@iconify/react";

export const IncomingRes = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="Reservations--incomingResList">
      <span className="Reservations--date">
        {moment(props.date).locale("pl").format("dddd")} <br></br>
        {moment(props.date).locale("pl").format("DD MMM") + " " + props.start_time.substr(0, 5)}
      </span>
      <p className="dot"></p>
      <div className="Reservations--reservation">
        <div className="Reservations--info">
          <span>
            {props.trainer.first_name + " " + props.trainer.last_name} - Azor,
            Rocky, Maciej
          </span>
          <div>
            <Icon icon="material-symbols:pin-drop-sharp" />
            {/* {props.location} */}
            Aleja Warszawska 107, <br></br>10-720 Olsztyn
          </div>
        </div>
        <div className="Reservations--infoButtons">
          <button>Anuluj</button>
          <button type="button" onClick={handleOpen}>
            Szczegóły
          </button>
          <BasicModal open={open} onClose={handleClose} />
        </div>
      </div>
    </div>
  );
};
