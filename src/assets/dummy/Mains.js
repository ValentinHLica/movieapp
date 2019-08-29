import React, { Component } from "react";
import Card from "../Card";
import Row from "react-bootstrap/Row";

export default class Main extends Component {
  state = {
    mainData: [],
    mainLdata: [],
    mainMovies: ["tt3513498", "tt6139732", "tt2283336", "tt0448115"],
    loading: true
  };

  abortController = new AbortController();
  fetcher = (url, state) => {
    fetch(`https://yts.lt/api/v2/list_movies.json?${url}`, {
      signal: this.abortController.signal
    })
      .then(e => e.json())
      .then(e =>
        state
          ? this.setState({
              mainData: [...e.data.movies, ...this.state.mainData]
            })
          : this.setState({
              mainLdata: [...e.data.movies, ...this.state.mainLdata]
            })
      )
      .then(() => this.setState({ loading: false }));
  };

  fetchTop = () => {
    this.state.mainMovies.map(e => this.fetcher(`query_term=${e}`, true));
  };

  fetchLatest = () => {
    this.fetcher(`limit=8`, false);
  };

  card = e => {
    return (
      <Card
        id={e.id}
        img={e.medium_cover_image}
        key={e.id}
        title={e.title}
        rating={e.rating}
      />
    );
  };

  componentDidMount() {
    this.fetchTop();
    this.fetchLatest();
  }

  componentWillUnmount() {
    this.abortController.abort();
  }
  render() {
    return (
      <div className="container my-4">
        {!this.state.loading ? (
          <span>
            <div className="bestmovies">
              <div className="desc mb-1 d-flex align-items-center">
                <i className="fas fa-star mb-2 mr-2 text-danger" />
                <h3>Popular Downloads</h3>
              </div>
              <Row>{this.state.mainData.map(e => this.card(e))}</Row>
            </div>
            <div className="latest my-5 ">
              <div className="desc mb-1 d-flex align-items-center">
                <i className="fas fa-star mb-2  mr-2 text-danger" />
                <h3>Latest Added</h3>
              </div>
              <Row>{this.state.mainLdata.map(e => this.card(e))}</Row>
            </div>
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
}
