import React, { useState, useEffect } from "react";

const PostModal = props => {
  let [logged, setLogged] = useState(props.logged);

  const preLogggedModal = () => {
    return (
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">
            Sign In Before Posting!
          </h4>
        </div>
        <div id={GOOGLE_BUTTON_ID} className="google-button" />
      </div>
    );
  };

  const GOOGLE_BUTTON_ID = "google-sign-in-button";

  useEffect(() => {
    if (!props._logged) {
      window.gapi.signin2.render(GOOGLE_BUTTON_ID, {
        width: 200,
        height: 50,
        onsuccess: onSignIn
      });
    }
  }, []);

  useEffect(() => {
    console.log("yes");
    setLogged(props._logged);
  }, [props._logged]);

  const onSignIn = googleUser => {
    var profile = googleUser.getBasicProfile();
    console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
    let info = {
      name: profile.getName(),
      email: profile.getEmail(),
      image: profile.getImageUrl()
    };
    props.handleLoggedInChange(true);
    props.handleUserInfoChange(info);
  };

  const signOut = () => {
    if (props._logged) {
      var auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(function() {
        console.log("User signed out.");
        props.handleLoggedInChange(false);
      });
    }
  };

  const loggedModal = () => {
    return (
      <div class="modal-content">
        <div class="modal-header text-center">
          <h4 class="modal-title w-100 font-weight-bold">
            Get Advice {props._userInfo.name}
          </h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body mx-3">
          <form>
            <div class="form-group">
              <label for="problem">Problem or Question</label>
              <input
                type="text"
                class="form-control"
                id="problem"
                placeholder="My dog died and i don't know what to do"
                value={props.question}
                onChange={props.handleChangeQuestion}
              />
            </div>
            <div class="form-group">
              <label for="problemdetails">Comments or details</label>
              <textarea
                class="form-control"
                id="problemdetails"
                rows="2"
                value={props.details}
                onChange={props.handleChangeDetails}
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer d-flex justify-content-center">
          <button
            type="button"
            class="btn btn-primary"
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
