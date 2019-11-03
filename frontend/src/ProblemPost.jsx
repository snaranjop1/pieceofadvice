import React from "react";
import { Link } from "react-router-dom";
import "./ProblemPost.css";

const ProblemPost = props => {
  let title = props.title;
  let subtitle = props.subtitle;
  let date = props.date;

  const setID = () => {
    props.setAdviceId(props.id);
  };

  return (
    <div>
      <div className="post-preview" onMouseEnter={setID}>
        <Link to={{ pathname: "/advice" }}>
          <h2 className="post-title">{title}</h2>
        </Link>
        <h3 className="post-subtitle">{subtitle}</h3>
        <p className="post-meta">{"Posted on " + date}</p>
      </div>
      <hr></hr>
    </div>
  );
};

export default ProblemPost;
