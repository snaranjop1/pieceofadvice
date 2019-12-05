import React, { useEffect } from "react";
import "./PostModal.css";

const PostModal = props => {
  const preLogggedModal = () => {
    return (
      <div className="modal-content">
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold">Sign In</h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div id={GOOGLE_BUTTON_ID} className="google-button" />
      </div>
    );
  };

  const GOOGLE_BUTTON_ID = "google-sign-in-button";

  useEffect(() => {
    if (!props._logged) {
      window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
        width: 250,
        height: 50,
        onsuccess: onSignIn
      });
    }
  }, []);

  useEffect(() => {}, [props._logged]);

  const onSignIn = googleUser => {
    var profile = googleUser.getBasicProfile();
    //console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    let info = {
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl()
    };
    props.handleLoggedInChange(true);
    props.handleUserInfoChange(info);
  };

  const renderTags = () => {
    return props.tags.map(tag => {
      return (
        <button
          key={tag}
          type="button"
          onClick={() => props.removeTag(tag)}
          className="btn btn-sm btn-tag"
        >
          {tag} <i className="fas fa-times" id="delete-tag"></i>
          <span className="sr-only">{tag} tag</span>
        </button>
      );
    });
  };

  const loggedModal = () => {
    return (
      <div className="modal-content">
        <div className="modal-header text-center">
          <h4 className="modal-title w-100 font-weight-bold">
            Get advice {props._userInfo.name}
          </h4>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body mx-3">
          <form>
            <div className="form-group">
              <label htmlFor="problem">Problem or Question</label>
              <input
                type="text"
                className="form-control"
                id="problem"
                placeholder="My dog died and i don't know what to do"
                value={props.question}
                onChange={props.handleChangeQuestion}
              />
            </div>
            <div className="form-group">
              <label htmlFor="problemdetails">Comments or details</label>
              <textarea
                className="form-control"
                id="problemdetails"
                rows="2"
                value={props.details}
                onChange={props.handleChangeDetails}
              ></textarea>
              <label htmlFor="problemcategories">
                Tags (Press enter after each tag)
              </label>
              <input
                type="text"
                className="form-control"
                id="problemcategories"
                placeholder="Add Categories!"
                maxLength="20"
                onKeyDown={props.handleNewTag}
              ></input>
              <div id="tags-div">{renderTags()}</div>
            </div>
          </form>
        </div>
        <div className="modal-footer d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            id="publishbtn"
            onClick={props.postProblem}
            data-dismiss="modal"
            aria-label="Close"
          >
            Publish
          </button>
        </div>
      </div>
    );
  };

  return props._logged ? loggedModal() : preLogggedModal();
};

export default PostModal;
