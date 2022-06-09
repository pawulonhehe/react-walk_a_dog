import "./Trainer.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";

export const Trainer = (props) => {
  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");

  const userId = props.id;

  
  const switchToDetails = () =>
    navigate(`/trainerdetails/${props.id}`, {state:{userId: `${props.id}`,}});

    const [trainerRating, setTrainerRating] = useState([]);

    // useEffect(() => {
    //   axios
    //     .get(`/trainers/2/rating/`, {
    //       headers: { Authorization: `Token ${token}` },
    //     })
    //     .then((res) => {
    //       sessionStorage.setItem("data", JSON.stringify(res.data));
  
    //       const ratingData = res.data;
  
    //       setTrainerRating(ratingData);
    //     })
    //     .catch((error) => {
    //       console.log(error.response);
    //     });
    // }, []);


  return (
    <div className="Trainers--midContainer__trainer">
      <div className="midContainer__trainer--Avatar">
        <img src={pudzilla} alt="pudzilla" />
      </div>
      <div className="container">
        <div className="trainer--Title">
          {props.first_name} {props.last_name}
        </div>
        <div className="trainer--Stars">
          <Rating name="simple-controlled" value="5" />
        </div>
        <button
          type="submit"
          className="trainersbutton"
          onClick={switchToDetails}
        >
          Odwiedź profil trenera
        </button>
      </div>
    </div>
  );
};
