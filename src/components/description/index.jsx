import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { HiOutlineScissors, HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdPlaylistAdd } from "react-icons/md";
import "./index.css";

export const Description = ({ id, setTags }) => {
  const api_key_1 = "AIzaSyDMgio7I9wVc8jz6beno8JzXD51NB0JMTU";

  const api_key_2 = "AIzaSyDENgAQrQlTvOVwccptgB-lfO4q5vTRYXU";

  const [data, setData] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [channelInfo, setChannelInfo] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${id}&key=${api_key_1}`
      )
      .then((res) => {
        setData(res.data.items);
        setChannelId(res.data.items[0]?.snippet.channelId);
        setTags(res.data.items[0]?.snippet.tags);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&part=statistics%20&id=${channelId}&key=${api_key_2}`
      )
      .then((res) => {
        setChannelInfo(res.data.items);
      });
  }, [channelId]);

  return (
    <div className="description">
      {data?.map((item) => {
        return (
          <>
            <h3>{item.snippet.title}</h3>

            <div className="video__actions">
              {channelInfo?.map((channel) => {
                return (
                  <nav className="description__nav">
                    <img
                      width={40}
                      height={40}
                      src={channel.snippet.thumbnails.default.url}
                      alt="channel-logo"
                    />
                    <div className="channel__info">
                      <div className="channel__info__container">
                        <p className="channel__info__title">
                          {channel.snippet.title}
                        </p>
                        <p className="channel__info__subscriberCount">
                          {channel.statistics.subscriberCount} inscritos
                        </p>
                      </div>

                      <button className="channel__follow__button">
                        Increver-se
                      </button>
                    </div>
                  </nav>
                );
              })}

              <nav className="nav-action-buttons">
                <div>
                  <button className="button__like">
                    <div className="button__like__div">
                      <AiOutlineLike size={20} />{" "}
                      {data.map((like) => like.statistics.likeCount)}
                    </div>
                    | |
                    <div className="button__deslike__div">
                      <AiOutlineDislike size={20} />
                    </div>
                  </button>
                </div>
                <button className="share__button">
                  <RiShareForwardLine size={20} />
                  Compartilhar
                </button>
                <button className="save__button">
                  <MdPlaylistAdd size={20} />
                  Salvar
                </button>

                <button className="clip__button">
                  <HiOutlineScissors size={20} />
                  Clipe
                </button>
                <button className="menu__button">
                  <HiOutlineDotsHorizontal size={20} />
                </button>
              </nav>
            </div>
            <div
              className={
                viewMore
                  ? "video__description__full__container"
                  : "video__description__container"
              }
            >
              <p
                className={
                  viewMore
                    ? "video__description__full_text"
                    : "video__description__text"
                }
              >
                {item.snippet.description}
              </p>
              <div className="view__more__div">
                <a
                  onClick={() => {
                    setViewMore(!viewMore);
                  }}
                  className="video__description__button__viewMore"
                >
                  {viewMore ? "Ver menos..." : "Ver mais..."}
                </a>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
