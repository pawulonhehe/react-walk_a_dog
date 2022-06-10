import React, { useEffect, useState } from "react";
import "./YourClients.scss";
import pudzilla from "../../../Assets/Images/pudzilla.png";
import pies from "../../../Assets/Images/pies.jpg";
import axios from "axios";
import ClientDetails from "../../../Components/ClientDetails/ClientDetails";

export const YourClients = () => {
  const [clients, setClients] = useState([]);
  const [user, setUser] = useState([]);

  const token = sessionStorage.getItem("token");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  // const [imageUrl, setImageUrl] = useState("pudzilla");

  useEffect(() => {
    axios
      .get("/users/", {
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

  console.log(user.is_trainer)
  return (
    <div className="Clients">
      <div className="Clients--topText">Twoi Klienci</div>
      <div className="Clients--clientsContainer">
        {user
        .filter( (user) => 
          user.is_trainer === false
      )
        .map((user) => (
          <div className="Clients--oneClient">
            <div className="Clients--oneClient__avatar">
              <img src={user.image ? user.image : pudzilla} alt="pudzilla" />
            </div>
            <div className="Clients--oneClient__infoCointainer">
              <div className="oneClient__infoContainer__title">
                {user.first_name + " " + user.last_name}

              </div>
              <div className="oneClient__infoContainer__dogs">
                {/* <img src={pies} alt="pies" className="imgpies" />
                <img src={pies} alt="pies" className="imgpies" /> */}
                { user.dogs
                .map(d =>
                  <div className="doggies"> 
                   <p>{d.name + " - " + d.breed}</p> 
                    <p>{d.weight + "kg"} </p>
                    </div>
                 
                 )}
              </div>
              <div>{"Nr tel: " + user.phone_number}</div>
              {/* <button type="submit" className="ZobaczZlecenie" onClick={handleOpen}>
                Zobacz zlecenie
              </button> */}
              <ClientDetails open={open} onClose={handleClose}  />
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
};
