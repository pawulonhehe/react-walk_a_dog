import React from "react";
import "./MyOpinions.scss";
import { Opinion } from "../../../Components/Opinion/Opinion";

export const MyOpinions = () => {
  return (
    <div className="MyOpinions">
      <div className="MyOpinions--title">Moje opinie</div>
      <div className="MyOpinions--subtitle">
        zobaczysz tutaj wystawione przez klientów opinie na swój temat
      </div>
      <div className="MyOpinions--container">
        <Opinion />
      </div>
    </div>
  );
};
