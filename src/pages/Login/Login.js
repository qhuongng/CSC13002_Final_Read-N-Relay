import React, { useState } from "react";
import * as API from "../../utils/API.js";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import Alert from "../../components/Alert/Alert";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const regex = /\w+@gmail\.com/;
    setError("");
    try {
      const userProfile = await API.getUserProfileByAttributes({ email: email, password: password });
      if (password === '') {
        console.log("Please fill in all fields !");
        setError("Please fill in all fields.");
      }
      else if (!regex.test(email)) {
        console.log("Invalid email format !");
        setError("Invalid email format.");
        setEmail("");
      }
      else if (userProfile && userProfile.length > 0) {
        // User authenticated, redirect to Home
        console.log("Login successful !");
        await API.UpdateCurrentUser(userProfile[0].id);
        navigate('/');
      } else {
        console.log("Invalid email or password !");
        setError("Invalid email or password.");
        setPassword("");
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
          {error && <Alert message={error} type="notype" />}
          {/* {error && <div className="login-error">{error}</div>} */}
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