import { useState } from "react";
import "./App.css";
import { ColumnVideos } from "./components/columnVideos";
import { Description } from "./components/description";
import { Header } from "./components/header";
import { Player } from "./components/player";

function App() {
  const [id, setId] = useState("f5lX2Len6ys");
  const [tags, setTags] = useState([]);
  const [isTheater, setIsTheater] = useState(false);

  return (
    <>
      <Header setId={setId} />
      <div className="App">
        <div className="Main-div">
          <Player id={id} isTheater={isTheater} setIsTheater={setIsTheater} />
          <div className="video__description">
            <Description id={id} setTags={setTags} />
          </div>
        </div>
        <div className="recommended__videos">
          <ColumnVideos id={id} setId={setId} tags={tags} />
        </div>
      </div>
    </>
  );
}

export default App;
