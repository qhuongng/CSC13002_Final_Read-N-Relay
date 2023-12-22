import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.css";
import axios from 'axios';
import * as API from "../../utils/API.js";
import { useNavigate } from 'react-router-dom';
import Alert from "../../components/Alert/Alert";


const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    Password: '',
    RepeatPassword: ''
  });
  const [error, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`${API.API_BASE_URL}/users?email=${email}`);
      if (response.status === 200 && response.data && response.data.length > 0) {
        console.log('User already exists:', response.data)
        return true;
      }
    } catch (error) {
      console.log('This is new user!!')
    }
    return false;
  };


  const handleSubmit = async (e) => {
    setErrorMessage("");
    e.preventDefault();

    // kiểm tra định dạng email 
    const regex =/\w+@gmail\.com/;
    const isValidEmail = regex.test(formData.Email);
    if (!isValidEmail) {
      setErrorMessage('Invalid email format !');
      return;
    }
    else {
      // kiểm tra sự tồn tại của email
      const emailCheck = await checkEmailExists(formData.Email);
      if (emailCheck) {
        setErrorMessage('User already exists !');
        return;
      }
      else {
        // kiểm tra xem password và repeat password có match không
        setErrorMessage("");
        if (formData.Password != formData.RepeatPassword) {
          setErrorMessage('Password do not match !');
          return;
        }
        else{
          // kiểm tra có field nào để trống không
          for (const key in formData) {
            if (formData[key] === '') {
              setErrorMessage('Please fill in all fields!');
              return;
            }
          }
        
        }
      }

      try {
        const response = await API.signupUser({
          name: formData.Name,
          email: formData.Email,
          password: formData.Password
        });

        console.log('User signed up successfully:', response);
        navigate("/login");

      } catch (error) {
        console.error('Error signing up user:', error);
      }
    }
  };

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
            <input
              type="text"
              name="Name"
              placeholder=""
              required
              value={formData.Name}
              onChange={handleChange}
            />
            <label>Name</label>
          </div>

          <div className="signup-input-group">
            <input
              type="text"
              name="Email"
              placeholder=""
              required
              value={formData.Email}
              onChange={handleChange}
            />
            <label>Email</label>
          </div>

          <div className="signup-input-group">
            <input
              type="password"
              name="Password"
              placeholder=""
              required
              value={formData.Password}
              onChange={handleChange}
            />
            <label>Password</label>
          </div>

          <div className="signup-input-group">
            <input
              type="password"
              name="RepeatPassword"
              placeholder=""
              required
              value={formData.RepeatPassword}
              onChange={handleChange}
            />
            <label>Repeat password</label>
          </div>
        </div>

        <div className="signup-other">
          <button onClick={handleSubmit} className="signup-button">
            Create account
          </button>
          {error && <Alert message={error} type="notype" />}
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
};

export default Signup;