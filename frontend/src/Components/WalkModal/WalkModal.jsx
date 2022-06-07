import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import "./WalkModal.scss";

export const WalkModal = (props) => {
  const navigate = useNavigate();
  const switchToDetails = () => navigate(`/walkdetails/${props.id}`);
  const [walk, setWalk] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`/walks/active/${sessionStorage.getItem("user")}`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setWalk(
          res.data.filter(
            ({ id }) => +`${sessionStorage.getItem("user")}` === id
          )
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  console.log(walk);

  return (
    <div className="WalkModal">
      <div className="walk-date">{props.date}</div>
      <div className="walk-time">{props.start_time + " " + props.end_time}</div>
      <div className="walk-trainer">{props.trainer}</div>
      <div className="walk-details" onClick={switchToDetails}>
        Szczegóły..
      </div>
    </div>
  );
};
