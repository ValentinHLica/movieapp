import React, { Component } from "react";
import "../App.css";
const Context = React.createContext();

export default class Provider extends Component {
  state = {
    data: [],
    theme: false,
    changetheme: () => {
      this.setState({ theme: !this.state.theme });
      localStorage.setItem("theme", !this.state.theme);
    },
    options: [
      {
        title: "Quality",
        option: ["all", "720p", "1080p", "3D"]
      },
      {
        title: "Genre",
        option: [
          "all",
          "Action",
          "Adventure",
          "Animation",
          "Biography",
          "Comedy",
          "Crime",
          "Documentary",
          "Drama",
          "Family",
          "Fantasy",
          "Film-Noir",
          "Game-Show",
          "History",
          "Horror",
          "Music",
          "Musical",
          "Mystery",
          "News",
          "Reality-TV",
          "Romance",
          "Sci-Fi",
          "Sport",
          "Talk-Show",
          "Thriller",
          "War",
          "Western"
        ]
      },
      {
        title: "Rating",
        option: [0, 9, 8, 7, 6, 5, 4, 3, 2, 1]
      },
      {
        title: "Order by",
        option: [
          "date_added",
          "like_count",
          "download_count",
          "rating",
          "year",
          "title"
        ]
      }
    ],
    selected: ["all", "all", 0, "date_added", 1, 0, 0, 0, false],
    pages: [1, 2, 3, 4, 5],
    url: e => {
      const [quality, genre, rating, order, page, title] = e;

      return `
      https://yts.lt/api/v2/list_movies.json?page=${page}&quality=${quality}&minimum_rating=${rating}&query_term=${title}&genre=${genre}&sort_by=${order}
      `;
    },
    change: (index, e) => {
      const data = [...this.state.selected];
      data[index] = e.target.value;
      this.setState({
        selected: [...data]
      });
    },
    checkForDubleErr: e => {
      const selected = [...this.state.selected];
      selected[6] = e.data.movie_count;
      selected[7] = e.data.limit;
      this.setState({ selected: [...selected] });
      if (e.data.movies !== undefined) {
        const data = e.data.movies;
        const unique = e.data.movies
          .map(e => e["id"])
          .map((e, i, final) => final.indexOf(e) === i && i)
          .filter(e => data[e])
          .map(e => data[e]);
        return unique;
      }
    },
    explore: true,
    loading: true,
    err: null,
    fetch: e => {
      this.setState({ loading: false });
      fetch(e)
        .then(e => e.json())
        .then(e => this.state.checkForDubleErr(e))
        .then(e => {
          if (e) {
            this.setState({ loading: true, data: e, err: null });
          } else {
            this.setState({ loading: true, data: [], err: true });
          }
        });
    },
    addMovies: e => {
      if (e.target.nodeName === "FORM") {
        e.preventDefault();
      }
      const { url, selected } = this.state;
      selected[4] = 1;
      selected[8] = true;
      this.setState({
        pages: [1, 2, 3, 4, 5],
        explore: false
      });

      this.state.fetch(url(selected));
    },
    titleSearch: e => {
      const data = [...this.state.selected];
      data[5] = e.target.value;
      this.setState({
        selected: [...data]
      });
    },

    pagenav: bool => {
      const selected = [...this.state.selected];
      bool ? selected[4]++ : selected[4]--;
      this.setState({ selected: [...selected] });

      this.state.fetch(this.state.url(selected));
      if (bool) {
        if (this.state.selected[4] > 2) {
          this.setState({
            pages: [...[...this.state.pages].map(e => e + 1)]
          });
        }
      } else {
        if (this.state.pages[0] > 1) {
          this.setState({
            pages: [...[...this.state.pages].map(e => e - 1)]
          });
        }
      }
    },
    nextPage: () => {
      if (
        Math.ceil(this.state.selected[6] / this.state.selected[7]) >
        this.state.selected[4]
      ) {
        this.state.pagenav(true);
      }
    },
    prevPage: () => {
      if (this.state.pages[0] > 1 || this.state.selected[4] > 1) {
        this.state.pagenav(false);
      }
    },
    changepage: e => {
      const selected = [...this.state.selected];
      const pages = [...this.state.pages];

      selected[4] = Number(e.target.textContent);
      if (selected[4] >= 3) {
        pages[0] = selected[4] - 2;
        pages[1] = selected[4] - 1;
        pages[2] = selected[4];
        pages[3] = selected[4] + 1;
        pages[4] = selected[4] + 2;
      } else {
        for (let i = 0; i < pages.length; i++) {
          pages[i] = i + 1;
        }
      }

      this.setState({
        pages: [...pages],
        selected: [...selected]
      });
      this.state.fetch(this.state.url(selected));
    },
    firstpage: () => {
      const selected = [...this.state.selected];
      selected[4] = 1;
      this.setState({
        selected: [...selected],
        pages: [1, 2, 3, 4, 5]
      });
      this.state.fetch(this.state.url(selected));
    },
    white:
      "background: rgb(255, 255, 255) !important;color: rgb(0, 0, 0) !important;",
    black: "background: rgb(52, 58, 64) !important;color: white !important;"
  };

  componentDidMount() {
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      if (localStorage.getItem("theme") !== "false") {
        this.setState({ theme: true });
        document.body.style = this.state.white;
      } else {
        this.setState({ theme: false });
        document.body.style = this.state.black;
      }
    }
  }
  render() {
    if (this.state.theme) {
      document.body.style = this.state.white;
    } else {
      document.body.style = this.state.black;
    }
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
