import { useState, useEffect } from "react";

import "./MyOpinions.scss";
import { Opinion } from "../../../Components/Opinion/Opinion";
import axios from "axios";



export const MyOpinions = () => {

  const userId = sessionStorage.getItem("user");
  const token = sessionStorage.getItem("token");
  const [trainerReview, setTrainerReview] = useState([]);


  useEffect(() => {
    axios
      .get(`/trainers/${userId}/reviews/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        sessionStorage.setItem("data", JSON.stringify(res.data));

        const ratingData = res.data;


        setTrainerReview(ratingData);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);

  return (
    <div className="MyOpinions">
      <div className="MyOpinions--title">Moje opinie</div>
      <div className="MyOpinions--subtitle">
        zobaczysz tutaj wystawione przez klientów opinie na swój temat
      </div>
      <div className="MyOpinions--container">
        {trainerReview.map( review => (
            <Opinion {...review}/>
        ))}
        
      </div>
    </div>
  );
};
