import React from "react";
import logo from "../Oscars.png";
import "../header.css";

function Header() {
  return (
    <div className="quiz_header">
      <a href="/">
        <img src={logo} />
      </a>
    </div>
  );
}

export default Header;
