import './App.css';

import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<h1>Landing Page</h1>} />
        <Route exact path="/joblistings" element={<h1>Job Listings</h1>} />

        <Route exact path="/student/login" element={<h1>Student Login</h1>} />
        <Route exact path="/student/signUp" element={<h1>Student signUp</h1>} />
        <Route exact path="/student/profile" element={<h1>Student Profile</h1>} />
        
        <Route exact path="/business/login" element={<h1>Business Login</h1>} />
        <Route exact path="/business/signUp" element={<h1>Business signUp</h1>} />
        <Route exact path="/business/profile" element={<h1>Business Profile</h1>} />

        <Route exact path="/admin/login" element={<h1>Admin Login</h1>} />
        <Route exact path="/admin/signUp" element={<h1>Admin signUp</h1>} />
        <Route exact path="/admin/home" element={<h1>Admin Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
