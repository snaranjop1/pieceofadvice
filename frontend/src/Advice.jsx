import React from "react";
import "./Advice.css";

const Advice = props => {
  return (
    <div className="card p-3 shadow-sm">
      {props.song !== "" && (
        <iframe
          src="https://open.spotify.com/embed/album/1DFixLWuPkv3KT3TnV35m3"
          width="300"
          height="80"
          frameBorder="0"
          allowtransparency="true"
          allow="encrypted-media"
        ></iframe>
      )}
      <blockquote className="blockquote mb-0 card-body">
        <p>{props.advice}</p>
        {props.author !== "" && (
          <footer className="blockquote-footer">
            <small className="text-muted">{props.author} </small>
          </footer>
        )}
      </blockquote>
      <hr />
      <div className="row">
        <button className="btn " id="up-btn">
          <i className="far fa-thumbs-up"></i>
        </button>
        <p id="advice-ups">{props.ups}</p>
      </div>
    </div>
  );
};

export default Advice;
