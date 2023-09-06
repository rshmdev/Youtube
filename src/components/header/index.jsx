import logo from "../../assets/logo.png";
import logoDark from "../../assets/logo-dark.svg";

import user from "../../assets/user.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoNotificationsOutline, IoArrowBackCircle } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./style.css";
import { useEffect, useState } from "react";
import DarkTheme from "react-dark-theme";
export const Header = ({ setId }) => {
  const [inputId, setInputid] = useState("");
  const [search, setSearch] = useState(false);
  const [dark, setDark] = useState(false);

  const lightTheme = {
    background: "white",
    text: "black",
    button: "rgba(0, 0, 0, 0.05)",
    color: "rgba(255, 255, 255, 1)",
    boxShadow: "-13px 0px 40px 20px var(--color)",
    buttonHover: "rgba(0, 0, 0, 0.05)",
    followButton: "black",
    borderInput: "#ccc",

    description: "#F2F2F2",
    followbuttonText: "white",
    header: "white",
  };

  const darkTheme = {
    background: "#212121",
    text: "white",
    button: "#FFFFFF1A",
    color: "#212121",
    boxShadow: "-13px 0px 40px 20px var(--color)",
    buttonHover: "#272727",
    followButton: "#383838",
    description: "#383838",
    followbuttonText: "#212121",
    borderInput: "hsl(0, 0%, 18.82%)",
    header: "#212121",
  };

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      window.addEventListener("resize", handleResize);

      handleResize();

      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
  }

  const { width } = useWindowSize();

  useEffect(() => {
    if (width > 660) {
      setSearch(false);
    }
  }, [width]);

  return search ? (
    <header>
      <div className="header" id="header">
        <div className="header__input">
          {search ? (
            <IoArrowBackCircle
              className="input__icon__mobile__back"
              size={40}
              onClick={() => {
                setSearch(!search);
              }}
            />
          ) : (
            <AiOutlineSearch
              className="input__icon__mobile"
              size={22}
              onClick={() => {
                setSearch(!search);
              }}
            />
          )}
          <input
            className="header_input_field"
            style={search ? { display: "flex" } : { display: "none" }}
            type="text"
            value={inputId}
            placeholder="Digite o id do video"
            onChange={(e) => {
              setInputid(e.target.value);
            }}
            name="search"
            id="input-search"
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputId !== "") {
                setId(inputId);
                setInputid("");
              }
            }}
          />

          <AiOutlineSearch
            className="search-icon-mobile-action"
            style={search ? { display: "flex" } : ""}
            size={22}
            onClick={() => {
              setId(inputId);
              setInputid("");
            }}
          />

          <AiOutlineSearch
            className="search-icon"
            size={22}
            onClick={() => {
              setId(inputId);
              setInputid("");
            }}
          />
        </div>
        <button className="dark__toggle" onClick={() => setDark(!dark)}>
          <DarkTheme light={lightTheme} dark={darkTheme} />
        </button>
      </div>
    </header>
  ) : (
    <header>
      <div className={"header"} id="header">
        <nav className="header__nav__logo">
          <RxHamburgerMenu size={22} />
          {dark ? (
            <img width={90} src={logoDark} alt="youtube-logo" />
          ) : (
            <img width={90} src={logo} alt="youtube-logo" />
          )}
        </nav>

        <div className="header__input">
          <AiOutlineSearch
            className="input__icon__mobile"
            size={22}
            onClick={() => {
              setSearch(!search);
            }}
          />
          <input
            className={"header_input_field"}
            type="text"
            value={inputId}
            placeholder="Digite o id do video"
            onChange={(e) => {
              setInputid(e.target.value);
            }}
            name="search"
            id="input-search"
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputId !== "") {
                setId(inputId);
                setInputid("");
              }
            }}
          />

          <AiOutlineSearch
            className="search-icon"
            size={22}
            onClick={() => {
              setId(inputId);
              setInputid("");
            }}
          />
        </div>
        <button className="dark__toggle" onClick={() => setDark(!dark)}>
          <DarkTheme light={lightTheme} dark={darkTheme} />
        </button>
        <nav className="header__nav__user">
          <AiOutlineVideoCameraAdd size={24} />
          <IoNotificationsOutline size={24} />
          <img src={user} alt="user-logo" width={30} />
        </nav>

        <nav className="header__nav__user__mobile">
          <BsThreeDotsVertical size={21} />
        </nav>
      </div>
    </header>
  );
};
