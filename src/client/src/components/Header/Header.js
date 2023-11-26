import { FaSearch } from "react-icons/fa";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../wrappers/HookWrapper";

import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
    };
  }

  handleSearchChange = (event) => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    // Implement your search logic here
    console.log("Searching for:", this.state.searchValue);
    // You can add additional logic here, such as making an API call or updating state.
  };

  render() {
    const { isLoggedIn, onLogout } = this.props;
    const location = this.props.location.pathname;

    if (location === "/login" || location === "/signup") {
      return (
        <div className="header">
          <div className="header-content-centered">
            <Link to="/" className="header-logo-centered"></Link>
          </div>
        </div>
      );
    }

    return (
      <div className="header">
        <div className="header-content">
          <Link to="/" className="header-logo"></Link>

          <nav className="header-pages">
            <Link to="/" className="header-page-each">
              Home
            </Link>
            <Link to="/books" className="header-page-each">
              All books
            </Link>
            {isLoggedIn ? (
              <Link to="/" className="header-page-each">
                Log out
              </Link>
            ) : (
              <Link to="/signup" className="header-page-each">
                Sign up
              </Link>
            )}
          </nav>

          <div className="header-search">
            <div className="header-search-container">
              <input
                type="text"
                placeholder="Search by title, author, ISBN,..."
                value={this.state.searchValue}
                onChange={this.handleSearchChange}
                className="header-search-box"
                style={{ border: "None" }}
              />
              <button
                onClick={this.handleSearch}
                style={{
                  border: "None",
                  backgroundColor: "rgb(247, 247, 247)",
                }}
              >
                <FaSearch className="header-icon-search" />
              </button>
            </div>
          </div>

          {isLoggedIn && (
            <div className="header-users-container">
              <div className="header-icon-cart"></div>
              <div className="header-icon-user"></div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(Header);
