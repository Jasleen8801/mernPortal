import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../../styles/student/jobListing.css";

const StudentJobListing = () => {
  const [jobs, setJobs] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
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
      // console.log(userResponse.data.student);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSignOut = () => {
    Cookies.remove("jwt");
    navigate("/student/login");
  };

  const getBusinessName = (businessId) => {
    const business = businesses.find((b) => b._id === businessId);
    return business ? business.userName : "Unknown Business";
  };

  const applyForJob = async (jobId) => {
    try {
      const response = await axios.post(
        process.env.REACT_APP_SERVER + `student/job/apply/${jobId}`,
        { userId: user._id, jobId: jobId }
      );
      setMessage(response.data.message);
      // console.log(response.data.message);
      // console.log(user._id, jobId);
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
      <div className="student-job-listing-container">
        <div className="container">
          <h1 className="student-job-listing-heading">Job Listings</h1>
          <div className="student-job-listings-gradient-cards">
            {jobs.map((job) => (
              <div key={job._id} className="student-job-listings-card">
                <div className="student-job-listings-container-card">
                  <Link
                    to={`/custom/job/${job._id}`}
                    className="student-job-listings-link"
                  >
                    <h3>{job.title}</h3>
                  </Link>
                  <p>Description: {job.description}</p>
                  <Link
                    to={`/custom/business/${job.company}`}
                    className="student-job-listings-link"
                  >
                    <p>Posted by: {getBusinessName(job.company)}</p>
                  </Link>
                  <button
                    onClick={() => applyForJob(job._id)}
                    className="btn btn-outline-secondary"
                  >
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
          {message && <p>{message}</p>}
          <br />
          <div class="btn-group" role="group" aria-label="Basic example">
            <button
              type="button"
              class="btn btn-secondary"
              onClick={handleSignOut}
            >
              Signout
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => navigate("/student/appliedJobs")}
            >
              Applied Jobs
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              onClick={() => navigate("/student/profile")}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default StudentJobListing;
