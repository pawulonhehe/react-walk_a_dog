import React from "react";
import { Icon } from "@iconify/react";

export const Walk = (props) => {
  console.log(props);
  return (
    <div className="Walk">
      <div className="BookWalk--availableWalksChoose">
        <div>
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
            <button>Zapisz się</button>
          </div>
        </div>
      </div>
    </div>
  );
};
