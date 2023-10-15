/* eslint-disable react/prop-types */
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
      <img src={`/images/${difficulty}-image.png`} alt="" />
      <span>{difficulty}</span>
    </div>
  );
}
