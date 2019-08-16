import React, { Component } from "react";
import MoviesDesign from "./MoviesDesign";

export default class Movie extends Component {
  state = {
    show: false,
    detail: {},
    moviecount: null,
    type: null,
    loading: true
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handleShow = (type, ss) => {
    if (type === "trailer") {
      this.setState({
        type: "trailer"
      });
    } else {
      this.setState({
        type: ss
      });
    }
    this.setState({ show: true });
  };

  abortController = new AbortController();
  componentDidMount() {
    fetch("https://yts.lt/api/v2/list_movies.json", {
      signal: this.abortController.signal
    })
      .then(e => e.json())
      .then(e =>
        this.setState({
          moviecount: e.data.movies[0].id
        })
      )
      .then(() => {
        if (
          isNaN(this.props.match.params.id) ||
          this.props.match.params.id > this.state.moviecount ||
          this.props.match.params.id < 1
        ) {
          this.props.history.push(`/notfound`);
        } else {
          fetch(
            `https://yts.lt/api/v2/movie_details.json?movie_id=${
              this.props.match.params.id
            }&with_images=true&with_cast=true`,
            {
              signal: this.abortController.signal
            }
          )
            .then(e => e.json())
            .then(t =>
              this.setState({ detail: { ...t.data.movie }, loading: false })
            );
        }
      });
  }

  componentWillUnmount() {
    this.abortController.abort();
  }

  render() {
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
    } = this.state.detail;

    return (
      <MoviesDesign
        img={medium_cover_image}
        title={title}
        year={year}
        genres={genres}
        rating={rating}
        runtime={runtime}
        summary={description_full}
        torrents={torrents}
        yt={yt_trailer_code}
        ss1m={medium_screenshot_image1}
        ss2m={medium_screenshot_image2}
        ss3m={medium_screenshot_image3}
        ss1l={large_screenshot_image1}
        ss2l={large_screenshot_image2}
        ss3l={large_screenshot_image3}
        cast={cast}
        show={this.state.show}
        type={this.state.type}
        handleClose={this.handleClose}
        handleShow={this.handleShow}
        loading={this.state.loading}
        imageLoad={this.state.imageLoad}
        imageLoadHandler={this.handleImageLoad}
      />
    );
  }
}
