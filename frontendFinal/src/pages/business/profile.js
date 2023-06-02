import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const BusinessProfile = () => {
  const [business, setBusiness] = useState({});
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookie = Cookies.get("jwtBusiness");
  const isLoggedIn = !!cookie;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER + "business/home", {
        params: { cookieValue: cookie },
      });
      console.log(response.data);
      const { business, jobs, message } = response.data;
      setBusiness(business);
      setJobs(jobs);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        navigate("/business/login");
      } else {
        setError("Something went wrong");
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

  if (!isLoggedIn) {
    navigate("/business/login");
    return null; // Return null if not logged in to prevent rendering the rest of the component
  }

  return (
    <div>
      <h2>Business Profile</h2>
      <div>
        <h3>Company Name: {business.companyName}</h3>
        <p>Email: {business.email}</p>
        <p>Company Description: {business.companyDescription}</p>
        <p>Company Location: {business.companyLocation}</p>
        <p>Website: {business.website}</p>
        <p>Industry: {business.industry}</p>
        <p>Company Size: {business.companySize}</p>
        <p>Founded Year: {business.foundedYear}</p>
        <p>Contact Email: {business.contactEmail}</p>
        <p>Contact Number: {business.contactNumber}</p>
        <button onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};

export default BusinessProfile;
