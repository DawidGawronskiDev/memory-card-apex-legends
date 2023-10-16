import { useState, useEffect, useRef } from "react";

import Loading from "./components/Loading";
import Difficulity from "./components/Difficulty";
import Header from "./components/Header";
import CardList from "./components/CardList";
import Finish from "./components/Finish";

import "./styles/App.css";
import "./styles/VideoBackground.css";

import BackgroundVideo from "/videos/video-background.mp4";

import WhoooshSound from "/sounds/whooosh.wav";
import KillSound from "/sounds/kill.wav";
import StartSound from "/sounds/start.wav";
import LoseSound from "/sounds/lose.wav";
import WinSound from "/sounds/win.wav";

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
  const winRef = useRef(null);

  const playAudio = (ref) => {
    const audioFile = ref;
    audioFile.current.play();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/memory-card-apex-legends/data.json").then(
          (resp) => resp.json()
        );
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
      setScore(score + 1);
      playAudio(killRef);
  
      if (foundCharacters.length === difficulty - 1) {
        // Handle the win condition first
        handleFinish("win");
        playAudio(winRef);
      } else {
        flipCards(true);
        setTimeout(() => {
          flipCards(false);
          setClickedCard(null);
          setCharacters(getCharacters(characters, difficulty));
        }, 500);
      }
  
      setClickedCard(character);
    } else {
      // LOSE CASE
      handleFinish("lose");
      playAudio(loseRef);
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
        <source src={WhoooshSound} type="audio/mpeg" />
      </audio>
      <audio ref={killRef}>
        <source src={KillSound} type="audio/mpeg" />
      </audio>
      <audio ref={startRef}>
        <source src={StartSound} type="audio/mpeg" />
      </audio>
      <audio ref={loseRef}>
        <source src={LoseSound} type="audio/mpeg" />
      </audio>
      <audio ref={winRef}>
        <source src={WinSound} type="audio/mpeg" />
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
      <source src={BackgroundVideo} type="video/mp4" />
    </video>
  );
}
