import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../../styles/student/jobListing.css";

const StudentAppliedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [user, setUser] = useState({});
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookie = Cookies.get("jwt");
  const isLoggedIn = !!cookie;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const responseJobs = await axios.get(
        process.env.REACT_APP_SERVER + "job/getJobs"
      );
      setJobs(responseJobs.data.jobs);
      setBusinesses(responseJobs.data.businesses);

      const responseUser = await axios.get(
        process.env.REACT_APP_SERVER + "student/home",
        {
          params: { cookieValue: cookie },
        }
      );
      setUser(responseUser.data.student);

      const responseAppliedJobs = await axios.get(
        process.env.REACT_APP_SERVER + "student/jobs/applied",
        {
          params: { cookieValue: cookie },
        }
      );
      setAppliedJobs(responseAppliedJobs.data.appliedJobs);
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

  const withdrawJob = async (jobId) => {
    console.log(cookie);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + `student/job/withdraw/${jobId}`,
        {
          params: { cookieValue: cookie },
        }
      );
      console.log(response.data.message);
      fetchData();
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const getBusinessName = (businessId) => {
    const business = businesses.find((b) => b._id === businessId);
    return business ? business.userName : "Unknown Business";
  };

  if (!isLoggedIn) {
    navigate("/student/login");
    return null; // Render nothing while redirecting
  }

  if (isLoading) {
    return (
      <div className="container">
        <p className="lead">Loading...</p>
      </div>
    );
  }

  return (
    <div className="student-job-listing-container">
      <div className="container">
        <h1 className="student-job-listing-heading">Applied Jobs</h1>
        <div className="student-job-listings-gradient-cards">
          {appliedJobs.map((job) => (
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
                  onClick={() => withdrawJob(job._id)}
                  className="btn btn-outline-secondary"
                >
                  Withdraw
                </button>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-danger">{error}</p>}
        <br />
        <div className="btn-group" role="group" aria-label="Basic example">
          <button
            onClick={handleSignOut}
            type="button"
            className="btn btn-secondary"
          >
            Sign Out
          </button>
          <button
              type="button"
              class="btn btn-secondary"
              onClick={() => navigate("/student/jobListings")}
            >
              Job Listings
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
};

export default StudentAppliedJobs;
