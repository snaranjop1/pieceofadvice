import React from "react";
import { Link } from "react-router-dom";
import "./ProblemPost.css";

const ProblemPost = props => {
  let title = props.title;
  let subtitle = props.subtitle;
  let date = props.date;
  let likes = props.likes;
  let views = props.views;
  let i = 0;

  const renderTags = () => {
    return props.tags.map(_tag => {
      return (
        <div key={i++} className="col-auto">
          <span className="badge"> {_tag} </span>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="card shadow rounded" id="problem-card">
        <div className="card-body">
          <Link to={{ pathname: `/advice/${props.id}` }}>
            <h1 id="problem-title">{title}</h1>
          </Link>
          <h2 id="problem-details">{subtitle}</h2>
          <p id="problem-date">{date}</p>
          <hr />
          <div className="row">
            <button className="btn " id="like-btn">
              <i className="fas fa-star"></i>
            </button>
            <p id="problem-likes">{likes}</p>
            <button className="btn">
              <i className="fas fa-eye"></i>
            </button>
            <p id="problem-views">{views}</p>
            {renderTags()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPost;
