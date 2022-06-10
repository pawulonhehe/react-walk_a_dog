import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./WalkDetailsTrainer.scss";
import moment from "moment";
import GoogleMapReact from "google-map-react";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "40%",
  boxShadow: 24,
  p: 4,
};
const AnyReactComponent = ({ text }) => <div>{text}</div>;
export const WalkDetailsTrainer = (props) => {
  const token = sessionStorage.getItem("token");
  const sendLocByTrainer = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      axios.patch(
        `/walks/${props.id}/`,
        {
          latitude: +position.coords.latitude.toFixed(6),
          longitude: +position.coords.longitude.toFixed(6),
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  };
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="Modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Szczegóły spaceru
          </Typography>
          <Typography
            className="Modal--walkInfo"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            <p>Data: {props.date}</p>
            <p>
              {" "}
              Psy: {props.dogs ? props.dogs.map((d) => d.name).join(", ") : ""}
            </p>
            <p> Odbiór psa: {props.end_time}</p>
            <p> Lokalizacja - Parking</p>
          </Typography>
          <div className="Modal--map">
            <div style={{ height: "20vh", width: "100%" }}>
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: "AIzaSyAyOgCp9cy7G2rg1uP-00bGEpVNKsZ-eek",
                }}
                defaultCenter={{
                  lat: 53.7753,
                  lng: 20.49,
                }}
                defaultZoom={15}
              >
                <div className="pin1" lat={53.7753} lng={20.49}>
                  .
                </div>
                <AnyReactComponent
                  lat={59.955413}
                  lng={30.337844}
                  text="My Marker"
                />
              </GoogleMapReact>
              <button className="loc-trainer-btn" onClick={sendLocByTrainer}>
                Wyślij aktualną lokalizacje
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
