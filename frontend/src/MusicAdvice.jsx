import React, { useState, useEffect } from "react";

const MusicAdvice = props => {
  let _prop = props.props;
  let src = _prop.src;
  let user = _prop.user;
  let text = _prop.text;
  let date = _prop.date;
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

  useEffect(() => {
    if (text === "") {
      setHeight("350");
    }
  }, [text]);

  return (
    <div className="card text-white bg-info mb-3" style={{ width: "18rem" }}>
      <div className="card-body text-advice-card-body">
        <h6 className="card-subtitle mb-2 text-muted">{user}</h6>
        {addText()}
        <iframe
          src={src}
          width="265"
          height={height}
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
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

export default MusicAdvice;
