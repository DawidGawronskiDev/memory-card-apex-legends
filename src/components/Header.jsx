import Logo from "/images/logo.png";
import ScoreIcon from "/images/score-icon.png";
import BestscoreIcon from "/images/bestscore-icon.png";

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
