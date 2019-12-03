import React from "react";
import { Link } from "react-router-dom";
import "./TopCard.css";

const TopCard = props => {
  let title = props.title;
  let subtitle = props.subtitle;
  let date = props.date;

  return (
    <div class="card shadow" id="top-card">
      <div class="card-body">
        <Link>
          <h1 id="card-title">{title}</h1>
        </Link>
        <p id="card-subtitle">{date}</p>
      </div>
    </div>
  );
};

export default TopCard;
