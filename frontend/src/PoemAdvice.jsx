import React, { useState } from "react";

const PoemAdvice = props => {
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
  return;
};
