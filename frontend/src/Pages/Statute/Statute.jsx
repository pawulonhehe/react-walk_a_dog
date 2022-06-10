import React from "react";
import { useNavigate } from "react-router";
import "./Statute.scss";

const text =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut efficitur auctor tempus. Mauris tortor nisi, malesuada vitae efficitur vitae, fermentum maximus nunc. Curabitur quis enim et lacus consectetur semper a in metus. Nulla nunc lacus, vulputate iaculis neque non, auctor cursus lacus. Sed interdum ut metus sit amet aliquet. Nulla accumsan velit eget ligula porttitor gravida. Curabitur vitae eros elementum, mollis odio at, efficitur felis. Sed viverra in ex placerat mattis. Suspendisse potenti. Mauris non porttitor lectus. Maecenas ut erat arcu. Praesent finibus nibh vel dui tempor consequat. Cras hendrerit, nisl a aliquet pulvinar, mauris lorem dignissim risus, non rutrum arcu urna non velit. Maecenas egestas ac nunc non pharetra.";

// import { Link } from "react-router-dom";

export const Statute = () => {
  return (
    <div className="Statute">
      <div className="Statute--topText">Regulamin</div>
      <div className="Statute--mainContent">
        <article className="Statute--article">{text}</article>
      </div>
      <div className="Statute--checkmarkContainer">
        <label>
          Zapoznałem się z regulaminem i akceptuję
          <input type="checkbox" id="acceptStatute" />
        </label>
        <button className="Statute--button" type="submit">
          Prześlij
        </button>
      </div>
    </div>
  );
};
