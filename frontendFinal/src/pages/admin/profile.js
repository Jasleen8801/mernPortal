import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

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
      // console.log(response.data);
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
        jobs: prevBusiness.jobs.filter((job) => job._id !== jobId)
      }));
  
      setStudents((prevStudents) =>
        prevStudents.map((student) => ({
          ...student,
          appliedJobs: student.appliedJobs.filter((job) => job._id !== jobId)
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
    <div className="container">
      <p className="lead">Loading...</p>
    </div>;
  } else {
    return (
      <div className="container">
        <h1>Admin Profile</h1>

        <Link to="/admin/addBusiness">
          <button>Add a Business</button>
        </Link>

        <h2>Admin Information</h2>
        {admin && (
          <div>
            <p>Username: {admin.userName}</p>
            {/* Display other admin data as needed */}
          </div>
        )}

        <h2>Student Information</h2>
        {students.length > 0 ? (
          <ul>
            {students.map((student) => (
              <li key={student._id}>
                <p>Username: {student.userName}</p>
                <button onClick={() => deleteStudent(student._id)}></button>
                {/* Display other student data as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No students found.</p>
        )}

        <h2>Business Information</h2>
        {businesses.length > 0 ? (
          <ul>
            {businesses.map((business) => (
              <li key={business._id}>
                <p>Name: {business.userName}</p>
                <button onClick={() => deleteBusiness(business._id)}></button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No businesses found.</p>
        )}

        <h2>Job Information</h2>
        {jobs.length > 0 ? (
          <ul>
            {jobs.map((job) => (
              <li key={job.id}>
                <p>Title: {job.title}</p>
                <button onClick={() => deleteJob(job._id)}></button>
                {/* Display other job data as needed */}
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs found.</p>
        )}

        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }
};

export default AdminProfile;
