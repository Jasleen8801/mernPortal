import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../../styles/admin/profile.css";

const AdminProfile = () => {
  const [admin, setAdmin] = useState([]);
  const [students, setStudents] = useState([]);
  const [businesses, setBusinesses] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const cookie = Cookies.get("jwtAdmin");
  const isLoggedIn = !!Cookies.get("jwtAdmin");

  useEffect(() => {
    if (cookie) {
      const url = process.env.REACT_APP_SERVER + "admin/home";
      fetchData(url);
    } else {
      navigate("/admin/login");
    }
  }, [cookie, navigate]);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url, {
        params: { cookieValue: cookie },
      });
      const { admin, students, businesses, jobs } = response.data;
      setAdmin(admin);
      setStudents(students);
      setBusinesses(businesses);
      setJobs(jobs);
    } catch (err) {
      setError(err.response.data.message);
    }
    setIsLoading(false);
  };

  const deleteStudent = async (studentId) => {
    try {
      const url = process.env.REACT_APP_SERVER + `admin/student/${studentId}`;
      await axios.delete(url);

      setJobs((prevJobs) =>
        prevJobs.map((job) => ({
          ...job,
          applicants: job.applicants.filter(
            (applicant) => applicant.studentID !== studentId
          ),
        }))
      );

      setStudents((prevStudents) =>
        prevStudents.filter((student) => student._id !== studentId)
      );
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const deleteBusiness = async (businessId) => {
    try {
      const url = process.env.REACT_APP_SERVER + `admin/business/${businessId}`;
      await axios.delete(url);
      setBusinesses((prevBusinesses) =>
        prevBusinesses.filter((business) => business._id !== businessId)
      );
      setJobs((prevJobs) =>
        prevJobs.filter((job) => job.company !== businessId)
      );
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const deleteJob = async (jobId) => {
    try {
      const url = process.env.REACT_APP_SERVER + `admin/deleteJob/${jobId}`;
      await axios.delete(url);

      setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));

      setBusinesses((prevBusiness) => ({
        ...prevBusiness,
        jobs: prevBusiness.jobs.filter((job) => job._id !== jobId),
      }));

      setStudents((prevStudents) =>
        prevStudents.map((student) => ({
          ...student,
          appliedJobs: student.appliedJobs.filter((job) => job._id !== jobId),
        }))
      );
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    Cookies.remove("jwtAdmin");
    navigate("/admin/login");
  };

  if (!isLoggedIn) {
    navigate("/admin/login");
  } else if (isLoading) {
    return (
      <div className="container">
        <p className="lead">Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="admin-profile-container">
        <h1 className="admin-profile-heading">Admin Dashboard</h1>

        <Link to="/admin/addBusiness">
          <button className="admin-profile-add-button">Add a Business</button>
        </Link>

        <div className="container">
          <div className="admin-section">
            <h2>Student Information</h2>
            {students.length > 0 ? (
              <ul className="admin-list">
                {students.map((student) => (
                  <li key={student._id}>
                    <p>Username: {student.userName}</p>
                    <button onClick={() => deleteStudent(student._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="admin-no-data">No students found.</p>
            )}
          </div>

          <div className="admin-section">
            <h2>Business Information</h2>
            {businesses.length > 0 ? (
              <ul className="admin-list">
                {businesses.map((business) => (
                  <li key={business._id}>
                    <p>Name: {business.userName}</p>
                    <button onClick={() => deleteBusiness(business._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="admin-no-data">No businesses found.</p>
            )}
          </div>

          <div className="admin-section">
            <h2>Job Information</h2>
            {jobs.length > 0 ? (
              <ul className="admin-list">
                {jobs.map((job) => (
                  <li key={job.id}>
                    <p>Title: {job.title}</p>
                    <button onClick={() => deleteJob(job._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="admin-no-data">No jobs found.</p>
            )}
          </div>
        </div>

        <button onClick={handleSignOut} className="admin-profile-add-button">
          Sign Out
        </button>
      </div>
    );
  }
};

export default AdminProfile;
