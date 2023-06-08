import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../../styles/student/login.css";

import logo from "../../assets/logo.png"

const StudentLogin = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ userName: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = !!Cookies.get("jwt");
    if (isLoggedIn) {
      navigate("/student/profile");
    }
  }, [navigate]);

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_SERVER + "student/login";
      const response = await axios.post(url, user);
      const jwt = response.data.access;
      Cookies.set("jwt", jwt);
      navigate("/student/profile");
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
                <Link className="nav-link" to="/promo">
                  Promo Page
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="student-login-container">
        <div className="student-login-box">
          <h2 className="student-login-title">Student Login</h2>
          {error && <div className="student-login-alert">{error}</div>}
          <form className="student-login-form" onSubmit={handleSubmit}>
            <div className="student-login-user-box">
              <input
                type="text"
                name="userName"
                required
                className="student-login-input"
                onChange={handleChange}
                value={user.userName}
              />
              <label className="student-login-label">Username</label>
            </div>
            <div className="student-login-user-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="student-login-input"
                onChange={handleChange}
                value={user.password}
              />
              <label className="student-login-label">Password</label>
              <i
                className="fa fa-eye student-login-password-icon"
                onClick={handleTogglePassword}
              ></i>
            </div>
            <button type="submit" className="student-login-button">
              Login
            </button>
            <Link to="/student/signup" className="student-login-link-button">
              <button className="student-signup-button">Signup</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
