import React from "react";
import { Link } from "react-router-dom";
export default function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-danger"
      style={{ position: "sticky", top: "0", zIndex: "666" }}
    >
      <div className="container">
        <Link className="navbar-brand btn btn-warning" to="/">
          <i className="fas fa-film pr-xm-1 pr-sm-2" />
          MovieZ
        </Link>
        <Link to="/search" className="btn text-white bg-dark">
          <i className="fas fa-search pr-xm-1 pr-sm-2" /> Browse Movies
        </Link>
      </div>
    </nav>
  );
}
