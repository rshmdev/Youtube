import "./App.css";
import { ColumnVideos } from "./components/columnVideos";
import { Player } from "./components/player";

function App() {
  return (
    <div className="App">
      <Player />
      <ColumnVideos />
    </div>
  );
}

export default App;
