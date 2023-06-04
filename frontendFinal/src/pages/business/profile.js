import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const BusinessProfile = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookie = Cookies.get("jwtBusiness");
  const isLoggedIn = !!cookie;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + "business/home",
        {
          params: { cookieValue: cookie },
        }
      );
      const { business, jobs, message } = response.data;
      setUser(business);
      setJobs(jobs);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.staus <= 500
      ) {
        setError(error.response.data.message);
        navigate("/business/login");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
    setIsLoading(false);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    Cookies.remove("jwtBusiness");
    navigate("/business/login");
  };

  const deleteJob = async (jobId) => {
    try {
      let businessId = user._id;
      const url =
        process.env.REACT_APP_SERVER +
        `business/${businessId}/deleteJob/${jobId}`;
      await axios.delete(url);
      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (cookie) {
      fetchData();
    } else {
      setTimeout(() => {
        navigate("/business/login");
      }, 0);
    }
  }, [cookie, navigate]);

  if (!isLoggedIn) {
    navigate("/business/login");
  } else if (isLoading) {
    return (
      <div className="container">
        <p className="lead">Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Business Profile</h1>
        <div>
          <h3>Company Name: {user.userName}</h3>
          <p>Email: {user.email}</p>
          <p>userId: {user._id}</p>
        </div>
        <div>
          {jobs.length && <h2>Jobs</h2>}
          {jobs.map((job) => (
            <div key={job._id}>
              <h4>{job.title}</h4>
              <p>
                Description: {job.description} <br />
                Location: {job.location}
              </p>
              <button>View Applicants</button>
              <button onClick={() => deleteJob(job._id)}>Delete Job</button>
            </div> 
          ))}{" "}
          <br />
        </div>
        <button onClick={handleSignOut}>Sign Out</button>
        <Link to="/business/update">
          <button>Update Profile</button>
        </Link>
        <Link to="/business/addJob">
          <button>Add a Job</button>
        </Link>
      </div>
    );
  }
};

export default BusinessProfile;
