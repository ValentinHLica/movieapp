import React from "react";
import { Link } from "react-router-dom";
import errr from "../assets/img/errr.png";

export default function Card(props) {
  const { id, img, title, rating } = props;

  const errors = e => {
    e.target.src = errr;
  };

  return (
    <div className="my-2 col-6 col-md-3">
      <div className="card">
        <Link to={`/movie/${id}`}>
          <img src={img} onError={errors.bind(this)} alt="Poster" />

          <div className="d-flex align-items-center justify-content-center cardinfo">
            <i className="fas fa-star mb-2 text-danger" />
            <h4>
              {rating ? (
                rating
              ) : (
                <i className="fas fa-exclamation-triangle text-warning mr-1" />
              )}
              /10
            </h4>
            <h3 className="btn btn-warning mx-3">{title}</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
