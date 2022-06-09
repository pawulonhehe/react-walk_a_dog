import "./Trainer.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
export const Trainer = (props) => {
  const navigate = useNavigate();
  
  const switchToDetails = () =>
    navigate(`/trainerdetails/${props.id}`, {state:{userId: `${props.id}`,}});

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
