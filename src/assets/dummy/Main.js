import Card from "../Card";
import Row from "react-bootstrap/Row";
import axios from "axios";

import React, { useEffect, useState } from "react";

export default function Main() {
  const [mainData, setmainData] = useState([]);
  const [mainLdata, setmainLdata] = useState([]);
  const [loading, setloading] = useState(true);
  const mainMovies = ["tt3513498", "tt6139732", "tt2283336", "tt0448115"];
  let data = [];
  const fetcher = (url, state) => {
    axios
      .get(`https://yts.lt/api/v2/list_movies.json?${url}`)
      .then(e => {
        if (state) {
          data = [...e.data.data.movies, ...data];
          if (data.length === 4) {
            setmainData(data);
          }
        } else {
          setmainLdata([...e.data.data.movies]);
        }
      })
      .then(() => setloading(false));
  };

  const fetchTop = () => {
    mainMovies.map(e => fetcher(`query_term=${e}`, true));
  };

  const fetchLatest = () => {
    fetcher(`limit=8`, false);
  };

  const card = e => {
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

  useEffect(() => {
    fetchTop();
    fetchLatest();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="container my-4">
      {!loading ? (
        <span>
          <div className="bestmovies">
            <div className="desc mb-1 d-flex align-items-center">
              <i className="fas fa-star mb-2 mr-2 text-danger" />
              <h3>Popular Downloads</h3>
            </div>
            <Row>{mainData.map(e => card(e))}</Row>
          </div>
          <div className="latest my-5 ">
            <div className="desc mb-1 d-flex align-items-center">
              <i className="fas fa-star mb-2  mr-2 text-danger" />
              <h3>Latest Added</h3>
            </div>
            <Row>{mainLdata.map(e => card(e))}</Row>
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
