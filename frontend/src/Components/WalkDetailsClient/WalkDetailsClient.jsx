import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./WalkDetailsClient.scss";
import moment from "moment";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  boxShadow: 24,
  p: 4,
};

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
              <p>Data: {moment(props.date).locale("pl").format("DD-MM-YYYY")} </p>
              <p>Start: {props.start_time.substr(0, 5)}</p>
              <p> Koniec: {props.end_time.substr(0, 5)}</p>
              <p> Psy: {props.dogs ? props.dogs.map(d => d.name).join(', ') : ''}</p>
              <p>Miejsce odbioru psa: Aleja Warszawska 107 - Parking</p>

            </div>
            <div className="map">
              mapa
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default WalkDetailsClient;
