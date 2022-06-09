import axios from "axios";
import React, { useEffect, useState } from "react";
import { TrainerHistWalk } from "../../../Components/TrainerHistWalk/TrainerHistWalk";
import "./TrainerHist.scss";

export const TrainerHist = () => {
  const token = sessionStorage.getItem("token");
  const [walk, setWalk] = useState([]);

  useEffect(() => {
    const getTrainerHistory = async () => {
      const response = await axios.get(
        `/trainers/${sessionStorage.getItem("user")}/walk-history/`,
        {
          headers: {
            Authorization: `Token ${sessionStorage.getItem("token")}`,
          },
        }
      );
      sessionStorage.setItem("data", JSON.stringify(response.data));
      setWalk(response.data);
    };
    getTrainerHistory();
  }, []);

  console.log(walk);
  return (
    <div className="TrainerHist">
      <div className="welcomeMessage">Witaj trenerze!</div>
      <div className="startWorkMessage">
        Tu możesz zobaczyć historię swoich z ostatnich 30 dni
      </div>
      <div className="mainContainer">
        {walk.map((walk) => (
          <TrainerHistWalk {...walk} />
        ))}
      </div>
    </div>
  );
};
