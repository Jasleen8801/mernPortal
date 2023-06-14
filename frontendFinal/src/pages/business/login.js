import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../../styles/business/login.css";

import logo from "../../assets/logo.png";

const BusinessLogin = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedInBusiness = !!Cookies.get("jwtBusiness");
    if (isLoggedInBusiness) {
      navigate("/business/profile");
    } 
  });

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_SERVER + "business/login";
      const response = await axios.post(url, user);
      const cookie = response.data.access;
      Cookies.set("jwtBusiness", cookie);
      navigate("/business/profile");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="navbar--logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Promo Page
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='business-login-container'>
        <div className='business-login-box'>
          <h2 className='business-login-title'>Business Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form className='business-login-form' onSubmit={handleSubmit}>
            <div className='business-login-user-box'>
              <input
                type="text"
                name="userName"
                required
                className='business-login-input'
                onChange={handleChange}
                value={user.userName}
              />
              <label className='business-login-label'>Username</label>
            </div>
            <div className='business-login-user-box'>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className='business-login-input'
                onChange={handleChange}
                value={user.password}
              />
              <label className='business-login-label'>Password</label>
              <i
                className="fa fa-eye password-icon business-login-password-icon"
                onClick={handleTogglePassword}
              ></i>
            </div>
            <button type="submit" className='business-login-button'>
              Login
            </button>
            <Link to="/business/signup" className='business-login-link-button'>
              <button className='business-signup-button'>Signup</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default BusinessLogin
