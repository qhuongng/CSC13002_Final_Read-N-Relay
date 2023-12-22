import { FaSearch } from "react-icons/fa";
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import withRouter from "../../utils/HookWrapper";
import * as API from "../../utils/API.js"
import "./Header.css";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: "",
            isLoggedIn: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentDidUpdate(prevProps) {
        // Kiểm tra nếu location thay đổi (navigate đến trang khác)
        if (this.props.location.pathname === "/" && prevProps.location.pathname === "/login") {
            if (this.props.location !== prevProps.location) {
                console.log(this.props.location)
                console.log(prevProps.location)
                this.fetchData();
            }
        }
    }

    fetchData = async () => {
        try {
            // Fetch CurrentUserId
            const user = await API.getCurrentUser();
            // Do something with user data if needed
            if (user[0].userId !== -1)
                this.setState({ isLoggedIn: true });
            else
                this.setState({ isLoggedIn: false });
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    handleLogOut = async () => {
        try {
            await API.UpdateCurrentUser(-1);
            this.fetchData();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
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
        const location = this.props.location.pathname;
        const isLoggedIn = this.state.isLoggedIn

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
                            <Link to="/login" className="header-page-each" onClick={this.handleLogOut}>
                                Log out
                            </Link>
                        ) : (
                            <Link to="/login" className="header-page-each">
                                Log in
                            </Link>
                        )}
                    </nav>

                    <div className="header-right">
                        <div className="header-search-container">
                            <input type="text" placeholder="Search for a book..." value={this.state.searchValue} onChange={this.handleSearchChange} className="header-search-box" style={{ border: "None" }} />
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

                        {isLoggedIn && (
                            <div className="header-users-container">
                                <Link to="/add" className="header-icon-add"></Link>
                                <Link to="/cart" className="header-icon-cart"></Link>
                                <Link to="/user/profile" className="header-icon-user"></Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
