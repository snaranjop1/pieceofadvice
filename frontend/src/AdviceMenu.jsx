import React, { useState } from "react";
import "./AdvicePage.css";

const AdviceMenu = props => {
  let [clicked, setClicked] = useState(false);
  let [clickedMenu, setClickedMenu] = useState(false);
  let [menuType, setMenuType] = useState("none");

  const toggleMenu = () => {
    setClickedMenu(!clickedMenu);
    setClicked(!clicked);
  };

  const toggleMenuType = type => {
    setMenuType(type);
  };

  const renderMenuType = () => {
    console.log("clicked, clickedMenu", clicked, clickedMenu);
    if (clicked & clickedMenu) {
      if (menuType === "music") {
        return renderMusicMenu();
      } else if (menuType === "text") {
        return renderTextMenu();
      } else if (menuType === "movie") {
        return renderMovieMenu();
      } else if (menuType === "poem") {
        return renderPoemMenu();
      } else {
        return;
      }
    }
  };

  const fullMenu = () => {
    return (
      <div className="row" id="add-menu-div">
        <div className="col-2" id="text-div">
          <input
            type="image"
            name="submit"
            src="./text-menu.png"
            border="0"
            alt="Submit"
            className="menu-btn"
            onClick={() => toggleMenuType("text")}
          />
        </div>
        <div className="col-2" id="music-div">
          <input
            type="image"
            name="submit"
            src="./music-menu.png"
            border="0"
            alt="Submit"
            className="menu-btn"
            onClick={() => toggleMenuType("music")}
          />
        </div>
        <div className="col-2" id="movie-div">
          <input
            type="image"
            name="submit"
            src="./poem-menu.png"
            border="0"
            alt="Submit"
            className="menu-btn"
            onClick={() => toggleMenuType("movie")}
          />
        </div>
        <div className="col-2" id="poem-div">
          <input
            type="image"
            name="submit"
            src="./movie-menu.png"
            border="0"
            alt="Submit"
            className="menu-btn"
            onClick={() => toggleMenuType("poem")}
          />
        </div>
        <div className="col-2" id="text-div">
          <input
            type="image"
            name="submit"
            src="./minus-menu.png"
            border="0"
            alt="Submit"
            className="menu-btn"
            onClick={toggleMenu}
          />
        </div>
      </div>
    );
  };

  const smallMenu = () => {
    return (
      <div className="col" id="add-menu-div">
        <input
          type="image"
          name="submit"
          src="./add-menu.png"
          border="0"
          alt="Submit"
          className="menu-btn"
          onClick={toggleMenu}
        />
      </div>
    );
  };

  const renderMenu = () => {
    return clicked ? fullMenu() : smallMenu();
  };

  const renderTextMenu = () => {
    return (
      <div id="text-menu">
        <div>
          <div id="text-area-div">
            <textarea id="text-area" rows="5" cols="20" maxLength="100" />
          </div>
          <input
            type="button"
            className="btn btn-warning"
            id="add-advice-btn"
            value="ADD"
          />
        </div>
      </div>
    );
  };

  const renderMovieMenu = () => {
    return (
      <div id="movie-menu">
        <div>
          <div id="text-area-div">
            <input
              type="text"
              className="input-text-area"
              id="movie-name-area"
              placeholder="Name"
            />
            <input
              type="text"
              className="input-text-area"
              id="movie-year-area"
              placeholder="YYYY"
            />
          </div>
          <input
            type="button"
            className="btn btn-warning"
            id="add-advice-btn"
            value="ADD"
          />
        </div>
      </div>
    );
  };

  const renderPoemMenu = () => {
    return (
      <div id="poem-menu">
        <div>
          <div id="text-area-div">
            <input
              type="text"
              className="input-text-area"
              id="poem-name-area"
              placeholder="Name"
            />
            <input
              type="text"
              className="input-text-area"
              id="poem-author-area"
              placeholder="Author"
            />
          </div>
          <input
            type="button"
            className="btn btn-warning"
            id="add-advice-btn"
            value="ADD"
          />
        </div>
      </div>
    );
  };

  const renderMusicMenu = () => {
    return (
      <div id="music-menu">
        <div>
          <div id="text-area-div">
            <input
              type="text"
              className="input-text-area"
              id="music-name-area"
              placeholder="Name"
            />
            <input
              type="text"
              className="input-text-area"
              id="music-author-area"
              placeholder="Artist"
            />
          </div>
          <input
            type="button"
            className="btn btn-warning"
            id="add-advice-btn"
            value="ADD"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="menu-container">
      {renderMenuType()}
      <div className="row">{renderMenu()}</div>
    </div>
  );
};

export default AdviceMenu;
