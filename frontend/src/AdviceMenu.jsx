import React, { useState } from "react";
import "./AdvicePage.css";

const AdviceMenu = props => {
  let [clicked, setClicked] = useState(false);
  let [clickedMenu, setClickedMenu] = useState(false);
  let [menuType, setMenuType] = useState("none");
  let [err, setErr] = useState("");
  let [text, setText] = useState("");
  let song_template = "https://open.spotify.com/embed/track/";

  let [name, setName] = useState("");
  let [author, setAuthor] = useState("");

  const fetchPoem = (title, author) => {
    let template_title = "http://poetrydb.org/title/";
    let template_author = "http://poetrydb.org/author/";
    let template_both = "http://poetrydb.org/author,title/";
    let template = "";
    console.log("in");

    if (title === "" && author === "") {
      setErr("You must type either the title or the name of the author!");
      return;
    } else if (title !== "" && author !== "") {
      template = template_both + author + ";" + title;
    } else if (author === "") {
      template = template_title + title;
    } else {
      template = template_author + author;
    }
    fetch(template)
      .then(res => res.json())
      .catch(err => {
        setErr(err, "Not Found");
      })
      .then(data => {
        let advice = {
          type: "poem",
          info: data[0],
          text: text
        };
        console.log(advice);
        props.addAdvice(advice);
      });
  };

  const toggleMenu = () => {
    setClickedMenu(!clickedMenu);
    setClicked(!clicked);
  };

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleAuthorChange = e => {
    setAuthor(e.target.value);
  };

  const toggleMenuType = type => {
    setMenuType(type);
  };

  const renderMenuType = () => {
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
        <div className="col-2" id="poem-div">
          <input
            type="image"
            name="submit"
            src="./poem-menu.png"
            border="0"
            alt="Submit"
            className="menu-btn"
            onClick={() => toggleMenuType("poem")}
          />
        </div>
        <div className="col-2" id="movie-div">
          <input
            type="image"
            name="submit"
            src="./movie-menu.png"
            border="0"
            alt="Submit"
            className="menu-btn"
            onClick={() => toggleMenuType("movie")}
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
              onChange={handleNameChange}
            />
            <input
              type="text"
              className="input-text-area"
              id="poem-author-area"
              placeholder="Author"
              onChange={handleAuthorChange}
            />
          </div>
          <input
            type="button"
            className="btn btn-warning"
            id="add-advice-btn"
            value="ADD"
            onClick={() => fetchPoem(name, author)}
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
