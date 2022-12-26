import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../services/api";
import { Cards } from "../cards";
import "./style.css";

export const ColumnVideos = () => {
  const [relatedVideos, setRelatedVideos] = useState([]);

  const api_key = "AIzaSyD-6549T79-4njzjcwnUw3SwhVEOx1M5c8";

  function getRelatedVideos() {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&regionCode=br&maxResults=20&relatedToVideoId=f5lX2Len6ys&type=video&key=${api_key}`
      )
      .then((res) => setRelatedVideos(res.data.items));
  }

  useEffect(() => {
    getRelatedVideos();
  }, []);

  console.log(relatedVideos);

  return (
    <div className="column-videos">
      <div className="column-buttons">
        <button>Todos</button>
        <button>Avatar</button>
        <button>Relacionados</button>
        <button>de omeleteve</button>
      </div>
      <div className="div-related">
        {relatedVideos.map((video) => {
          return (
            <Cards
              thumb={video.snippet.thumbnails.medium.url}
              title={video.snippet.title}
              channel_name={video.snippet.channelTitle}
              id={video.id.videoId}
            />
          );
        })}
      </div>
    </div>
  );
};
