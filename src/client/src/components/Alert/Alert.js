import "./Alert.css";
import React, { Component, useState, useEffect } from "react";
import { Link } from "react-router-dom";

class Alert extends Component {
    timer;

    constructor(props) {
        super(props);
        this.state = {
            isActive: true,
        };
    }

    hideAlert = () => {
        this.setState({
            isActive: false,
        });
    };

    componentDidMount = () => {
        this.timer = setTimeout(() => this.hideAlert(), 5000);
    };

    render() {
        if (this.state.isActive) {
            return (
                <div className="alert-container">
                    <div className={this.state.isActive ? "visible" : "hidden"}></div>
                    <div className="close-alert-button" onClick={() => this.hideAlert()}></div>
                    <div className="alert-message">{this.props.message}</div>
                    <Link to="/user/purchased" className="view-purchase-button" onClick={() => this.hideAlert()}>
                        View purchases
                    </Link>
                </div>
            );
        }
    }
}

export default Alert;
