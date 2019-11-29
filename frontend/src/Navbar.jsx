import React from "react";
import "./Navbar.css";

const Navbar = props => {
  const navButtons = () => {
    return props._logged ? loggedButtons() : notLoggedButtons();
  };

  const notLoggedButtons = () => {
    return (
      <button
        type="button"
        class="btn btn-primary form-inline"
        id="getAdvicebtn"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      >
        Share my problem
      </button>
    );
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

  const loggedButtons = () => {
    return (
      <>
        <button
          type="button"
          class="btn btn-primary form-inline"
          id="getAdvicebtn"
          onClick={signOut}
        >
          Sign Out
        </button>
        <button
          type="button"
          class="btn btn-primary form-inline"
          id="getAdvicebtn"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Share my problem
        </button>
      </>
    );
  };

  return (
    <div className="navbar-div">
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <img
            src="/logo.png"
            className="d-inline-block"
            alt="logo"
            id="logo"
          />
          Piece Of Advice
        </a>
        <form className="form-inline">{navButtons()}</form>
      </nav>
    </div>
  );
};

export default Navbar;
