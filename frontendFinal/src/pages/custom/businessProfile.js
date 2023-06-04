import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CustomBusinessProfile = () => {
  const { businessId } = useParams();

  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + `custom/getBusiness/${businessId}`
      );
      setUser(response.data.business);
      // console.log(response.data.business);
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
        <h1>Business Profile</h1>
        <div>
          <h3>Company Name: {user.userName}</h3>
          <p>Email: {user.email}</p>
          <p>userId: {user._id}</p>
        </div>
        {error && { error }}
      </div>
    );
  }
};

export default CustomBusinessProfile;
