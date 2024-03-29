import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CustomStudentProfile = () => {
  const { studentId } = useParams();

  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + `custom/getStudent/${studentId}`
      );
      setUser(response.data.student);
      // console.log(response.data.student);
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
        <h1>Student Profile</h1>
        <p className="lead">Welcome {user.userName}</p>
        <p className="lead">Email: {user.email}</p>
        <p className="lead">Skills: {user.skills}</p>
        <p className="lead">Description: {user.description}</p>
        <Link to="/">
          <button>Promo Page</button>
        </Link>
        {error && { error }}
      </div>
    );
  }
};

export default CustomStudentProfile;
