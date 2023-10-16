/* eslint-disable react/prop-types */
import WinImage from "/images/win-image.png";
import LoseImage from "/images/lose-image.png";

import "../styles/Finish.css";

export default function Finish({ value }) {
  return (
    <div className="finish">
      <img src={value === "win" ? WinImage : LoseImage} alt="" />
      <div className="buttons-container">
        <button>New game</button>
        <button>Change difficulty</button>
      </div>
    </div>
  );
}
