import axios from "axios";
import React, { useEffect, useState } from "react";
import "./WalkModal.scss";

export const WalkModal = () => {
  const token = sessionStorage.getItem("token");
  const [walk, setWalk] = useState([]);

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
      <div className="walk-date">06.06.2022</div>
      <div className="walk-time">15:00-16:00</div>
      <div className="walk-trainer">Jacek Oooo</div>
      <div className="walk-details">Szczegóły..</div>
    </div>
  );
};
