import { useState, useEffect } from "react";
import "./WalkHistory.scss";
import moment from "moment";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import BasicModal from "../BasicModal/BasicModal";
import { RateTrainer } from "../RateTrainer/RateTrainer";
import axios from "axios";


export const WalkHistory = (props) => {
  const token = sessionStorage.getItem("token");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);
  const [user, setUser] = useState();

  const [imageUrl, setImageUrl] = useState("pudzilla");


  useEffect(() => {
    axios
      .get(`/users/${props.trainer.id}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setUser(res.data);
        setImageUrl(res.data.image ? res.data.image : "pudzilla")
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);


  return (
    <div className="Reservations--incomingResList">
      <div className="Reservations--hisDate">
        <div className="Reservations--dateWeek">
          {moment(props.date).locale("pl").format("dddd")}
        </div>
        <div className="Reservations--dateTime">
          {moment(props.date).locale("pl").format("DD MMM") +
            " " +
            props.start_time.substr(0, 5)}
        </div>
      </div>
      <p className="dot"></p>
      <div className="Reservations--hisReservation">
        <div className="Reservations--bottomInfo">
          <div className="Reservations--Avatar">
            <img src={imageUrl} alt="awatar" />
            {/* <img src={props.trainer.image} alt="awatar" /> */}
          </div>
          <div>
            {props.trainer.first_name + " " + props.trainer.last_name}
            <br></br> {props.dogs.map((d) => d.name).join(", ")}
          </div>
        </div>
        <div className="Reservations--infoButtons">
          <button type="button" onClick={handleOpen}>
            Szczegóły
          </button>
          <BasicModal open={open} onClose={handleClose} {...props} />
          {/* <button type="button" onClick={handleOpenR}>
            Oceń
          </button>
          <RateTrainer open={showR} onClose={handleCloseR} {...props}  /> */}
        </div>
      </div>
    </div>
  );
};
