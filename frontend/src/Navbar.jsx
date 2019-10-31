import React from "react";
import "./Navbar.css";

const Navbar = () => {
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
      </nav>
    </div>
  );
};

export default Navbar;
