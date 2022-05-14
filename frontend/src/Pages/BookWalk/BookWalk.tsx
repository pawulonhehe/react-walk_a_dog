import React from "react";
import "./BookWalk.scss";
import { Icon } from "@iconify/react";
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
      <div className="BookWalk--availableWalks">
        <span>poniedziałek, 7 marca 2022</span>
        <div className="BookWalk--availableWalksChoose">
          <div>
            10:00 <br></br>
            11:00
          </div>
          <div className="line"></div>
          <div className="BookWalk--box">
            <div className="BookWalk--info">
              <h5>Spacer</h5>
              <span>Jacek Szyuła</span>
              <div>
                <Icon icon="material-symbols:sound-detection-dog-barking" />3
                wolnych
              </div>
            </div>
            <div className="BookWalk--button">
              <button>Zapisz się</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
