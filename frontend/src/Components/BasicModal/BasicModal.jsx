import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./BasicModal.scss";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  boxShadow: 24,
  p: 4,
};

const BasicModal = (props) => {
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
            <p>Data: 10.03.2022 10:15 </p>
            <p> Trener: Jacek Szyuła</p>
            <p> Trener: Jacek Szyuła</p>
            <p> Odbiór psa: 11:15</p>
            <p> Aleja Warszawska 107 - Parking</p>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default BasicModal;
