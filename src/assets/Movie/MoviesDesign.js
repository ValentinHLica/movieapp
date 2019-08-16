import React from "react";
import errr from "../img/errr.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

export default function MoviesDesign(props) {
  const {
    img,
    title,
    year,
    genres,
    rating,
    runtime,
    summary,
    torrents,
    yt,
    ss1m,
    ss2m,
    ss3m,
    ss1l,
    ss2l,
    ss3l,
    cast,
    show,
    handleClose,
    handleShow,
    type,
    loading
  } = props;

  const ssBig = [ss1l, ss2l, ss3l],
    ssmed = [ss1m, ss2m, ss3m];
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
  return (
    <div className="container my-4">
      <Modal show={show} onHide={handleClose} dialogClassName="modal-90w">
        {type === "trailer" ? (
          <iframe
            src={`https://www.youtube.com/embed/${yt}`}
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
          <div className="movie">
            <div className="poster">
              <img src={img} onError={errors.bind(this)} alt="Poster" />
            </div>
            <div>
              <h1>{title}</h1>
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
                <div className="download">
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
                  {summary !== ""
                    ? summary
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
                        <div className="media col-12 col-sm-6 p-1" key={index}>
                          {e.url_small_image !== undefined ? (
                            <img
                              src={e.url_small_image}
                              className="mr-3"
                              alt="actor"
                            />
                          ) : (
                            <div className="acc mr-3">
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
