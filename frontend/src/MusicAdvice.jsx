import React, { useState, useEffect } from "react";


const MusicAdvice = props => {
  let _prop = props.props;
  let src = _prop.src;
  let user = _prop.user;
  let text = _prop.text;
  let date = _prop.date;
  let [height, setHeight] = useState(_prop.height); // sguzmanm: Is it bad practice to set a state from given props. 
  let [likes, setLikes] = useState(_prop.likes); // sguzmanm: Is it bad practice to set a state from given props. 
  let [liked, setliked] = useState(false);

  let template = Math.floor(Math.random() * 3) + 1;
  let cardClass = `card bg mb-3 card-template-${template}`;

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

  const assembleSrc = () => {
    return `https://open.spotify.com/embed/track/${src}`;
  };

  useEffect(() => {
    if (text === "") {
      setHeight("350");
    }
  }, [text]);

  return (
    <div className={cardClass} style={{ width: "18rem" }}>
      <div className="card-body text-advice-card-body">
        <h6 className="card-subtitle mb-2 text-muted">{user}</h6>
        {addText()}
        <iframe
          src={assembleSrc()}
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

export default MusicAdvice;
