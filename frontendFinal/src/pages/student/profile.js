import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const StudentProfile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookie = Cookies.get("jwt");
  const isLoggedIn = !!cookie;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER + "student/home", {
        params: { cookieValue: cookie }
      });
      const { student, message } = response.data;
      setUser(student);
    } catch (error) {
      if(
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
  }

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
    return <div className='container'>
      <p className='lead'>Loading...</p>
    </div>
  } else {
    return (
      <div className='container'>
        <h1>Student Profile</h1>
        <p className='lead'>Welcome {user.userName}</p>
        <p className='lead'>Email: {user.email}</p>
        <p className='lead'>Skills: {user.skills}</p>
        <p className='lead'>Description: {user.description}</p>
        <button onClick={handleSignOut}>Signout</button>
        <Link to="/student/update">
          <button>Update Profile</button>
        </Link>
        <Link to="/jobListings">
          <button>Job Listings</button>
        </Link>
        {error && {error}}
      </div>
    )
  }
}

export default StudentProfile
