import logo from "../../assets/logo.png";
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

  const lightTheme = {
    background: "white",
    text: "black",
    button: "rgba(0, 0, 0, 0.05)",
    color: "rgba(255, 255, 255, 1)",
    boxShadow: "-13px 0px 40px 20px var(--color)",
    buttonHover: "rgba(0, 0, 0, 0.05)",
    followButton: "black",
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
    followButton: "white",
    description: "#383838",
    followbuttonText: "#212121",
    header: "black",
  };

  //custom hook
  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size
      handleResize();

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return windowSize;
  }

  const { width } = useWindowSize();

  //condição para renderizar header diferente abaixo de 660px
  useEffect(() => {
    if (width > 660) {
      setSearch(false);
    }
  }, [width]);

  {
    return search ? (
      <header>
        <div className="header">
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
          <DarkTheme light={lightTheme} dark={darkTheme} />
        </div>
      </header>
    ) : (
      <header>
        <div className={"header"}>
          <nav className="header__nav__logo">
            <RxHamburgerMenu size={21} />
            <img width={90} src={logo} alt="youtube-logo" />
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
          <DarkTheme light={lightTheme} dark={darkTheme} />
          <nav className="header__nav__user">
            <AiOutlineVideoCameraAdd size={21} />
            <IoNotificationsOutline size={21} />
            <img src={user} alt="user-logo" width={30} />
          </nav>

          <nav className="header__nav__user__mobile">
            <BsThreeDotsVertical size={21} />
          </nav>
        </div>
      </header>
    );
  }
};
