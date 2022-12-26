import logo from "../../assets/logo.png";
import user from "../../assets/user.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineSearch, AiOutlineVideoCameraAdd } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import "./style.css";
import { useState } from "react";

export const Header = ({ id, setId }) => {
  const [inputId, setInputid] = useState("");

  return (
    <header>
      <div className="header">
        <nav className="header__nav__logo">
          <RxHamburgerMenu size={21} />
          <img width={90} src={logo} alt="youtube-logo" />
        </nav>

        <div className="header__input">
          <AiOutlineSearch
            className="input__icon__mobile"
            size={22}
            onClick={() => {
              setId(inputId);
              setInputid("");
            }}
          />
          <input
            className="header_input_field"
            type="text"
            value={inputId}
            placeholder="Digite o id do video desejado"
            onChange={(e) => {
              setInputid(e.target.value);
            }}
            name="search"
            id="input-search"
          />
          <div className="header__submit__button">
            <AiOutlineSearch
              size={22}
              onClick={() => {
                setId(inputId);
                setInputid("");
              }}
            />
          </div>
        </div>

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
};
