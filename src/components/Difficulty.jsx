/* eslint-disable react/prop-types */
import CardBackground from "/images/card-background.webp";

import EasyImage from "/images/easy-image.webp";
import MediumImage from "/images/medium-image.webp";
import HardImage from "/images/hard-image.webp";

import "../styles/Difficulty.css";

export default function Difficulty({ changeDifficulty }) {
  return (
    <div className="difficulty">
      <DifficultyContainer
        difficulty="easy"
        imgSrc={EasyImage}
        changeDifficulty={changeDifficulty}
      />
      <DifficultyContainer
        difficulty="medium"
        imgSrc={MediumImage}
        changeDifficulty={changeDifficulty}
      />
      <DifficultyContainer
        difficulty="hard"
        imgSrc={HardImage}
        changeDifficulty={changeDifficulty}
      />
    </div>
  );
}

function DifficultyContainer({ difficulty, changeDifficulty, imgSrc }) {
  return (
    <div
      className="difficulty-container"
      onClick={() => {
        changeDifficulty(difficulty);
      }}
    >
      <img className="card-character" src={imgSrc} alt="" />
      <img className="card-background" src={CardBackground} alt="" />
      <span>{difficulty}</span>
    </div>
  );
}
