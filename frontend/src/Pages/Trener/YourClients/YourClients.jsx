import React from "react";
import "./YourClients.scss";
import pudzilla from "../../../Assets/Images/pudzilla.jpg";
import pies from "../../../Assets/Images/pies.jpg";
import { useState, useEffect } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";

export const YourClients = () => {

  const [clients, setClients] = useState([]);
  const token = sessionStorage.getItem ("token");

  useEffect(()=> {
    axios
    .get()
  })

  return (
    <div className="Clients">
      <div className="Clients--topText">Twoi Klienci</div>
      <div className="Clients--clientsContainer">
        <div className="Clients--oneClient">
          <div className="Clients--oneClient__avatar">
            <img src={pudzilla} alt="pudzilla" />
          </div>
          <div className="Clients--oneClient__infoCointainer">
            <div className="oneClient__infoContainer__title">Robert Kubica</div>
            <div className="oneClient__infoContainer__dogs">
              <img src={pies} alt="pies" className="imgpies" />
              <img src={pies} alt="pies" className="imgpies" />
            </div>
            <button type="submit" className="ZobaczZlecenie">
              Zobacz zlecenie
            </button>
          </div>
        </div>
        <div className="Clients--oneClient">
          <div className="Clients--oneClient__avatar">
            <img src={pudzilla} alt="pudzilla" />
          </div>
          <div className="Clients--oneClient__infoCointainer">
            <div className="oneClient__infoContainer__title">Robert Kubica</div>
            <div className="oneClient__infoContainer__dogs">
              <img src={pies} alt="pies" className="imgpies" />
              <img src={pies} alt="pies" className="imgpies" />
            </div>
            <button type="submit" className="ZobaczZlecenie">
              Zobacz zlecenie
            </button>
          </div>
        </div>
        <div className="Clients--oneClient">
          <div className="Clients--oneClient__avatar">
            <img src={pudzilla} alt="pudzilla" />
          </div>
          <div className="Clients--oneClient__infoCointainer">
            <div className="oneClient__infoContainer__title">Robert Kubica</div>
            <div className="oneClient__infoContainer__dogs">
              <img src={pies} alt="pies" className="imgpies" />
              <img src={pies} alt="pies" className="imgpies" />
            </div>
            <button type="submit" className="ZobaczZlecenie">
              Zobacz zlecenie
            </button>
          </div>
        </div>
        <div className="Clients--oneClient">
          <div className="Clients--oneClient__avatar">
            <img src={pudzilla} alt="pudzilla" />
          </div>
          <div className="Clients--oneClient__infoCointainer">
            <div className="oneClient__infoContainer__title">Robert Kubica</div>
            <div className="oneClient__infoContainer__dogs">
              <img src={pies} alt="pies" className="imgpies" />
              <img src={pies} alt="pies" className="imgpies" />
            </div>
            <button type="submit" className="ZobaczZlecenie">
              Zobacz zlecenie
            </button>
          </div>
        </div>
        <div className="Clients--oneClient">
          <div className="Clients--oneClient__avatar">
            <img src={pudzilla} alt="pudzilla" />
          </div>
          <div className="Clients--oneClient__infoCointainer">
            <div className="oneClient__infoContainer__title">Robert Kubica</div>
            <div className="oneClient__infoContainer__dogs">
              <img src={pies} alt="pies" className="imgpies" />
              <img src={pies} alt="pies" className="imgpies" />
            </div>
            <button type="submit" className="ZobaczZlecenie">
              Zobacz zlecenie
            </button>
          </div>
        </div>
        <div className="Clients--oneClient">
          <div className="Clients--oneClient__avatar">
            <img src={pudzilla} alt="pudzilla" />
          </div>
          <div className="Clients--oneClient__infoCointainer">
            <div className="oneClient__infoContainer__title">Robert Kubica</div>
            <div className="oneClient__infoContainer__dogs">
              <img src={pies} alt="pies" className="imgpies" />
              <img src={pies} alt="pies" className="imgpies" />
            </div>
            <button type="submit" className="ZobaczZlecenie">
              Zobacz zlecenie
            </button>
          </div>
        </div>
      </div>
      tu jeszcze scroll jakis po prawej dodac trzeba
    </div>
  );
};
