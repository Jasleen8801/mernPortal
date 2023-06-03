import React, { useState } from 'react';
import emailjs from 'emailjs-com';

const BusinessSignup = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState(null);

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
  };

  return (
    <div>
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
    </div>
  );
};

export default BusinessSignup;
