import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { RiShareForwardLine } from "react-icons/ri";
import { HiOutlineScissors, HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdPlaylistAdd } from "react-icons/md";
import "./index.css";

export const Description = ({ id, setTags }) => {
  const [data, setData] = useState([]);
  const [channelId, setChannelId] = useState("");
  const [channelInfo, setChannelInfo] = useState([]);
  const [viewMore, setViewMore] = useState(false);

  useEffect(() => {
    if (id === "") {
      return alert("Digite algum id");
    }
    axios
      .get(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet&part=statistics&id=${id}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_FIRST}`
      )
      .then((res) => {
        setData(res.data.items);
        setChannelId(res.data.items[0]?.snippet.channelId);
        setTags(res.data.items[0]?.snippet.tags);
      });
  }, [id]);

  useEffect(() => {
    if (channelId) {
      axios
        .get(
          `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails&part=statistics%20&id=${channelId}&key=${process.env.REACT_APP_YOUTUBE_API_KEY_SECOND}`
        )
        .then((res) => {
          setChannelInfo(res.data.items);
        })
        .catch((err) => alert("Id nao encontrado"));
    }
  }, [channelId]);

  function formatSubscriberCount(subscriberCount) {
    if (subscriberCount >= 1000000) {
      const millions = (subscriberCount / 1000000).toFixed(1).replace(".", ",");
      return millions + " mi de inscritos";
    } else if (subscriberCount >= 1000) {
      const thousands = (subscriberCount / 1000).toFixed(1).replace(".", ",");
      return thousands + " mil de inscritos";
    } else {
      return subscriberCount + " inscritos";
    }
  }

  function formatLikeCount(likeCount) {
    if (likeCount >= 1000000) {
      const millions = (likeCount / 1000000).toFixed();
      return millions + " mi";
    } else if (likeCount >= 1000) {
      const thousands = (likeCount / 1000).toFixed();
      return thousands + " mil";
    } else {
      return likeCount;
    }
  }

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  }

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
                      width={45}
                      height={45}
                      src={channel.snippet.thumbnails.default.url}
                      alt="channel-logo"
                    />
                    <div className="channel__info">
                      <div className="channel__info__container">
                        <p className="channel__info__title">
                          {truncateText(channel.snippet.title, 20)}
                        </p>
                        <p className="channel__info__subscriberCount">
                          {formatSubscriberCount(
                            channel.statistics.subscriberCount
                          )}
                        </p>
                      </div>

                      <button className="channel__follow__button">
                        <span>Increver-se</span>
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
                      {data.map((like) =>
                        formatLikeCount(like.statistics.likeCount)
                      )}
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
                <button
                  onClick={() => {
                    setViewMore(!viewMore);
                  }}
                  className="video__description__button__viewMore"
                >
                  {viewMore ? "Ver menos..." : "Ver mais..."}
                </button>
              </div>
            </div>
          </>
        );
      })}
    </div>
  );
};
