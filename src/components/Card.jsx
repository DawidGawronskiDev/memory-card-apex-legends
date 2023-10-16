/* eslint-disable react/prop-types */
import Tilt from "react-parallax-tilt";
import CardBackground from "/images/card-background.webp";
import Logo from "/images/logo.webp";

import "../styles/Card.css";

export default function Card({ character, handleCardClick, areFlipped }) {
  return (
    <div className="card-wrapper" onClick={() => handleCardClick(character)}>
      <Tilt
        className="card"
        flipHorizontally={areFlipped}
        style={{ transform: "rotateX(0deg) rotateY(0deg)" }}
      >
        {areFlipped ? <CardBack /> : <CardFront character={character} />}
      </Tilt>
    </div>
  );
}

function CardFront({ character }) {
  return (
    <>
      <div
        className="card-background"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.30) 100%), url(${CardBackground})`,
        }}
      />
      <div
        className="card-character"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, #000 86.46%, #000 100%), url(${character.image})`,
          mixBlendMode: "overlay",
        }}
      />
      <span className="character-name">{character.name}</span>
    </>
  );
}

function CardBack() {
  return (
    <>
      <div
        className="card-background"
        style={{
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.50) 100%), url(${CardBackground})`,
        }}
      />
      <img src={Logo} alt="" />
    </>
  );
}
