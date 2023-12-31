/* eslint-disable react/prop-types */
import WinImage from "/images/win-image.webp";
import LoseImage from "/images/lose-image.webp";

import "../styles/Finish.css";

export default function Finish({ value, newGame, showDifficulty }) {
  return (
    <div className="finish">
      <img src={value === "win" ? WinImage : LoseImage} alt="" />
      <div className="buttons-container">
        <button onClick={newGame}>New game</button>
        <button onClick={showDifficulty}>Change difficulty</button>
      </div>
    </div>
  );
}
