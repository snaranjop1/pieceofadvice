import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-div">
      <nav className="navbar">
        {/* sguzmanm: I´d recommend using Link from react router to avoid re rendering the page*/}
        <a className="navbar-brand" href="/">
          <img
            src="/logo.png"
            className="d-inline-block"
            alt="logo"
            id="logo"
          />
          Piece Of Advice
        </a>
        <button
          type="button"
          class="btn btn-primary form-inline"
          id="getAdvicebtn"
          data-toggle="modal"
          data-target="#exampleModalCenter"
        >
          Share my problem
        </button>
      </nav>
    </div>
  );
};

export default Navbar;
