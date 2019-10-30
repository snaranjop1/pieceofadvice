import React, { useState, useEffect } from "react";
import "./Advice.css";

const TextAdvice = props => {
  let text = props.props.text;
  let user = "gregorioospina";
  let date = "12/12/2012";
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

  useEffect(() => {}, []);

  const textAdvice = () => {
    return (
      <div className="card text-white bg-info mb-3" style={{ width: "18rem" }}>
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
                type="button"
                className="button btn btn-danger like-btn"
                onClick={addLike}
              />{" "}
              {likes}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return textAdvice();
};

export default TextAdvice;
