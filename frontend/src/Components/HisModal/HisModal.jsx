import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import "./HisModal.scss";
import moment from "moment";
import axios from "axios";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  boxShadow: 24,
  p: 4,
};


const HisModal = (props) => {

  const token = sessionStorage.getItem("token");
  
  const [review, setReview] = useState([]);

  let getDate = (date) => {
    if(props.date) {
      let _date =  moment(props.date).locale("pl").format("DD-MM-YYYY")
      let startTime =  props.start_time ? props.start_time.substr(0, 5) : ''

      return ` ${_date} - ${startTime}`
    }


    return ''
  }

  
  useEffect(() => {
    axios
      .get(`/dogs/${props.id}/reviews/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));

        const walkData = res.data;

        setReview(walkData);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  
  
  console.log("id:", props.id)
  console.log(review)

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
            <p>
              Data: {getDate()}
          
            </p>
            <p> Trener: {props.trainer ? props.trainer.first_name : ''} {" "}
            {props.trainer ? props.trainer.last_name : ''} </p>
            <p> Psy: {props.dogs ? props.dogs.map(d => d.name).join(', ') : ''}</p>
            <p> Odbiór psa: {props.end_time ? props.end_time.substr(0, 5) : ''}</p>
            <p> Aleja Warszawska 107 - Parking</p>

            <div className="raport">
                <p> {review.value}</p>
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};
export default HisModal;
