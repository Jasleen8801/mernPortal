import React, { useState, useEffect } from 'react'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

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
      <div className="container">
        <div className="login-box">
          <h2>Business Login</h2>
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
            <button type="submit">
              Login
            </button>
            <Link to="/business/signup">
              <button>Signup</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default BusinessLogin
