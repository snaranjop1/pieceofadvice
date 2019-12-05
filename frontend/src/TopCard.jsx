import React from "react";
import { Link } from "react-router-dom";
import "./TopCard.css";

const TopCard = props => {
  let title = props.title;
  let date = props.date;

  return (
    <div className="card shadow" id="top-card">
      <div className="card-body">
        <Link to={{ pathname: `/advice/${props.id}` }}>
          <h1 id="card-title">{title}</h1>
        </Link>
        <p id="card-subtitle">{date}</p>
      </div>
    </div>
  );
};

export default TopCard;
