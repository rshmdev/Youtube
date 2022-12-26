import { useState } from "react";
import "./App.css";
import { ColumnVideos } from "./components/columnVideos";
import { Header } from "./components/header";
import { Player } from "./components/player";

function App() {
  const [id, setId] = useState("");

  return (
    <>
      <Header />
      <div className="App">
        <Player />
        <ColumnVideos />
      </div>
    </>
  );
}

export default App;
