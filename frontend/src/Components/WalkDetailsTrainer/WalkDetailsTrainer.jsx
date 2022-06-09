import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./WalkDetailsTrainer.scss";
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

const WalkDetailsTrainer = (props) => {


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
            {/* <p>
              Data: {getDate()}
          
            </p>
            <p> Trener: {props.trainer ? props.trainer.first_name : ''} {" "}
            {props.trainer ? props.trainer.last_name : ''} </p>
            <p> Psy: {props.dogs ? props.dogs.map(d => d.name).join(', ') : ''}</p>
            <p> Odbiór psa: {props.end_time}</p>
            <p> Aleja Warszawska 107 - Parking</p> */}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default WalkDetailsTrainer;
