import React, { useState } from "react";
import "./Advice.css";

// sguzmanm: Don´t know why but when trying to create this, it didn´t work
const MovieAdvice = props => {
  let _prop = props.props;
  let user = _prop.user;
  let text = _prop.text;
  let date = _prop.date;
  let info = _prop.info;
  let [height, setHeight] = useState(_prop.height);
  let [likes, setLikes] = useState(_prop.likes);
  let [liked, setliked] = useState(false);

  let template = Math.floor(Math.random() * 3) + 1;
  let cardClass = `card w-100 card-template-${template}`;

  const addLike = () => {
    if (liked) {
      setliked(false);
      setLikes(likes - 1);
      props.updateLikes(props.id, likes - 1);
    } else {
      setliked(true);
      setLikes(likes + 1);
      props.updateLikes(props.id, likes + 1);
    }
  };

  const addText = () => {
    if (text !== "") {
      return <p className="card-text">{text}</p>;
    } else {
      return;
    }
  };

  return (
    <div className={cardClass} style={{ width: "18rem" }}>
      <div className="card-body movie-advice-card-body">
        <h6 className="card-subtitle mb-2 text-muted">{user}</h6>
        <div className="row movie-advice-body">
          {addText()}
          <div className="row">
            <div className="col-6">
              <img src={info.Poster} className="img-movie-body" />
            </div>
            <div className="col-6 movie-plot-col">
              <h4 className="movie-title"> {info.Title} </h4>
              <p className="movie-year">
                <small>{info.Year}</small>
              </p>
              <p className="movie-plot"> {info.Plot} </p>
            </div>
          </div>
        </div>
        <div className="row row-date-likebtn">
          <div className="col-6 col-date-like-btn">
            <p className="card-text">
              <small>{date}</small>
            </p>
          </div>
          <div className="col-6 col-date-like-btn">
            <input
              type="image"
              name="submit"
              src="./heart.png"
              border="0"
              alt="Submit"
              className="like-btn"
              onClick={addLike}
            />
            <span className="like-tag">{likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAdvice;
