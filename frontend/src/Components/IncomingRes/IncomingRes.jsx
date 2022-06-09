import React, { useState } from "react";
import "./IncomingRes.scss";
import moment from "moment";
import BasicModal from "../BasicModal/BasicModal";
import { Icon } from "@iconify/react";
import axios from "axios";



export const IncomingRes = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const cancel = (a) => {
    const userId = sessionStorage.getItem("user");

    if(!window.confirm("Czy na pewno usunąć ?")) {
      return
    } 

    const update = {
      id: props.id,
      dog_count: props.dog_count,
      date: props.date,
      start_time: props.start_time,
      end_time: props.end_time,
      location: props.location,
      trainer: props.trainer.id,
      dogs: props.dogs.filter(d => d.owner.id.toString() !== userId.toString()).map(d => d.id),
    };

    update.dog_count = update.dogs.length

    axios
      .put(`/walks/${props.id}/`, {
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
    <div className="Reservations--incomingResList">
      <span className="Reservations--date">
        {moment(props.date).locale("pl").format("dddd")} <br></br>
        {moment(props.date).locale("pl").format("DD MMM") +
          " " +
          props.start_time.substr(0, 5)}
      </span>
      <p className="dot"></p>
      <div className="Reservations--reservation">
        <div className="Reservations--info">
          <span>
            {props.trainer.first_name + " " + props.trainer.last_name + " - "}
            { props.dogs.map(d => d.name).join(', ')}
          </span>
          <div>
            <Icon icon="material-symbols:pin-drop-sharp" />
            {/* {props.location} */}
            Aleja Warszawska 107, <br></br>10-720 Olsztyn
          </div>
        </div>
        <div className="Reservations--infoButtons">
          <button onClick={cancel}>Anuluj</button>
          <button type="button" onClick={handleOpen}>
            Szczegóły
          </button>
          <BasicModal open={open} onClose={handleClose} {...props} />
        </div>
      </div>
    </div>
  );
};
