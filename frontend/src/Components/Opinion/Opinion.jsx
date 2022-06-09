import React, { useEffect, useState } from "react";
import "./Opinion.scss";
import { Rating, ratingClasses } from "@mui/material";
import axios from "axios";

export const Opinion = (props) => {
  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem("token");

  const userId = props.evaluator;
  useEffect(() => {
    axios
      .get(`/users/${userId}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);


  return (
    <div className="MidContainer--Opinion">
      <div className="flex">
        <div className="Opinion__Title">{user.first_name + " " + user.last_name} </div>
        <div className="Opinion__Stars">
          <Rating name="simple-controlled" value={props.value} />
        </div>
      </div>
      <div className="Opinion__Article">{props.comment}</div>
    </div>
  );
};
