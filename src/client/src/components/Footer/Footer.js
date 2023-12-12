import React, { Component } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";
import withRouter from "../../utils/HookWrapper";
import "./Footer.css";

class Footer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const location = this.props.location.pathname;

        if (location === "/login" || location === "/signup") {
            return (
                <div className="footer">
                    <div className="footer-down">
                        <h4>© Copyright ALT+F4 2023. All rights reserved</h4>
                    </div>
                </div>
            );
        }

        return (
            <div className="footer">
                <div className="footer-up">
                    <div className="footer-content">
                        <div className="footer-subcribe">
                            <Link to="/" className="footer-logo"></Link>
                            <div className="footer-subcribe-more">
                                <h3>227 Nguyen Van Cu Dist 5, HCMC, Vietnam</h3>
                                <h3>altf4.21clc@gmail.com</h3>
                                <h3>+84-12-345678</h3>
                            </div>
                        </div>
                        <div className="footer-each">
                            <h2>Account</h2>
                            <div className="footer-each-more">
                                <Link className="footer-page-text" to="/user/profile">
                                    My account
                                </Link>
                                <Link className="footer-page-text" to="/cart">
                                    Cart
                                </Link>
                                <Link className="footer-page-text" to="/books">
                                    All books
                                </Link>
                            </div>
                        </div>

                        <div className="footer-each">
                            <h2>Support</h2>
                            <div className="footer-each-more">
                                <div className="footer-page-text">Privacy Policy</div>
                                <div className="footer-page-text">Terms of Use</div>
                                <div className="footer-page-text">FAQ</div>
                                <div className="footer-page-text">Contact</div>
                            </div>
                        </div>

                        <div className="footer-follow">
                            <h2>Follow us</h2>
                            <div className="footer-follow-more">
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer">
                                    <FaFacebook className="footer-icon" />
                                </a>
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter className="footer-icon" />
                                </a>
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer">
                                    <FaInstagram className="footer-icon" />
                                </a>
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer">
                                    <FaLinkedin className="footer-icon" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-down">
                    <h4>© Copyright ALT+F4 2023. All rights reserved</h4>
                </div>
            </div>
        );
    }
}

export default withRouter(Footer);
