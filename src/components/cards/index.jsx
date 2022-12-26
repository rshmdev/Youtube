import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import "./style.css";

export const Cards = ({ thumb, title, channel_name, id, setId }) => {
  const api_key = "AIzaSyBHWijsHOKic7SKMRPNiAbK6yp2Oshljtc";

  const [views, setViews] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${id}&key=${api_key}`
      )
      .then((res) => {
        setViews(res.data.items);
      });
  }, []);

  function handleClick() {
    setId(id);
  }

  return (
    <div className="card" onClick={handleClick}>
      <div className="card__thumbnail">
        <img
          src={thumb}
          width="100%"
          height="100%"
          className="card__thumbnail__image"
        />
      </div>
      <div className="card__info">
        <div className="card__title">
          <span className="card__title__span">{title}</span>
        </div>
        <div className="card_channel_title">
          <span className="card_channel_title__span">{channel_name}</span>
          <AiFillCheckCircle size={13} />
        </div>

        {views.map((view) => {
          return (
            <span className="card__views">
              {view.statistics.viewCount} views
            </span>
          );
        })}
      </div>
    </div>
  );
};
