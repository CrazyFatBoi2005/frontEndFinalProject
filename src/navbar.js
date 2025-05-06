import React from "react";
import { Link } from "react-router-dom";
import "./styles.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">
        <button className="retro-button">Main</button>
      </Link>
      <Link to="/feedback">
        <button className="retro-button">Feedback</button>
      </Link>
      <Link to="/add-new">
        <button className="retro-button">Add New</button>
      </Link>
      <Link to="/library">
        <button className="retro-button">MusicLib</button>
      </Link>
    </nav>
  );
}

export default Navbar;
