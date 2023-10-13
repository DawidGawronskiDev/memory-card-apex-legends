/* eslint-disable react/prop-types */
import { useState } from "react";

import Tilt from "react-parallax-tilt";
import cardBackground from "/images/card-background.png";
import Logo from "/images/logo.png";

import "../styles/Card.css";

export default function Card({ character }) {
  const [isFlipped, setIsFlipped] = useState(false);

  function handleClick() {
    setIsFlipped(!isFlipped);
  }

  return (
    <div className="card-wrapper" onClick={handleClick}>
      <Tilt className="card" flipHorizontally={isFlipped}>
        {!isFlipped ? <CardFront character={character} /> : <CardBack />}
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
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.20) 0%, rgba(0, 0, 0, 0.30) 100%), url(${cardBackground})`,
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
          backgroundImage: `linear-gradient(0deg, rgba(0, 0, 0, 0.80) 0%, rgba(0, 0, 0, 0.50) 100%), url(${cardBackground})`,
        }}
      />
      <img src={Logo} alt="" />
    </>
  );
}
