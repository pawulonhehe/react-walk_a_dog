import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./WalkDetailsClient.scss";
import moment from "moment";
import GoogleMapReact from "google-map-react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  height: "44%",
  boxShadow: 24,
  p: 4,
};

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const WalkDetailsClient = (props) => {
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
            <div className="walkDetails">
              <p>
                Data: {moment(props.date).locale("pl").format("DD-MM-YYYY")}{" "}
              </p>
              <p>Start: {props.start_time.substr(0, 5)}</p>
              <p> Koniec: {props.end_time.substr(0, 5)}</p>
              <p>
                {" "}
                Psy:{" "}
                {props.dogs ? props.dogs.map((d) => d.name).join(", ") : ""}
              </p>
              <p>Miejsce odbioru psa: Aleja Warszawska 107 - Parking</p>
            </div>
          </Typography>
          <div className="Modal--map">
            <div className="trainer-position">Aktualna pozycja trenera</div>
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
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
export default WalkDetailsClient;
