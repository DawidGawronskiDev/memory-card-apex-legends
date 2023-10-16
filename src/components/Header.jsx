/* eslint-disable react/prop-types */
import Logo from "/images/logo.webp";
import ScoreIcon from "/images/score-icon.webp";
import BestscoreIcon from "/images/bestscore-icon.webp";

import "../styles/Header.css";

export default function Header({ score, bestscore }) {
  return (
    <header className="header">
      <img src={Logo} alt="Main Menu" />
      <div className="scoreboard">
        <div className="score">
          <img src={ScoreIcon} alt="score" />
          <span>{score}</span>
        </div>
        <div className="best-score">
          <img src={BestscoreIcon} alt="bestscore" />
          <span>{bestscore}</span>
        </div>
      </div>
    </header>
  );
}
