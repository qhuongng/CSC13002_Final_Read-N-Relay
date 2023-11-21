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
                            <img alt="" className="footer-logo"></img>
                            <div className="footer-each-more">
                                <h3>227 Nguyen Van Cu Dist 5, HCMC, Vietnam</h3>
                                <h3>altf4.21clc@gmail.com</h3>
                                <h3>+84-12-345678</h3>
                            </div>
                        </div>
                        <div className="footer-each">
                            <h2>Account</h2>
                            <div className="footer-each-more">
                                <h3>My Account</h3>
                                <h3>Login / Register</h3>
                                <h3>Cart</h3>
                                <h3>Wishlist</h3>
                                <h3>Shop</h3>
                            </div>
                        </div>

                        <div className="footer-each">
                            <h2>Quick Link</h2>
                            <div className="footer-each-more">
                                <h3>Privacy Policy</h3>
                                <h3>Term Of Use</h3>
                                <h3>FAQ</h3>
                                <h3>Contact</h3>
                            </div>
                        </div>

                        <div className="footer-follow">
                            <h2>Follow Us</h2>
                            <div className="footer-follow-more">
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                                <a href="https://www.facebook.com/dinhchhoang" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
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
