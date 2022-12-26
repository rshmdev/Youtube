import { useState } from "react";
import "./App.css";
import { ColumnVideos } from "./components/columnVideos";
import { Header } from "./components/header";
import { Player } from "./components/player";

function App() {
  const [id, setId] = useState("f5lX2Len6ys");

  return (
    <>
      <Header id={id} setId={setId} />
      <div className="App">
        <Player id={id} />
        <ColumnVideos id={id} />
      </div>
    </>
  );
}

export default App;
