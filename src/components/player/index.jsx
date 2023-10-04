import "./index.css";

export const Player = ({ id, isTheater, setIsTheater }) => {
  return (
    <div className="video-container">
      <button
        onClick={() => {
          setIsTheater(!isTheater);
        }}
        className="theater-btn"
      >
        {isTheater ? (
          <svg className="wide" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6z"
            />
          </svg>
        ) : (
          <svg className="tall" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M19 6H5c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H5V8h14v8z"
            />
          </svg>
        )}
      </button>

      <iframe
        width="100%"
        height="680"
        id="video"
        seamless="seamless"
        sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-presentation"
        src={`https://www.youtube.com/embed/${id}?autoplay=1&mute=1?enablejsapi=1`}
        allow="autoplay"
        title="Choice | Nicole pt. Xamã (CLIPE OFICIAL)"
        allowFullScreen
      />
    </div>
  );
};
