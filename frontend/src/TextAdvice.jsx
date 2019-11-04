import React, { useState, useEffect } from "react";
import "./Advice.css";

const TextAdvice = props => {
  let text = props.props.text;
  let user = "gregorioospina";
  let date = props.props.date;
  let [likes, setLikes] = useState(props.props.likes); // sguzmanm: It is bad practice to use props in your state
  let [liked, setliked] = useState(false);
  console.log("text advice props", props);

  let template = Math.floor(Math.random() * 3) + 1;
  let cardClass = `card bg mb-3 card-template-${template}`;

  const addLike = () => {
    if (liked) {
      setliked(false);
      setLikes(likes - 1);
      props.updateLikes(props.props.id, likes - 1);
    } else {
      setliked(true);
      setLikes(likes + 1);
      props.updateLikes(props.props.id, likes + 1);
    }
  };

  useEffect(() => {}, []);

  const textAdvice = () => {
    return (
      <div className={cardClass} style={{ width: "18rem" }}>
        {/*<img src="..." className="card-img-top" alt="..." /> */}
        <div className="card-body text-advice-card-body">
          <h6 className="card-subtitle mb-2 text-muted">{user}</h6>
          <p className="card-text">{text}</p>
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
                onClick={() => addLike()}
              />
              <span className="like-tag">{likes}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return textAdvice();
};

export default TextAdvice;
