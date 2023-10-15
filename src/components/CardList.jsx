/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect } from "react";
import Card from "./Card";

export default function CardList({
  characters,
  handleCardClick,
  flipCards,
  areFlipped,
}) {
  useEffect(() => {
    setTimeout(() => {
      flipCards();
    }, 500);
  }, []);

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
