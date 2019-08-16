import React from "react";
import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className="container notfound my-5 d-flex">
      <h1>404 Page/Movie not found</h1>
      <Link to="/">
        <h3>Go Back</h3>
      </Link>
    </div>
  );
}
