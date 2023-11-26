import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
  render() {
    return (
      <div className="login-container">
        <div className="login-image-container">
          <div className="login-image"></div>
        </div>

        <div className="login-info">
          <div className="login-title">
            <div className="login-create-account">Welcome back!</div>
            <div className="login-enter-below">Enter your details below</div>
          </div>

          <div className="login-input-container">
            <div className="login-input-group">
              <input type="email" placeholder=" " required />
              <label>Email</label>
            </div>

            <div className="login-input-group">
              <input type="password" placeholder=" " required />
              <label>Password</label>
            </div>
          </div>

          <div className="login-other">
            <button className="login-button">Log in</button>
            <div className="login-link">Forgot password?</div>
          </div>

          <div className="login-already-container">
            <div className="login-already">New here? </div>
            <Link to="/signup" className="login-link">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
