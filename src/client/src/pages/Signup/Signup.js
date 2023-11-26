import React, { Component, useState } from "react";
import { Link } from "react-router-dom";

import "./Signup.css";

class Signup extends Component {
  render() {
    return (
      <div className="signup-container">
        <div className="signup-image-container">
          <div className="signup-image"></div>
        </div>
        <div className="signup-info">
          <div className="signup-title">
            <div className="signup-create-account">Create an account</div>
            <div className="signup-enter-below">Enter your details below</div>
          </div>

          <div className="signup-input-container">
            <div className="signup-input-group">
              <input type="text" placeholder=" " required />
              <label>Name</label>
            </div>

            <div className="signup-input-group">
              <input type="email" placeholder=" " required />
              <label>Email</label>
            </div>

            <div className="signup-input-group">
              <input type="password" placeholder=" " required />
              <label>Password</label>
            </div>

            <div className="signup-input-group">
              <input type="password" placeholder=" " required />
              <label>Repeat password</label>
            </div>
          </div>

          <div className="signup-other">
            <button className="signup-button">Create account</button>

            <div className="signup-already-container">
              <div className="signup-already">Already have an account? </div>
              <Link to="/login" className="signup-link">
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup;
