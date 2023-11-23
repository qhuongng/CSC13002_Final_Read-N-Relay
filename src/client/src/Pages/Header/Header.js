import { FaSearch } from 'react-icons/fa';
import React, { Component } from "react";
import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
        };
    }

    handleSearchChange = (event) => {
        this.setState({ searchValue: event.target.value });
    };

    handleSearch = () => {
        // Implement your search logic here
        console.log('Searching for:', this.state.searchValue);
        // You can add additional logic here, such as making an API call or updating state.
    };

    render() {
        const { isLoggedIn, onLogout } = this.props;

        return (
            <div className="header">
                <div className="header-content">
                    <div className="header-logo"></div>

                    <div className="header-pages">
                        <div className="header-page-each">Home</div>
                        <div className="header-page-each">All Books</div>
                        {isLoggedIn ?
                            <div className="header-page-each">Log out</div>
                            :
                            <div className="header-page-each">Sign up</div>
                        }
                    </div>

                    <div className='header-search'>
                        <div className="header-search-containter">
                            <input
                                type="text"
                                placeholder="Search by title, author, ISBN, ..."
                                value={this.state.searchValue}
                                onChange={this.handleSearchChange}
                                className='header-search-box'
                                style={{ border: 'None' }}
                            />
                            <button onClick={this.handleSearch} style={{ border: 'None', backgroundColor: 'rgb(247, 247, 247)' }}><FaSearch className="header-icon-search" /></button>
                        </div>
                    </div>

                    {isLoggedIn && (
                        <div className='header-users-container'>
                            <div className='header-icon-cart'></div>
                            <div className='header-icon-user'></div>
                        </div>
                    )}
                </div >
            </div >
        )
    }
};

export default Header;

