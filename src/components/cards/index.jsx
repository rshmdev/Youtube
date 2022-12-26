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
    <div className="card-related" onClick={handleClick}>
      <div className="div-thumb">
        <img src={thumb} width="100%" height="100%" className="thumbnail" />
      </div>
      <div className="div-texts">
        <div className="title">
          <h3 className="p-title">{title}</h3>
        </div>
        <div className="channelTitle">
          <p className="p-channelTitle">{channel_name}</p>
          <AiFillCheckCircle size={13} />
        </div>

        {views.map((view) => {
          return <p className="p-views">{view.statistics.viewCount} views</p>;
        })}
      </div>
    </div>
  );
};
