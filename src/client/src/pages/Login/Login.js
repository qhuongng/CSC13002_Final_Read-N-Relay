import React, { useState } from "react";
import * as API from "../../utils/API.js";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const userProfile = await API.getUserProfileByAttributes({ email: email, password: password });
  
      if (userProfile && userProfile.length > 0) {
        // User authenticated, redirect to Home
        console.log("Login successful");
      } else {
        console.log("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

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
            <input
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          <div className="login-input-group">
            <input
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
          </div>
        </div>

        <div className="login-other">
          <button className="login-button" onClick={handleLogin}>
            Log in
          </button>
          {error && <div className="login-error">{error}</div>}
          <div className="login-forgot-and-sign-up">
            <div className="login-link">Forgot password?</div>
          </div>
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
};

export default Login;
