import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CustomJobProfile = () => {
  const { jobId } = useParams();

  const [job, setJob] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + `custom/getJob/${jobId}`
      );
      setJob(response.data.job);
      // console.log(response.data.job);
    } catch (error) {
      setError(error.response.data.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <p className="lead">Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Job Profile</h1>
        <div>
          <h3>Job Title: {job.title}</h3>
          <p>Job Description: {job.description}</p>
          <p>Location: {job.location}</p>
          <p>Industry: {job.industry}</p>
          <p>Skills Required: {job.skillsRequired}</p>
          <p>Salary: {job.salary}</p>
          <p>Experience Level: {job.experienceLevel}</p>
          <p>Application Deadline: {job.applicationDeadline}</p>
        </div>
      </div>
    );
  }
};

export default CustomJobProfile;
