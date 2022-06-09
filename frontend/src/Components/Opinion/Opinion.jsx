import React from "react";
import "./Opinion.scss";
import { Rating } from "@mui/material";

export const Opinion = (props) => {
  return (
    <div className="MidContainer--Opinion">
    <div className="flex">
      <div className="Opinion__Title">Jan Kowalski</div>
      <div className="Opinion__Stars">
        <Rating name="simple-controlled" value="5" />
      </div>
      </div>
      <div className="Opinion__Article">lorem ipsum cos tam cos</div>
    </div>
  );
};
