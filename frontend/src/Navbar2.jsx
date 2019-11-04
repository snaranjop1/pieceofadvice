import React from "react";
import { Link } from "react-router-dom";
import "./Navbar2.css";

// sguzmanm: Why do you have two navbars?

const Navbar2 = () => {
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
        <Link to={"/"}>
          <button class="btn btn-primary form-inline" id="gobackbtn">
            Go back
          </button>
        </Link>
      </nav>
    </div>
  );
};

export default Navbar2;
