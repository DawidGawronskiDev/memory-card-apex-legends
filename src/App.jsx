import { useState, useEffect } from "react";

import Loading from "./components/Loading";
import Difficulity from "./components/Difficulty";
import CardList from "./components/CardList";

import "./styles/App.css";
import "./styles/VideoBackground.css";

function App() {
  const [data, setData] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [areFlipped, setAreFlipped] = useState(false);
  const [clickedCard, setClickedCard] = useState(null);
  const [difficulty, setDifficulty] = useState(0);
  const [score, setScore] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/data.json").then((resp) => resp.json());
        setCharacters(getCharacters(data.characters, 10));
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  function getCharacters(data, length) {
    const charactersArr = [];
    let allCharacters = data;

    for (let i = 0; i < length; i++) {
      const randomCharacter = Math.floor(Math.random() * allCharacters.length);
      charactersArr.push(allCharacters[randomCharacter]);
      allCharacters = allCharacters.filter(
        (character) => character.name !== allCharacters[randomCharacter].name
      );
    }

    return charactersArr;
  }

  function handleCardClick(character) {
    if (foundCharacters.indexOf(character) === -1 && !areFlipped) {
      setFoundCharacters([...foundCharacters, character]);
      setAreFlipped(true);
      setClickedCard(character);

      setScore(score + 1);
      console.log(score);

      // Use setTimeout to flip the card back after 500ms
      setTimeout(() => {
        setAreFlipped(false);
        setClickedCard(null);
        setCharacters(getCharacters(characters, 10));
      }, 500);
    } else {
      console.log("You lose!");
    }
  }

  function changeDifficulty(difficulty) {
    switch (difficulty) {
      case "easy":
        setDifficulty(5);
        break;
      case "medium":
        setDifficulty(10);
        break;
      case "hard":
        setDifficulty(15);
        break;
    }
  }

  console.log(difficulty);

  return data ? (
    <>
      {difficulty == 0 ? (
        <Difficulity changeDifficulty={changeDifficulty} />
      ) : (
        <ul className="card-list">
          <CardList
            characters={characters}
            handleCardClick={handleCardClick}
            areFlipped={areFlipped}
            clickedCard={clickedCard}
          />
        </ul>
      )}
      <VideoBackground />
    </>
  ) : (
    <Loading />
  );
}

export default App;

function VideoBackground() {
  return (
    <video className="video-background" autoPlay loop muted>
      <source src="/videos/video-background.mp4" type="video/mp4" />
    </video>
  );
}
