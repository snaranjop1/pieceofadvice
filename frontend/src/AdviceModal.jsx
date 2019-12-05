import React, { useState, useEffect } from "react";

const AdviceModal = props => {
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
    if (!props.logged) {
      window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
        width: 250,
        height: 50,
        onsuccess: onSignIn
      });
    }
  }, []);

  const onSignIn = googleUser => {
    var profile = googleUser.getBasicProfile();
    //console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    let info = {
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl()
    };
    props.handleUserInfoChange(info, true);
  };

  const loggedModal = () => {
    return (
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="exampleModalLabel">
            Give some advice
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label htmlFor="advicetext">Advice:</label>
              <textarea
                placeholder="This happened to me some time ago and meditation helped me a lot"
                className="form-control"
                id="advicetext"
                rows="3"
                onChange={props.handleAdviceChange}
              ></textarea>
            </div>
            <div> </div>
            <div align="left">
              <div class="col checkbox" align="left" onClick={props.handleAnonymous}>
                <input
                  type="checkbox"
                  data-toggle="toggle"
                  data-onstyle="warning"
                  data-offstyle="info"
                  data-on="Post Anonymously"
                  data-off={"Post as " + props.userInfo.name}
                  data-width="200"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="song">
                Recommend a song (Just type the name):
              </label>
              <input
                type="text"
                className="form-control"
                id="song"
                placeholder="Back in black"
              />
            </div>
          </form>
        </div>
        <div className="modal-footer justify-content-center">
          <button
            type="button"
            className="btn btn-primary"
            id="publishbtn"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.addAdvice}
          >
            Publish
          </button>
        </div>
      </div>
    );
  };
  return props.logged ? loggedModal() : preLogggedModal();
};

export default AdviceModal;
