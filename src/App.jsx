/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import Loading from "./components/Loading";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetch("/data.json").then((resp) => resp.json());
        setData(data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, []);

  return data ? (
    <ul className="card-list">
      {data.characters.map((character) => (
        <Card key={character.name} character={character} />
      ))}
    </ul>
  ) : (
    <Loading />
  );
}

export default App;
