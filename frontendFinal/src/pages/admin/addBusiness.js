import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const AdminAddBusiness = () => {
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const businessData = {
      companyName: companyName,
      email: email,
    };

    axios
      .post("https://localhost:300/admin/addBusiness", businessData)
      .then((response) => {
        setMessage(response.data.message);
        setCompanyName("");
        setEmail("");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return <div>AdminAddBusiness</div>;
};

export default AdminAddBusiness;
