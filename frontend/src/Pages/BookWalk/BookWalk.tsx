import React from "react";
import "./BookWalk.scss";
// import { Link } from "react-router-dom";

export const BookWalk = () => {
  return (
    <div className="BookWalk">
      <div className="BookWalk--topText">
        <h3>Rezerwuj spacer</h3>
      </div>
      <div className="BookWalk--select">
        <div className="BookWalk--select">
          <span>Wybierz datę</span>
          <select name="" id=""></select>
        </div>
        <div className="BookWalk--select">
          <span>Trener</span>
          <select name="" id=""></select>
        </div>
        <div className="BookWalk--select">
          <span>Wybierz psy</span>
          <select name="" id=""></select>
        </div>
      </div>
    </div>
  );
};
