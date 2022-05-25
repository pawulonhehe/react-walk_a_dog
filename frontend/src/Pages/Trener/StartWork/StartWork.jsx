import { Modal } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import "./StartWork.scss";

export const StartWork = () => {
  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    axios
      .get("/trainers/", {
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
    <div className="StartWork">
      <div className="welcomeMessage">Witaj trenerze!</div>
      <div className="startWorkMessage">
        Zadeklaruj swoją dostępność <br></br>
      </div>
      <div className="startWorkMessagePT2">
        za pomocą prostej koncepcji slotów spacerowych
      </div>

      <div className="mainContainer">
        {/* <Modal>Fancy modal</Modal> */}

        {/* ZROBIC MODAL W KTORYM PODAJE DANE NA NOWY WALK
        WYSWIETLANIE ISTNIEJACYCH WALKOW TRENERA */}
        <div className="singleWalk">s</div>
        <button className="addWalkButton">Dodaj slot</button>
      </div>
    </div>
  );
};
