import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import "./style.css";
import { useState } from "react";

export const Header = ({ id, setId }) => {
  const [inputId, setInputid] = useState("");

  return (
    <header>
      <div className="header-container">
        <nav className="nav-logo">
          <RxHamburgerMenu size={21} />
          <img width={90} src={logo} alt="youtube-logo" />
        </nav>

        <div className="div-input">
          <input
            className="input-search"
            type="text"
            value={inputId}
            onChange={(e) => {
              setInputid(e.target.value);
            }}
            name="search"
            id="input-search"
          />
          <div className="search-button">
            <AiOutlineSearch
              size={22}
              onClick={() => {
                setId(inputId);
                setInputid("");
              }}
            />
          </div>
        </div>

        <nav className="nav-user">
          <AiOutlineVideoCameraAdd size={21} />
          <IoNotificationsOutline size={21} />
          <img src={user} alt="user-logo" width={30} />
        </nav>
      </div>
    </header>
  );
};
