import axios from "axios";
import { useEffect, useState } from "react";
import "./index.css";

export const Description = ({ id }) => {
  const api_key = "AIzaSyBHWijsHOKic7SKMRPNiAbK6yp2Oshljtc";

  const second_api_key = "AIzaSyAPHycMZi1eVvmFqvTA4zZdT37GlFBvhVY";

  const [data, setData] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [channelInfo, setChannelInfo] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${id}&key=${api_key}`
      )
      .then((res) => {
        setData(res.data.items);
        setChannelId(res.data.items[0].snippet.channelId);
      });
  }, [id]);

  console.log(data);

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&part=statistics%20&id=${channelId}&key=${second_api_key}`
      )
      .then((res) => {
        setChannelInfo(res.data.items);
      });
  }, [channelId]);

  return (
    <div className="info-container">
      {data?.map((item) => {
        return (
          <>
            <h3>{item.snippet.title}</h3>

            <div>
              {channelInfo?.map((channel) => {
                return (
                  <nav className="nav-channel">
                    <img
                      width={40}
                      height={40}
                      src={channel.snippet.thumbnails.default.url}
                      alt="channel-logo"
                    />
                    <div className="channel-actions">
                      <div className="div-channel-info">
                        <p className="p-channel-title">
                          {channel.snippet.title}
                        </p>
                        <p className="p-channel-subscriberCount">
                          {channel.statistics.subscriberCount} inscritos
                        </p>
                      </div>

                      <button className="follow-button">Increver-se</button>
                    </div>
                  </nav>
                );
              })}
            </div>
            <div className={viewMore ? "video-info-full" : "video-info"}>
              <p
                className={
                  viewMore ? "p-description-full" : "p-description-video"
                }
              >
                {item.snippet.description}
              </p>
              <a
                onClick={() => {
                  setViewMore(!viewMore);
                }}
                className="button-view-more"
              >
                {viewMore ? "Ver menos..." : "Ver mais..."}
              </a>
            </div>
          </>
        );
      })}
    </div>
  );
};
