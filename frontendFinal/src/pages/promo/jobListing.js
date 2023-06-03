import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookie = Cookies.get("jwt");
  const isLoggedIn = !!cookie;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + "job/getJobs"
      );
      setJobs(response.data.jobs);
      setBusinesses(response.data.businesses);

      const userResponse = await axios.get(
        process.env.REACT_APP_SERVER + "student/home",
        {
          params: { cookieValue: cookie },
        }
      );
      setUser(userResponse.data.student);
      console.log(userResponse.data.student);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getBusinessName = (businessId) => {
    const business = businesses.find((b) => b._id === businessId);
    return business ? business.userName : "Unknown Business";
  };

  const applyForJob = async (jobId) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER + `student/job/apply/${jobId}`,
        {
          userId: user._id,
        }
      );
      console.log(response.data.message);
      fetchData();
    } catch (error) {
      console.error(error.response.data.message);
      setError(error.response.data.message);
    }
  };

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
      <div className="container">
        <h1>All Jobs</h1>
        {jobs.map((job) => (
          <div key={job._id}>
            <h3>{job.title}</h3>
            <p>Description: {job.description}</p>
            <p>Posted by: {getBusinessName(job.company)}</p>
            <button onClick={() => applyForJob(job._id)}>Apply</button>
          </div>
        ))}
      </div>
    );
  }
};

export default JobListing;
