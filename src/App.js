import React from "react";
import Provider from "./assets/Context";
import { HashRouter as Router, Route, Switch } from "react-router-dom";

import Movie from "./assets/Movie/Movie";
import Search from "./assets/Search";

import "./App.css";

import Header from "./assets/dummy/Header";
import Footer from "./assets/dummy/Footer";
import Page404 from "./assets/dummy/Page404";
import Main from "./assets/dummy/Main";

export default function App() {
  return (
    <Provider>
      <Router>
        <Header />
        <Switch>
          <Route exact path="/movie/:id" component={Movie} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/" component={Main} />
          <Route exact path="/nofound" component={Page404} />
          <Route exact path="*" component={Page404} />
        </Switch>
        <Footer />
      </Router>
    </Provider>
  );
}
