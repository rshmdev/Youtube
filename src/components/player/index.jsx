import { Description } from "../description";
import "./index.css";

export const Player = ({ id }) => {
  return (
    <div className="video-container">
      <iframe
        width="100%"
        height="480"
        id="player"
        src={`https://www.youtube.com/embed/${id}`}
        title="Choice | Nicole pt. Xamã (CLIPE OFICIAL)"
        allowFullScreen
      />
      <div className="video__description">
        <Description id={id} />
      </div>
    </div>
  );
};
