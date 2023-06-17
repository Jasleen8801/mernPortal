import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "../../styles/business/update.css";

const BusinessUpdate = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    companyName: "",
    email: "",
    companyDescription: "",
    companyLocation: "",
    website: "",
    industry: "",
    companySize: "",
    foundedYear: "",
    contactEmail: "",
    contactNumber: "",
  });
  const [error, setError] = useState("");
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
      const business = response.data.business;
      // console.log(business);
      setUser(business);
      setFormData({
        userName: business.userName,
        companyName: business.companyName || "",
        email: business.email,
        companyDescription: business.companyDescription || "",
        companyLocation: business.companyLocation || "",
        website: business.website || "",
        industry: business.industry || "",
        companySize: business.companySize || "",
        foundedYear: business.foundedYear || "",
        contactEmail: business.contactEmail || "",
        contactNumber: business.contactNumber || "",
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        setError(error.response.data.message);
        navigate("/business/login");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        process.env.REACT_APP_SERVER + "business/update/" + user._id,
        formData
      );
      console.log(response.data);
      const bus = response.data.business;
      setUser(bus);
      setError(null);
      navigate("/business/profile");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <div className="business-update-container">
        <div className="container">
          <h1>Update Profile</h1>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="userName">Username</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={formData.userName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="companyName">Company Name</label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="companyDescription">Company Description</label>
              <textarea
                id="companyDescription"
                name="companyDescription"
                value={formData.companyDescription || ""}
                onChange={handleChange}
              ></textarea>
            </div>
            <div>
              <label htmlFor="companyLocation">Company Location</label>
              <input
                type="text"
                id="companyLocation"
                name="companyLocation"
                value={formData.companyLocation || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="website">Website</label>
              <input
                type="text"
                id="website"
                name="website"
                value={formData.website || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="industry">Industry</label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="companySize">Company Size</label>
              <input
                type="text"
                id="companySize"
                name="companySize"
                value={formData.companySize || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="foundedYear">Founded Year</label>
              <input
                type="number"
                id="foundedYear"
                name="foundedYear"
                value={formData.foundedYear || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="contactEmail">Contact Email</label>
              <input
                type="email"
                id="contactEmail"
                name="contactEmail"
                value={formData.contactEmail || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                type="tel"
                id="contactNumber"
                name="contactNumber"
                value={formData.contactNumber || ""}
                onChange={handleChange}
              />
            </div>
            <button type="submit" disabled={isLoading}>
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default BusinessUpdate;
