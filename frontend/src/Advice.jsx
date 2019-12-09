import React from "react";
import "./Advice.css";

const Advice = props => {
  let src = `https://open.spotify.com/embed/track/${props.song}`;
  return (
    <div className="card p-3 shadow-sm">
      {props.song !== "-1" && (
        <iframe
          src={src}
          width="300"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      )}
      <blockquote className="blockquote mb-0 card-body">
        <p>{props.text}</p>
        {props.author !== "" && (
          <footer className="blockquote-footer">
            <small className="text-muted">{props.author} </small>
          </footer>
        )}
      </blockquote>
      <hr />
      <div className="row">
        <button
          className="btn "
          id="up-btn"
          onClick={() => props.handleLike(props.id, props.adviceid)}
        >
          <i className="far fa-thumbs-up"></i>
        </button>
        <p id="advice-ups">{props.likes}</p>
      </div>
    </div>
  );
};

export default Advice;
