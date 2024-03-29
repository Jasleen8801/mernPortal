import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const BusinessApplicantList = () => {
  const { jobId } = useParams();

  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  const [applicants, setApplicants] = useState([]);
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
      setUser(response.data.business);
      console.log(business._id);

      const applicantsResponse = await axios.get(
        process.env.REACT_APP_SERVER +
          `business/${business._id}/applicants/${jobId}`
      );
      // const applict = applicantsResponse.data.applicants
      // console.log(applict);
      setApplicants(applicantsResponse.data.applicants);
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

  useEffect(() => {
    fetchData();
  }, [jobId]);

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="business-update-container">
        <div className="container">
          <h1>Applicants List</h1>
          {applicants.length === 0 ? (
            <p>No applicants found.</p>
          ) : (
            <ul>
              {applicants.map((applicant) => (
                <li key={applicant._id}>
                  <h3>{applicant.userName}</h3>
                  <p>Email: {applicant.email}</p>
                  <p>Skills: {applicant.skills}</p>
                  <button
                    onClick={() => navigate(`/custom/student/${applicant._id}`)}
                  >
                    View Student Profile
                  </button>
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => navigate("/business/profile")}>
            Profile Page
          </button>
        </div>
      </div>
    );
  }
};

export default BusinessApplicantList;
