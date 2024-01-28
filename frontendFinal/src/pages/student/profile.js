import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../../styles/student/profile.css";
import logo from "../../assets/logo.png";

const StudentProfile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const REACT_APP_SERVER = "http://localhost:3000";

  const navigate = useNavigate();

  const cookie = Cookies.get("jwt");
  const isLoggedIn = !!cookie;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        REACT_APP_SERVER + "/student/home",
        {
          params: { cookieValue: cookie },
        }
      );
      const { student, message } = response.data;
      setUser(student);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.staus <= 500
      ) {
        setError(error.response.data.message);
        navigate("/student/login");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
    setIsLoading(false);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    Cookies.remove("jwt");
    navigate("/student/login");
  };

  useEffect(() => {
    if (cookie) {
      fetchData();
    } else {
      setTimeout(() => {
        navigate("/student/login");
      }, 0);
    }
  }, [cookie, navigate]);

  if (!isLoggedIn) {
    navigate("/student/login");
  } else if (isLoading) {
    return (
      <div className="container">
        <p className="lead">Loading...</p>
      </div>
    );
  } else {
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
        <div className="student-profile-container">
          <div className="container">
            <h1 className="student-profile-heading">Welcome {user.userName}</h1>
            <p className="student-profile-lead">Email: {user.email}</p>
            <p className="student-profile-lead">Skills: {user.skills}</p>
            <p className="student-profile-lead">
              Description: {user.description}
            </p>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSignOut}
              >
                Signout
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/student/update")}
              >
                Update Profile
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/student/jobListings")}
              >
                Job Listings
              </button>
            </div>
          </div>
          {error && <p className="student-profile-error">{error}</p>}
        </div>
      </>
    );
  }
};

export default StudentProfile;
