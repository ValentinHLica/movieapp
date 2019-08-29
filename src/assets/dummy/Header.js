import React from "react";
import { Link } from "react-router-dom";

import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { Consumer } from "../Context";
export default function Header() {
  return (
    <Consumer>
      {value => {
        const changetheme = changetheme => {
          changetheme();
        };
        return (
          <nav
            className={`navbar navbar-expand-lg navbar-light ${
              !value.theme ? "darktheme-header" : "whitetheme-header"
            }`}
            style={{ position: "sticky", top: "0", zIndex: "666" }}
          >
            <div className="container">
              <Link
                className="btn btn-warning mbtn"
                to="/"
                style={{ fontSize: "1.1rem" }}
              >
                <i className="fas fa-film pr-2" />
                MovieZ
              </Link>
              <ButtonGroup>
                <Link to="/search" className="btn text-white bg-dark mbtn">
                  <i className="fas fa-search pr-2" />
                  Browse Movies
                </Link>
                <Button
                  variant="dark"
                  onClick={changetheme.bind(this, value.changetheme)}
                  className="mbtn"
                >
                  <i
                    className="fas fa-adjust"
                    style={value.theme ? { transform: "rotate(180deg)" } : null}
                  />
                </Button>
              </ButtonGroup>
            </div>
          </nav>
        );
      }}
    </Consumer>
  );
}
