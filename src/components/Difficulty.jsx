/* eslint-disable react/prop-types */
import CardBackground from "/images/card-background.png";

import "../styles/Difficulty.css";

export default function Difficulty() {
  return (
    <div className="difficulty">
      <DifficultyContainer difficulty="easy" />
      <DifficultyContainer difficulty="medium" />
      <DifficultyContainer difficulty="hard" />
    </div>
  );
}

function DifficultyContainer({ difficulty }) {
  return (
    <div className="difficulty-container">
      <img
        className="card-character"
        src={`/images/${difficulty}-image.png`}
        alt=""
      />
      <img className="card-background" src={CardBackground} alt="" />
      <span>{difficulty}</span>
    </div>
  );
}
