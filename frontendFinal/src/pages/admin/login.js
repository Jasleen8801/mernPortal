import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Cookies from "js-cookie";
import "../../styles/admin/login.css";

const AdminLogin = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setUser({ ...user, [input.name]: input.value });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    let isLoggedIn = !!Cookies.get("jwtAdmin");
    if (isLoggedIn) {
      navigate("/admin/profile");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = process.env.REACT_APP_SERVER + "admin/login";
      const response = await axios.post(url, user);
      const cookie = response.data.access;
      Cookies.set("jwtAdmin", cookie);
      navigate("/admin/profile");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, please try again later.");
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
      <div className="admin-login-container">
        <div className="admin-login-box">
          <h2 className="admin-login-title">Admin Login</h2>
          {error && <div className="admin-login-alert">{error}</div>}
          <form className="admin-login-form" onSubmit={handleSubmit}>
            <div className="admin-login-user-box">
              <input
                type="text"
                name="userName"
                required
                className="admin-login-input"
                onChange={handleChange}
                value={user.userName}
              />
              <label className="admin-login-label">Username</label>
            </div>
            <div className="admin-login-user-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="admin-login-input"
                onChange={handleChange}
                value={user.password}
              />
              <label className="admin-login-label">Password</label>
              <i
                className="fa fa-eye admin-login-password-icon"
                onClick={handleTogglePassword}
              ></i>
            </div>
            <button type="submit" className="admin-login-button">Login</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
