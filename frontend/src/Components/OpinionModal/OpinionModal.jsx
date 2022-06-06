import React from "react";
import "./OpinionModal.scss";

export const OpinionModal = () => {
  return (
    <div className="OpinionModal">
      <div className="modalTitle">Dzięki za skorzystanie z usługi</div>
      <div className="modalContent">
        <form>
          <label>
            Twoje wnioski i opinie
            <br></br>
            <input type="text" name="opinion" />
          </label>
          <div className="modalStart">tu gwiazdki</div>
          <button type="submit" className="opinionButton">
            Potwierdź
          </button>
        </form>
      </div>
    </div>
  );
};
