/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import Loading from "./components/Loading";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/data.json").then((resp) => resp.json());
        setCharacters(getCharacters(data, 5));
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();

    return () => {};
  }, []);

  console.log(characters);

  function getCharacters(data, length) {
    const charactersArr = [];
    let allCharacters = data.characters;

    for (let i = 0; i < length; i++) {
      const randomCharacter = Math.floor(Math.random() * allCharacters.length);
      charactersArr.push(allCharacters[randomCharacter]);
      allCharacters = allCharacters.filter(
        (character) => character.name !== allCharacters[randomCharacter].name
      );
    }

    return charactersArr;
  }

  return data ? (
    <ul className="card-list">
      {characters.map((character) => (
        <Card key={character.name} character={character} />
      ))}
    </ul>
  ) : (
    <Loading />
  );
}

export default App;
