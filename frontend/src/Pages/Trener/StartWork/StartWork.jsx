import axios from "axios";
import React, { useEffect, useState } from "react";
import { Walk } from "../../../Components/Walk/Walk";
import { ModalAddSlot } from "../../../Components/ModalAddSlot/ModalAddSlot";
import "./StartWork.scss";

export const StartWork = () => {
  const [walk, setWalk] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/walks/", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        console.log(res);
        let data = res.data.filter(
          ({ trainer }) => +`${sessionStorage.getItem("user")}` === trainer.id
        );
        setWalk(data);

      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  console.log(walk);
  return (
    <div className="StartWork">
      <div className="welcomeMessage">Witaj trenerze!</div>
      <div className="startWorkMessage">
        Zadeklaruj swoją dostępność <br></br>
      </div>
      <div className="startWorkMessagePT2">
        za pomocą prostej koncepcji slotów spacerowych
      </div>

      <div className="mainContainer">
        <div className="ContainerTopText">twoje istniejące sloty</div>
        {walk.map((walk) => (
          <Walk {...walk} />
        ))}
        <button className="addWalkButton">Dodaj slot</button>
      </div>
      <ModalAddSlot />
    </div>
  );
};
