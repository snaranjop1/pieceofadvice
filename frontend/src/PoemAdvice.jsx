import React, { useState } from "react";

const PoemAdvice = props => {
  let _prop = props.props;
  let src = _prop.src;
  let user = _prop.user;
  let text = _prop.text;
  let date = _prop.date;
  let [height, setHeight] = useState("350");
  let [likes, setLikes] = useState(0);
  let [liked, setliked] = useState(false);
  let info = {
    title: "Ozymandias",
    author: "Percy Bysshe Shelley",
    lines: [
      "I met a traveller from an antique land",
      'Who said: "Two vast and trunkless legs of stone',
      "Stand in the desert. Near them on the sand,",
      "Half sunk, a shattered visage lies, whose frown",
      "And wrinkled lip and sneer of cold command",
      "Tell that its sculptor well those passions read",
      "Which yet survive, stamped on these lifeless things,",
      "The hand that mocked them and the heart that fed.",
      "And on the pedestal these words appear:",
      "'My name is Ozymandias, King of Kings:",
      "Look on my works, ye mighty, and despair!'",
      "Nothing beside remains. Round the decay",
      "Of that colossal wreck, boundless and bare,",
      'The lone and level sands stretch far away".'
    ],
    linecount: 14
  };

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

  const printLines = () => {
    console.log("lines[0]", info.lines[0]);
    return info.lines.map(ln => {
      return <p className="poem-line">{ln + "\n"} </p>;
    });
  };

  return (
    <div className="card text-white bg-info mb-3" style={{ width: "18rem" }}>
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

export default PoemAdvice;
