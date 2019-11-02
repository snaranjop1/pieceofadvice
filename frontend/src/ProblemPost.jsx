import React from "react";
import "./ProblemPost.css";

const ProblemPost = props => {
  let title = props.title;
  let subtitle = props.subtitle;
  let date = props.date;

  return (
    <div>
      <div className="post-preview">
        <a href="/advice">
          <h2 className="post-title">{title}</h2>
        </a>
        <h3 className="post-subtitle">{subtitle}</h3>
        <p className="post-meta">{"Posted on " + date}</p>
      </div>
      <hr></hr>
    </div>
  );
};

export default ProblemPost;
