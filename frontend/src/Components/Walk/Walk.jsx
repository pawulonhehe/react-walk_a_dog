import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./Walk.scss";
import moment from "moment";
import { useNavigate } from "react-router";
import axios from "axios";

export const Walk = (props) => {
  const [crntWalk, setCrntWalk] = useState([]);
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const bookSingleWalk = () => props.handleBook(props.id);

  console.log(props);
  return (
    <div className="Walk">
      <div className="BookWalk--availableWalksChoose">
        <div>
          {moment(props.date).locale("pl").format("DD.MM.YY")} <br></br>
          {props.start_time.substr(0, 5)} <br></br>
          {props.end_time.substr(0, 5)}
        </div>
        <div className="line"></div>
        <div className="BookWalk--box">
          <div className="BookWalk--info">
            <h5>Spacer</h5>
            <span>
              {props.trainer.first_name + " " + props.trainer.last_name}
            </span>
            <div>
              <Icon icon="material-symbols:sound-detection-dog-barking" />
              {3 - props.dogs.length} wolnych miejsc
            </div>
          </div>
          <div className="BookWalk--button">
            <button onClick={bookSingleWalk}>Zapisz się</button>
          </div>
        </div>
      </div>
    </div>
  );
};
