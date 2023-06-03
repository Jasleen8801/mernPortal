import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const StudentAppliedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const cookie = Cookies.get('jwt');
    const isLoggedIn = !!cookie;

    
  return (
    <div>StudentAppliedJobs</div>
  )
}

export default StudentAppliedJobs
