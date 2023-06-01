import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AdminSignup = () => {
  const [user, setUser] = useState({
    userName: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isLoggedIn = !!Cookies.get("jwt");
    if (isLoggedIn) {
      navigate("/student/home");
    }
    let isLoggedInAdmin = !!Cookies.get("jwtAdmin");
    if (isLoggedInAdmin) {
      navigate("/admin/home");
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
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
    if (user.userName === "") {
      isValid = false;
      setError("Please enter a username");
    }

    let password = user.password;
    if (password === "" || password.length < 8) {
      isValid = false;
      setPasswordError("Password must be at least 8 characters");
    } else if (!passwordRegex.test(password)) {
      isValid = false;
      setPasswordError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validate()) {
      setIsSubmitting(true);
      axios
        .post("http://localhost:3000/admin/signup", user)
        .then((response) => {
          console.log(response);
          setMessage(response.data.message);
          setIsSubmitting(false);
          navigate("/admin/login");
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.message);
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="container">
      <div className="signup-box">
        <h2>Admin Signup</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {message && <div className="alert alert-success">{message}</div>}
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type="text"
              name="userName"
              value={user.userName}
              onChange={handleChange}
              required
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
            <i
              className="fa fa-eye password-icon"
              onClick={handleTogglePassword}
            ></i>
            {passwordError && (
              <div className="alert alert-danger">{passwordError}</div>
            )}
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing up..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminSignup
