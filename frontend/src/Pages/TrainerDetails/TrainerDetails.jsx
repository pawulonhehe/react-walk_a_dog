import { useState, useEffect } from "react";
import "./TrainerDetails.scss";
import pudzilla from "../../Assets/Images/pudzilla.jpg";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { Opinion } from "../../Components/Opinion/Opinion";
import { RateTrainer } from "../../Components/RateTrainer/RateTrainer";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const TrainerDetails = (props, route) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState([]);
  const token = sessionStorage.getItem("token");

  const switchToBook = () => navigate("/bookwalk");
  const switchToHist = () => navigate("/trainerdetailshist");

  const [showR, setOpenR] = useState(false);
  const handleOpenR = () => setOpenR(true);
  const handleCloseR = () => setOpenR(false);

  const userId = location.state.userId;



  useEffect(() => {
    axios
      .get(`/trainers/${userId}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setUser(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);


  return (
    <div className="TrainerDetails">
      <div className="TrainerDetails--topText">Szczegóły trenera</div>
      <div className="TrainerDetails--topCointainer">
        <div className="topContainer--Title">
          {user.first_name + " " + user.last_name}
          </div>
        <div className="topContainer--Stars">
          <Rating name="simple-controlled" value="5" />
        </div>
        <div className="topContainer--LData">
          wiek<br></br>płeć<br></br>doświadczenie<br></br>dostępność
        </div>
        <div className="topContainer--RData">
          25 lat<br></br>mężczyzna<br></br>3 lata<br></br>sloty
        </div>
        <div className="topContainer--Avatar">
          <img src={pudzilla} alt="pudzilla" />
        </div>
      </div>

      <button className="rateButton" type="button" onClick={handleOpenR}>
        Oceń
      </button>
      <RateTrainer open={showR} onClose={handleCloseR} />

      <div className="TrainerDetails--MidContainer">
        <div className="MidContainer--Title">Opinie na temat trenera</div>
        <div className="opinions">
          <Opinion />
          <Opinion />
          <Opinion />
          <Opinion />
          <Opinion />
        </div>
      </div>
      <div className="TrainerDetails--BottomContainer">
        <button
          type="submit"
          className="BottomContainer--lbutton"
          onClick={switchToBook}
        >
          Rezerwuj
        </button>
      </div>
    </div>
  );
};
