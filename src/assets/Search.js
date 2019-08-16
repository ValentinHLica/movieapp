import React from "react";
import { Consumer } from "./Context";
import Card from "./Card";

export default function Search() {
  const checktext = e => {
    switch (e) {
      case "all":
        return "All";
      case "date_added":
        return "Latest";
      case "download_count":
        return "Downloads";
      case "like_count":
        return "Likes";
      case "rating":
        return "Rating";
      case "year":
        return "Year";
      case "title":
        return "Alphabetical";
      case 0:
        return "All";
      default:
        return e;
    }
  };

  const pagination = value => {
    return value.selected[8] !== false && value.selected[6] > 20 ? (
      <nav className="navigation d-flex justify-content-center">
        <ul className="pagination m-0">
          <li
            className={`page-item ${
              value.selected[4] === 1 ? "disabled" : null
            }`}
          >
            <span className="page-link" onClick={value.prevPage}>
              <i className="fas fa-chevron-circle-left" />
            </span>
          </li>
          {value.selected[4] >= 4 ? (
            <React.Fragment>
              <li className="page-item" onClick={value.firstpage}>
                <span className="page-link">1</span>
              </li>
              <li className="page-item">
                <span className="page-link">...</span>
              </li>
            </React.Fragment>
          ) : null}

          {value.pages.map((e, index) => (
            <li
              className={`page-item ${
                Math.ceil(value.selected[6] / value.selected[7]) < e
                  ? "disabled"
                  : null
              }`}
              key={index}
            >
              <span
                id={`${value.selected[4] === e ? "selected" : null}`}
                className="page-link"
                key={index}
                onClick={value.changepage}
              >
                {e}
              </span>
            </li>
          ))}

          <li
            className={`page-item ${
              Math.ceil(value.selected[6] / value.selected[7]) <=
              value.selected[4]
                ? "disabled"
                : null
            }`}
          >
            <span className="page-link" onClick={value.nextPage}>
              <i className="fas fa-chevron-circle-right" />
            </span>
          </li>
        </ul>
      </nav>
    ) : null;
  };
  return (
    <Consumer>
      {value => {
        return (
          <div className="container my-5">
            <form
              onSubmit={value.addMovies.bind(this)}
              className="intro container"
            >
              <div className="form-group title">
                <label htmlFor="exampleFormControlInput1">MovieZ</label>
                <span className="d-flex">
                  <input
                    type="text"
                    className="form-control mr-2"
                    id="exampleFormControlInput1"
                    placeholder="Search Movie..."
                    value={value.selected[5] === 0 ? "" : value.selected[5]}
                    onChange={value.titleSearch.bind(this)}
                  />
                  <button className="btn btn-warning" type="submit">
                    Search
                  </button>
                </span>
              </div>
              <div className="formgroups d-flex justify-content-center">
                {value.options.map((e, index) => (
                  <div className="form-group mx-1" key={index}>
                    <label htmlFor={e.title}>{e.title}:</label>
                    <select
                      className="form-control"
                      id={e.title}
                      onChange={value.change.bind(this, index)}
                      value={value.selected[index]}
                    >
                      {e.option.map((e, index) => (
                        <option key={index} value={e}>
                          {checktext(e, index)}
                        </option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
              {value.explore ? (
                <span className="d-flex justify-content-center mt-4">
                  <button
                    className="btn btn-warning"
                    onClick={value.addMovies.bind(this)}
                  >
                    <i class="fas fa-ticket-alt mr-2" />Explore Movies
                  </button>
                </span>
              ) : null}
            </form>

            <div className="my-5">
              {!value.loading && !value.err ? (
                <span className="d-flex justify-content-center my-5 py-5">
                  <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </span>
              ) : (
                <span>
                  {value.data.length !== 0 ? (
                    <React.Fragment>
                      {pagination(value)}
                      <div className="my-3">
                        <h3>Movies:</h3>
                        <div className="row">
                          {value.data.map(e => (
                            <Card
                              id={e.id}
                              img={e.medium_cover_image}
                              key={e.id}
                              title={e.title}
                              rating={e.rating}
                            />
                          ))}
                        </div>
                      </div>
                      {pagination(value)}
                    </React.Fragment>
                  ) : null}
                </span>
              )}

              {value.err ? (
                <h1 className="mt-5 notfound text-center">Movie Not Found</h1>
              ) : null}
            </div>
          </div>
        );
      }}
    </Consumer>
  );
}
