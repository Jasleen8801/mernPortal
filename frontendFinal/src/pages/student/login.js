import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

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
    let isLoggedInAdmin = !!Cookies.get("jwtAdmin");
    if (isLoggedInAdmin) {
      navigate("/admin/profile");
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
      <div className="container">
        <div className="login-box">
          <h2>Student Login</h2>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="userName"
                required
                onChange={handleChange}
                value={user.userName}
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                onChange={handleChange}
                value={user.password}
              />
              <label>Password</label>
              <i
                className="fa fa-eye password-icon"
                onClick={handleTogglePassword}
              ></i>
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
            <a href="/student/signup">Register</a>
          </form>
        </div>
      </div>
    </>
  );
};

export default StudentLogin;
