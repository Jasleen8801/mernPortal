import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../../assets/logo.png";

import "../../styles/student/login.css";

const StudentSignup = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    description: "",
    skills: "",
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const REACT_APP_SERVER = "http://localhost:3000";
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = !!Cookies.get("jwt");
    if (isLoggedIn) {
      navigate("/student/home");
    }
  }, [navigate]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validate = () => {
    let isValid = true;
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (user.userName === "") {
      isValid = false;
      setError("Please enter a username");
    } else if (user.email === "" || !emailRegex.test(user.email)) {
      isValid = false;
      setError("Please enter a valid email");
    }

    let password = user.password;
    if (password === "" || password.length < 8) {
      isValid = false;
      setPasswordError("Password must be at least 8 characters");
    } else if (!passwordRegex.test(password)) {
      isValid = false;
      setPasswordError(
        "Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      );
    }

    if (user.userName === "" || user.email === "" || user.password === "") {
      isValid = false;
      setError("Please fill in all the necessary fields");
    } else {
      setError("");
    }

    return isValid;
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);

      await axios
        .post(`${REACT_APP_SERVER}/student/signup`, user)
        .then((response) => {
          console.log(process.env.REACT_APP_SERVER)
          console.log(response);
          setMessage(response.data.message);
          setIsSubmitting(false);
          navigate("/student/login");
        })
        .catch((err) => {
          console.log(err);
          setError(err.response.data.message);
          setIsSubmitting(false);
        });
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
      <div className="student-login-container">
        <div className="student-login-box">
          <h2 className="student-login-title">Student Signup</h2>
          {error && <div className="student-login-alert">{error}</div>}
          <form className="student-login-form" onSubmit={handleSubmit}>
            <div className="student-login-user-box">
              <input
                type="text"
                name="userName"
                className="student-login-input"
                value={user.userName}
                onChange={handleChange}
                required
              />
              <label className="student-login-label">Username</label>
            </div>
            <div className="student-login-user-box">
              <input
                type="text"
                name="email"
                value={user.email}
                onChange={handleChange}
                className="student-login-input"
                required
              />
              <label className="student-login-label">Email</label>
            </div>
            <div className="student-login-user-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={user.password}
                className="student-login-input"
                onChange={handleChange}
                required
              />
              <label className="student-login-label">Password</label>
              {passwordError && (
                <div className="student-login-alert">{passwordError}</div>
              )}
              <i
                className="fa fa-eye student-login-password-icon"
                onClick={handleTogglePassword}
              ></i>
            </div>
            <div className="student-login-user-box">
              <input
                type="text"
                name="description"
                className="student-login-input"
                value={user.description}
                onChange={handleChange}
                required
              />
              <label className="student-login-label">Description</label>
            </div>
            <div className="student-login-user-box">
              <input
                type="text"
                name="skills"
                value={user.skills}
                className="student-login-input"
                onChange={handleChange}
                required
              />
              <label className="student-login-label">Skills</label>
            </div>

            <button type="submit" disabled={isSubmitting} className="student-login-button">
              {isSubmitting ? "Signing up..." : "Sign up"}
            </button>
            <Link to="/student/login" className="student-login-link-button">
              <button className="student-signup-button">Login</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentSignup;
