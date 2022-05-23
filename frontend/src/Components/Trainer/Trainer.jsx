import "./Trainer.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { useNavigate } from "react-router-dom";

export const Trainer = (props) => {
  const navigate = useNavigate();
  const switchToDetails = () => navigate(`/trainerdetails/${props.id}`);
  console.log(props);
  return (
    <div className="Trainers--midContainer__trainer">
      <div className="midContainer__trainer--Avatar">
        <img src={pudzilla} alt="pudzilla" />
      </div>
      <div className="trainer--Title">
        {props.first_name} {props.last_name}
      </div>
      <div className="trainer--Stars">gwiazdki</div>
      <button
        type="submit"
        className="trainersbutton"
        onClick={switchToDetails}
      >
        Odwiedź profil trenera
      </button>
    </div>
  );
};
