/* eslint-disable react/prop-types */
import Card from "./Card";

export default function CardList({ characters, handleCardClick, areFlipped }) {
  return (
    <ul className="card-list">
      {characters.map((character) => (
        <Card
          key={character.name}
          character={character}
          handleCardClick={handleCardClick}
          areFlipped={areFlipped}
        />
      ))}
    </ul>
  );
}
