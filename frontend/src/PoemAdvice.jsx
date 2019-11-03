import React, { useState } from "react";
import "./Advice.css";

const PoemAdvice = props => {
  let _prop = props.props;
  let user = _prop.user;
  let text = _prop.text;
  let date = _prop.date;
  let [likes, setLikes] = useState(_prop.likes);
  let [liked, setliked] = useState(false);
  let info = _prop.info;

  let template = Math.floor(Math.random() * 3) + 1;
  let cardClass = `card w-90 card-template-${template}`;

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

  const printLines = () => {
    return info.lines.map(ln => {
      return (
        <p className="poem-line" key={((ln.length + 1) / Math.random()) * 10}>
          {ln + "\n"}{" "}
        </p>
      );
    });
  };

  return (
    <div className={cardClass} style={{ width: "18rem" }}>
      <div className="card-body poem-advice-card-body">
        <h6 className="card-subtitle mb-2 text-muted">{user}</h6>
        <div className="row poem-advice-body">
          {addText()}
          <div className="poem-body">
            <h4> {info.title}</h4>
            <h5> {`   ${info.author}`}</h5>
            <span>{printLines()}</span>
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
    </div>
  );
};

export default PoemAdvice;
