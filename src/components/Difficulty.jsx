/* eslint-disable react/prop-types */
import CardBackground from "/images/card-background.png";

import "../styles/Difficulty.css";

export default function Difficulty({ changeDifficulty }) {
  return (
    <div className="difficulty">
      <DifficultyContainer
        difficulty="easy"
        changeDifficulty={changeDifficulty}
      />
      <DifficultyContainer
        difficulty="medium"
        changeDifficulty={changeDifficulty}
      />
      <DifficultyContainer
        difficulty="hard"
        changeDifficulty={changeDifficulty}
      />
    </div>
  );
}

function DifficultyContainer({ difficulty, changeDifficulty }) {
  return (
    <div
      className="difficulty-container"
      onClick={() => {
        changeDifficulty(difficulty);
      }}
    >
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
