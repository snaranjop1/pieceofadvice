import React from "react";
import "./Advice.css";

const Advice = props => {
  const renderMovie = () => {
    if (props.minfo !== undefined) {
      if (props.minfo !== {}) {
        let poster = props.minfo.Poster;
        let name = props.minfo.Title;
        return (
          <>
            <img src={poster} className="card-img-top" alt={name} />
          </>
        );
      }
    } else {
      return <> </>;
    }
  };

  return (
    <div className="card p-3 shadow-sm img-fluid">
      {renderMovie()}
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
