import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { Cards } from "../cards";
import "./style.css";

export const ColumnVideos = ({ id, setId, tags }) => {
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);

  const divScroll = document.getElementById("div-scroll");

  function scrollLeft() {
    divScroll.scrollLeft += 120;
  }

  function scrollRight() {
    divScroll.scrollLeft -= 120;
  }

  useEffect(() => {
    divScroll?.addEventListener("scroll", () => {
      if (divScroll?.scrollLeft > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [divScroll]);

  function getRelatedVideos() {
    if (id === "" || tags === undefined) {
      alert("Video não encontrado");
      setId("f5lX2Len6ys");
      return;
    }
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${
          tags[0] ? tags[0] : "omeleteve"
        }&maxResults=20&type=video&key=${
          process.env.REACT_APP_YOUTUBE_API_KEY_THIRD
        }`
      )
      .then((res) => setRelatedVideos(res.data.items))
      .catch((err) => alert("Id nao encontrado"));
  }

  useEffect(() => {
    getRelatedVideos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, tags]);

  return (
    <div className="column-videos">
      <div className="column-buttons">
        <div
          className="left-scroll-icons"
          style={isVisible ? { display: "flex" } : { display: "none" }}
        >
          <AiOutlineLeft onClick={() => scrollRight()} size={23} />
        </div>
        <div
          className="button__tags"
          id="div-scroll"
          style={
            isVisible
              ? { maxWidth: "80%", marginLeft: "2.5rem" }
              : { maxWidth: "91%" }
          }
        >
          <button onClick={() => getRelatedVideos()}>Todos</button>
          {tags?.map((tag) => {
            return (
              <button
                value={tag}
                onClick={(e) => {
                  axios
                    .get(
                      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=${e.target.value}&maxResults=20&type=video&key=${process.env.REACT_APP_YOUTUBE_API_KEY_FOURTH}`
                    )
                    .then((res) => {
                      setRelatedVideos(res.data.items);
                    });
                }}
              >
                {tag}
              </button>
            );
          })}
        </div>
        <div className="rigth-scroll-icons">
          <AiOutlineRight onClick={() => scrollLeft()} size={23} />
        </div>
      </div>
      <div className="div-related">
        {relatedVideos?.map((video) => {
          return (
            <Cards
              thumb={video.snippet.thumbnails.high.url}
              title={video.snippet.title}
              channel_name={video.snippet.channelTitle}
              id={video.id.videoId}
              setId={setId}
            />
          );
        })}
      </div>
    </div>
  );
};
