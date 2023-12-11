import { FaSearch } from "react-icons/fa";
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import withRouter from "../../utils/HookWrapper";

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
        const { isLoggedIn } = this.props;
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
                        <NavLink to="/" className="header-page-each">
                            Home
                        </NavLink>
                        <NavLink to="/books" className="header-page-each">
                            All books
                        </NavLink>
                        {isLoggedIn ? (
                            <Link to="/login" className="header-page-each">
                                Log out
                            </Link>
                        ) : (
                            <Link to="/login" className="header-page-each">
                                Log in
                            </Link>
                        )}
                    </nav>

                    <div className="header-search">
                        <div className="header-search-container">
                            <input type="text" placeholder="Search by title, author, ISBN,..." value={this.state.searchValue} onChange={this.handleSearchChange} className="header-search-box" style={{ border: "None" }} />
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
                            <Link to="/add" className="header-icon-add"></Link>
                            <Link to="/cart" className="header-icon-cart"></Link>
                            <Link to="/user/profile" className="header-icon-user"></Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
