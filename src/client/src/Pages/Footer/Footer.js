import React, { Component } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css'

class Footer extends Component {
    render() {
        return (
            <div className="footer" >
                <div className="footer-up">
                    <div className="footer-content">
                        <div className="footer-subcribe">
                            <div className="footer-logo"></div>
                            <div className="footer-subcribe-more">
                                <h3>227 Nguyen Van Cu Dist 5, HCMC, Vietnam</h3>
                                <h3>altf4.21clc@gmail.com</h3>
                                <h3>+84-12-345678</h3>
                            </div>
                        </div>
                        <div className="footer-each">
                            <h2>Account</h2>
                            <div className="footer-each-more">
                                <div className="footer-page-text">My Account</div>
                                <div className="footer-page-text">Login / Register</div>
                                <div className="footer-page-text">Cart</div>
                                <div className="footer-page-text">Wishlist</div>
                                <div className="footer-page-text">Shop</div>
                            </div>
                        </div>

                        <div className="footer-each">
                            <h2>Support</h2>
                            <div className="footer-each-more">
                                <div className="footer-page-text">Privacy Policy</div>
                                <div className="footer-page-text">Term Of Use</div>
                                <div className="footer-page-text">FAQ</div>
                                <div className="footer-page-text">Contact</div>
                            </div>
                        </div>

                        <div className="footer-follow">
                            <h2>Follow Us</h2>
                            <div className="footer-follow-more">
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer"><FaFacebook className="footer-icon" /></a>
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer"><FaTwitter className="footer-icon" /></a>
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer"><FaInstagram className="footer-icon" /></a>
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer"><FaLinkedin className="footer-icon" /></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-down">
                    <h4>© Copyright ALT+F4 2023. All rights reserved</h4>
                </div>

            </div>
        )
    }
};

export default Footer;
