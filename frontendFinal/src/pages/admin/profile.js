import React, { useState, useEffect } from 'react';
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
  const cookie = Cookies.get('jwtAdmin');
  const isLoggedIn = !!Cookies.get("jwtAdmin");

  useEffect(() => {
    let isLoggedInUser = !!Cookies.get('jwt');
    if(isLoggedInUser) {
      navigate('/student/profile');
    }
    if(cookie) {
      const url = process.env.REACT_APP_SERVER + "admin/home";
      fetchData(url);
    } else {
      navigate('/admin/login')
    }
  }, [cookie, navigate]);

  const fetchData = async (url) => {
    setIsLoading(true);
    try {
      const response = await axios.get(url, {
        params: { cookieValue: cookie }
      });
      const { admin, students, businesses, jobs } = response.data;
      setAdmin(admin);
      setStudents(students);
      setBusinesses(businesses);
      setJobs(jobs);
    } catch(err) {
      setError(err.response.data.message);
    }
    setIsLoading(false);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    Cookies.remove('jwtAdmin');
    navigate('/admin/login');
  }

  return (
    <div className='container'>
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
            <li key={student.id}>
              <p>Username: {student.userName}</p>
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
            <li key={business.id}>
              <p>Name: {business.name}</p>
              {/* Display other business data as needed */}
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

export default AdminProfile;
