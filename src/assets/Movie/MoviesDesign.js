import React, { useState, useEffect } from "react";
import errr from "../img/errr.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";

export default function MoviesDesign(props) {
  const [show, setshow] = useState(false);
  const [type, settype] = useState(null);
  const [detail, setdetail] = useState({});
  const [loading, setloading] = useState(true);

  const handleClose = () => {
    setshow(false);
  };

  const handleShow = (type, ss) => {
    if (type === "trailer") {
      settype("trailer");
    } else {
      settype(ss);
    }
    setshow(true);
  };

  const {
    medium_cover_image,
    title,
    year,
    genres,
    rating,
    runtime,
    description_full,
    torrents,
    yt_trailer_code,
    medium_screenshot_image1,
    medium_screenshot_image2,
    medium_screenshot_image3,
    large_screenshot_image1,
    large_screenshot_image2,
    large_screenshot_image3,
    cast
  } = detail;

  const ssBig = [
      large_screenshot_image1,
      large_screenshot_image2,
      large_screenshot_image3
    ],
    ssmed = [
      medium_screenshot_image1,
      medium_screenshot_image2,
      medium_screenshot_image3
    ];
  const errors = e => {
    e.target.src = errr;
  };

  const CharaceterNotFoundErr = () => {
    const randomNames = [
      "Ben Dover",
      "Mike Hawk",
      "Chris P. Bacon",
      "Haywood Jablome",
      "Mike Rotch",
      "Hugh Jurection"
    ];
    return randomNames[Math.floor(Math.random() * (randomNames.length - 1))];
  };

  useEffect(() => {
    axios
      .get("https://yts.mx/api/v2/list_movies.json?limit=1")
      .then(e => {
        return e.data.data.movies[0].id;
      })

      .then(e => {
        if (
          isNaN(props.match.params.id) ||
          props.match.params.id > e ||
          props.match.params.id < 1
        ) {
          props.history.push(`/notfound`);
        } else {
          axios
            .get(
              `https://yts.mx/api/v2/movie_details.json?movie_id=${props.match.params.id}&with_images=true&with_cast=true`
            )
            .then(t => {
              setdetail({ ...t.data.data.movie });
              setloading(false);
            })
            .catch();
        }
      })
      .catch();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container my-4">
      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        {type === "trailer" ? (
          <iframe
            src={`https://www.youtube.com/embed/${yt_trailer_code}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope;"
            allowFullScreen
            title="Trailer"
          />
        ) : (
          <img src={type} alt="ScreenShot" className="screenshot" />
        )}
      </Modal>

      {!loading ? (
        <span>
          <div className="movie d-flex">
            <div className="poster">
              <img
                src={medium_cover_image}
                onError={errors.bind(this)}
                alt="Poster"
              />
            </div>
            <div>
              <h1 className="py-2">{title}</h1>
              <div className="info">
                <p>{year}</p>
                <p>{genres !== undefined ? genres.join(", ") : null}</p>
                <span className="d-flex">
                  <p className="pr-3 d-flex align-items-center">
                    Rating:
                    {rating ? (
                      <span className="d-flex">
                        <i className="far fa-star text-primary d-flex align-items-center px-1" />
                        {rating}
                      </span>
                    ) : (
                      <i className="fas fa-exclamation-triangle text-danger px-1" />
                    )}
                  </p>

                  <p className="pr-3 d-flex align-items-center">
                    Runtime:
                    {runtime ? (
                      <span className="d-flex">
                        <i className="fas fa-clock text-primary d-flex align-items-center px-1" />
                        {runtime} min
                      </span>
                    ) : (
                      <i className="fas fa-exclamation-circle text-warning px-1" />
                    )}
                  </p>
                </span>
                <div className="d-flex">
                  <Button
                    variant="danger"
                    className="mr-2"
                    onClick={handleShow.bind(this, "trailer")}
                  >
                    <i className="fab fa-youtube" /> Trailer
                  </Button>

                  <Dropdown>
                    <Dropdown.Toggle variant="warning" id="dropdown-basic">
                      Download
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {torrents !== undefined
                        ? torrents.map((e, index) => (
                            <Dropdown.Item href={e.url} key={index}>
                              {e.quality}.{e.type} ➖ {e.size}
                            </Dropdown.Item>
                          ))
                        : null}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <p className="pt-2">
                  <strong>Summary: </strong>
                  {description_full !== ""
                    ? description_full
                    : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequuntur dolor culpa repellendus repudiandae, autem iure error dignissimos aliquid obcaecati sed maxime recusandae ducimus! Et nostrum est aspernatur magnam quaerat minus illum delectus, placeat, ab unde quasi aliquam provident recusandae explicabo."}
                </p>
              </div>
            </div>
          </div>
          <div className="screenshots mt-4">
            <h3>Screenshots:</h3>
            <div className="row">
              {ssBig.map((e, index) => (
                <div className="col-12 col-sm-12 col-md-4 mt-2" key={index}>
                  <img
                    onClick={handleShow.bind(this, "ss", e)}
                    data-toggle="modal"
                    data-target="#ssModal"
                    src={ssmed[index]}
                    alt={`Screenshot ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
          {cast !== undefined ? (
            <div className="cast mt-4 mb-2">
              <h3>Actors:</h3>
              <div className="container">
                <div className="row">
                  {cast !== undefined
                    ? cast.map((e, index) => (
                        <div
                          className="d-flex align-items-center col-12 col-sm-6 p-1"
                          key={index}
                        >
                          {e.url_small_image !== undefined ? (
                            <img
                              src={e.url_small_image}
                              className="mr-3 acc"
                              alt="actor"
                            />
                          ) : (
                            <div className="d-flex justify-content-center align-items-center mr-3 acc">
                              <i className="far fa-user" />
                            </div>
                          )}
                          <div className="media-body">
                            {e.name} as{" "}
                            {e.character_name
                              ? e.character_name
                              : CharaceterNotFoundErr()}
                          </div>
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
          ) : null}
        </span>
      ) : (
        <span className="d-flex justify-content-center my-5 py-5">
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </span>
      )}
    </div>
  );
}
