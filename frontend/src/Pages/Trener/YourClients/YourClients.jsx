import React, { useEffect, useState } from "react";
import "./YourClients.scss";
import pudzilla from "../../../Assets/Images/pudzilla.jpg";
import pies from "../../../Assets/Images/pies.jpg";
import axios from "axios";
import ClientDetails from "../../../Components/ClientDetails/ClientDetails";

export const YourClients = () => {
  const [clients, setClients] = useState([]);
  const token = sessionStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);


  useEffect(() => {
    axios
      .get("/walks", {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setClients(
          res.data.filter(
            ({ trainer }) => +`${sessionStorage.getItem("user")}` === trainer.id
          )
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  console.log(clients);

  return (
    <div className="Clients">
      <div className="Clients--topText">Twoi Klienci</div>
      <div className="Clients--clientsContainer">
        {clients.map((client) => (
          <div className="Clients--oneClient">
            <div className="Clients--oneClient__avatar">
              <img src={pudzilla} alt="pudzilla" />
            </div>
            <div className="Clients--oneClient__infoCointainer">
              <div className="oneClient__infoContainer__title">
                {client.trainer.first_name + " " + client.trainer.last_name}
              </div>
              <div className="oneClient__infoContainer__dogs">
                <img src={pies} alt="pies" className="imgpies" />
                <img src={pies} alt="pies" className="imgpies" />
              </div>
              <button type="submit" className="ZobaczZlecenie" onClick={handleOpen}>
                Zobacz zlecenie
              </button>
              <ClientDetails open={open} onClose={handleClose}  />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
