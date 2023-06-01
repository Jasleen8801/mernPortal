import React, { useState } from 'react';
import axios from 'axios';

const AdminAddBusiness = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const businessData = {
      companyName: companyName,
      email: email
    };

    axios
      .post('https://localhost:300/admin/addBusiness', businessData)
      .then((response) => {
        setMessage(response.data.message);
        setCompanyName('');
        setEmail('');
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div className="container">
      <h2>Add Business</h2>
      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Business</button>
      </form>
    </div>
  );
};

export default AdminAddBusiness;
