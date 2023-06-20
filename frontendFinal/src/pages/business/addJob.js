import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const BusinessAddJob = () => {
  const [business, setBusiness] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    industry: "",
    skillsRequired: "",
    salary: "",
    experienceLevel: "",
    applicationDeadline: "",
  });

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
      const { business, message } = response.data;
      setBusiness(business);
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

  useEffect(() => {
    if (cookie) {
      fetchData();
    } else {
      setTimeout(() => {
        navigate("/business/login");
      }, 0);
    }
  }, [cookie, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let businessId = business._id;
      // console.log(businessId);
      const response = await axios.post(
        process.env.REACT_APP_SERVER + `business/${businessId}/addJob`,
        formData
      );
      // console.log(response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  if (!isLoggedIn) {
    navigate("/business/login");
  } else if (isLoading) {
    return (
      <div className="container">
        <h1>Loading...</h1>
      </div>
    );
  } else {
    return (
      <div className="business-update-container">
        <div className="container">
          <h1>Add Job</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Title:</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Description:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            <div>
              <label>Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Industry:</label>
              <input
                type="text"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Skills Required:</label>
              <input
                type="text"
                name="skillsRequired"
                value={formData.skillsRequired}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Salary:</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Experience Level:</label>
              <input
                type="text"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Application Deadline:</label>
              <input
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Add Job</button>
          </form>
          {message && <p>{message}</p>}
          <br/>
          <Link to="/business/profile">
            <button>Profile</button>
          </Link>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
    );
  }
};

export default BusinessAddJob;
