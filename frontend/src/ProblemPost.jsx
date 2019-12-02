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

  const renderTags = () => {
    return props.tags.map(_tag => {
      return <span className="badge badge-warning btn-tag "> {_tag} </span>;
    });
  };

  return (
    <div>
      <div className="post-preview" onMouseEnter={setID}>
        <Link to={{ pathname: "/advice" }}>
          <h2 className="post-title">{title}</h2>
        </Link>
        <h3 className="post-subtitle">{subtitle}</h3>
        <div className="row">
          <p className="post-meta">{"Posted on " + date}</p>
          <div className="post-tag-div">{renderTags()}</div>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default ProblemPost;
