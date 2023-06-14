import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import "../../styles/business/login.css";
import logo from "../../assets/logo.png";

const BusinessSignup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState(null);

  const navigate = useNavigate();

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDocumentChange = (e) => {
    setDocument(e.target.files[0]);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Prepare the data for the email template
    const templateParams = {
      userName: userName,
      email: email,
    };

    // Create a FormData object to send the file as an attachment
    const formData = new FormData();
    formData.append('file', document);

    // Add the file data to the template parameters
    templateParams.attachment = formData;

    // Send the email using EmailJS
    emailjs
      .send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
      .then((response) => {
        console.log('Email sent successfully!', response.status, response.text);
        // Clear the form after successful submission
        setUserName('');
        setEmail('');
        setDocument(null);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
      
      navigate('/business/success');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo" className="navbar--logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">
                  Promo Page
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='business-login-container'>
        <div className='business-login-box'>
          <h2 className='business-login-title'>Business Signup</h2>
          <form className='business-login-form' onSubmit={handleFormSubmit}>
            <div className='business-login-user-box'>
              <input
                className="business-login-input"
                type='text'
                id='userName'
                value={userName}
                onChange={handleUserNameChange}
                required
              />
              <label className='business-login-label'>User Name</label>
            </div>
            <div className='business-login-user-box'>
              <input
                className="business-login-input"
                type='email'
                id='email'
                value={email}
                onChange={handleEmailChange}
                required
              />
              <label className='business-login-label'>Email</label>
            </div>
            <div className='business-login-user-box'>
              <input
                className="business-login-input"
                type='file'
                id='document'
                onChange={handleDocumentChange}
              />
              <label className='business-login-label'>Document</label>
            </div>
            <button type="submit" className='business-login-button'>
              Signup
            </button>
            <Link to="/business/login" className='business-login-link-button'>
              <button className='business-signup-button'>Login</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default BusinessSignup;

/*<div>
      <h1>Business Signup</h1>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={handleUserNameChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="document">Document:</label>
          <input
            type="file"
            id="document"
            onChange={handleDocumentChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div> */
