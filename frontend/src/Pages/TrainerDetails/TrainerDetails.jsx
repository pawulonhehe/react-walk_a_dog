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
  const clientId = sessionStorage.getItem("user");
  const [imageUrl, setImageUrl] = useState("pudzilla");

  const switchToBook = () => navigate("/bookwalk/", {
      state: {id: clientId}});

  const switchToHist = () => navigate("/trainerdetailshist");

  const [showR, setOpenR] = useState(false);
  const [btnDisabled, setDisabled] = useState(false)
  const handleOpenR = () => setOpenR(true);
  const handleCloseR = () => setOpenR(false);

  const userId = location.state.userId;
  const [trainerReview, setTrainerReview] = useState([]);
  const [trainerRating, setTrainerRating] = useState([]);

  useEffect(() => {
    axios
      .get(`/trainers/${userId}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));
        setUser(res.data);
        setImageUrl(res.data.image ? res.data.image : pudzilla)
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/trainers/${userId}/reviews/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));

        const ratingData = res.data;

        if (ratingData.map((d) => d.evaluator.toString()).includes(clientId.toString())) {
          setDisabled(true) ;
        }

        setTrainerReview(ratingData);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`/trainers/${userId}/rating/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));

        const rate = res.data;

        setTrainerRating(rate);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  const rateValue = trainerRating.rating ? trainerRating.rating : " ";

  return (
    <div className="TrainerDetails">
      {/* <div className="TrainerDetails--topText">Szczegóły trenera</div> */}
      <div className="TrainerDetails--topCointainer">
        <div className="content">
          <div className="topContainer--Title">
            {user.first_name + " " + user.last_name}
          </div>
          <div className="topContainer--Stars">
            <Rating name="simple-controlled" value={rateValue} />
          </div>
          <div className="info">Doświadczenie: 3 lata</div>
        </div>

        <div className="topContainer--Avatar">
          <img src={imageUrl} alt="pudzilla" />
        </div>
      </div>
      {/* <div className="info">
        
      </div> */}

      <button
        disabled={btnDisabled ? true : false}
        className={btnDisabled ? 'disabledButton' : 'rateButton'}
        // className="rateButton"
        type="button"
        onClick={handleOpenR}
      >
        Oceń
      </button>
      <RateTrainer open={showR} onClose={handleCloseR} {...user} />

      <div className="TrainerDetails--MidContainer">
        <div className="MidContainer--Title">Opinie na temat trenera</div>
        <div className="opinions">
          {trainerReview.map((rating) => (
            <Opinion {...rating} />
          ))}
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
