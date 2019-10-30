import React, { useState } from "react";
import "./Advice.css";

const MovieAdvice = props => {
  let _prop = props.props;
  let user = _prop.user;
  let text = _prop.text;
  let date = _prop.date;
  let info = {
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMTQwMDA5MDY1MV5BMl5BanBnXkFtZTcwMDI2NDIyMQ@@._V1_SX300.jpg",
    Year: "2001",
    Plot: " Helo all",
    /*  "Beautiful and powerful Roman General Eroticus vows revenge after being enslaved by Dickus Gladiator.", */
    Title: "Gladiator Eroticvs: The Lesbian Warriors"
  };
  let [height, setHeight] = useState(_prop.height);
  let [likes, setLikes] = useState(0);
  let [liked, setliked] = useState(false);

  const addLike = () => {
    if (liked) {
      setliked(false);
      setLikes(likes - 1);
    } else {
      setliked(true);
      setLikes(likes + 1);
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
    <div className="card text-white bg-info mb-3" style={{ width: "20rem" }}>
      <div className="card-body movie-advice-card-body">
        <h6 className="card-subtitle mb-2 text-muted">{user}</h6>
        <div className="row movie-advice-body">
          {addText()}
          <div className="col-6 img-movie-col">
            <img src={info.Poster} className="img-movie-body" />
          </div>
          <div className="col-6">
            <h4 className="movie-title"> {info.Title} </h4>
            <p className="movie-year">
              <small>{info.Year}</small>
            </p>
            <p className="movie-plot"> {info.Plot} </p>
          </div>
          <div className="row row-date-likebtn">
            <div className="col-6 col-date-like-btn">
              <p className="card-text">
                <small>{date}</small>
              </p>
            </div>
            <div className="col-6 col-date-like-btn">
              <input
                type="button"
                className="button btn btn-danger like-btn"
                onClick={addLike}
              />{" "}
              {likes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieAdvice;
