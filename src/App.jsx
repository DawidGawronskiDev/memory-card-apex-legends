import { useState, useEffect, useRef } from "react";

import Loading from "./components/Loading";
import Difficulity from "./components/Difficulty";
import Header from "./components/Header";
import CardList from "./components/CardList";
import Finish from "./components/Finish";

import "./styles/App.css";
import "./styles/VideoBackground.css";

function App() {
  const [data, setData] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [foundCharacters, setFoundCharacters] = useState([]);
  const [areFlipped, setAreFlipped] = useState(true);
  const [clickedCard, setClickedCard] = useState(null);
  const [difficulty, setDifficulty] = useState(0);
  const [score, setScore] = useState(0);
  const [bestscore, setBestscore] = useState(0);
  const [finish, setFinish] = useState(null);

  const whoooshRef = useRef(null);
  const killRef = useRef(null);
  const startRef = useRef(null);
  const loseRef = useRef(null);

  const playAudio = (ref) => {
    const audioFile = ref;
    audioFile.current.play();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/data.json").then((resp) => resp.json());
        setCharacters(getCharacters(data.characters, difficulty));
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [difficulty]);

  useEffect(() => {
    function updateBestscore() {
      setBestscore(score);
    }

    score > bestscore && updateBestscore();
  }, [score, bestscore]);

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

  function flipCards(value) {
    setAreFlipped(value);
    playAudio(whoooshRef);
  }

  function handleFinish(value) {
    setFinish(value);
  }

  function handleCardClick(character) {
    if (foundCharacters.indexOf(character) === -1 && !areFlipped) {
      setFoundCharacters([...foundCharacters, character]);
      flipCards(true);
      setClickedCard(character);

      setScore(score + 1);
      playAudio(killRef);

      setTimeout(() => {
        flipCards(false);
        setClickedCard(null);
        setCharacters(getCharacters(characters, difficulty));
      }, 500);
    }

    // LOSE CASE
    if (foundCharacters.indexOf(character) !== -1) {
      playAudio(loseRef);
      handleFinish("lose");
    }

    if (foundCharacters.length === difficulty - 1) {
      handleFinish("win");
    }
  }

  function newGame() {
    setCharacters(getCharacters(data.characters, difficulty));
    setFoundCharacters([]);
    setAreFlipped(true);
    setClickedCard(null);
    setScore(0);
    setFinish(null);
    playAudio(startRef);
  }

  function showDifficulty() {
    setDifficulty(0);
    newGame();
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
    playAudio(startRef);
  }

  return data ? (
    <>
      {difficulty == 0 ? (
        <Difficulity changeDifficulty={changeDifficulty} />
      ) : (
        <>
          <Header score={score} bestscore={bestscore} />
          {!finish ? (
            <CardList
              characters={characters}
              handleCardClick={handleCardClick}
              flipCards={flipCards}
              areFlipped={areFlipped}
              clickedCard={clickedCard}
            />
          ) : (
            <Finish
              value={finish}
              newGame={newGame}
              showDifficulty={showDifficulty}
            />
          )}
        </>
      )}
      <VideoBackground />
      <audio ref={whoooshRef}>
        <source src="/sounds/whooosh.wav" type="audio/mpeg" />
      </audio>
      <audio ref={killRef}>
        <source src="/sounds/kill.wav" type="audio/mpeg" />
      </audio>
      <audio ref={startRef}>
        <source src="/sounds/start.wav" type="audio/mpeg" />
      </audio>
      <audio ref={loseRef}>
        <source src="/sounds/lose.wav" type="audio/mpeg" />
      </audio>
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
