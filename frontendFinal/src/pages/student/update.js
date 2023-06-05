import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const StudentUpdate = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    userName: null,
    email: null,
    description: null,
    skills: null,
    projects: [],
    education: [],
    experience: [],
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookie = Cookies.get('jwt');
  const isLoggedIn = !!cookie;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(process.env.REACT_APP_SERVER + 'student/home', {
        params: { cookieValue: cookie },
      });
      const { student, message } = response.data;
      setUser(student);
      setFormData(student);
      // console.log(student);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
        navigate('/student/login');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.index !== undefined && dataset.subfield !== undefined) {
      const { index, subfield } = dataset;
      setFormData((prevData) => ({
        ...prevData,
        [name]: prevData[name].map((item, i) =>
          i === parseInt(index)
            ? {
                ...item,
                [subfield]: value,
              }
            : item
        ),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAdd = (fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: [...(prevData[fieldName] || []), {}],
    }));
  };

  const handleDelete = (fieldName, index) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: prevData[fieldName].filter((item, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        process.env.REACT_APP_SERVER + `student/update/${user._id}`,
        formData
      );
      const { message, student } = response.data;
      setUser(student);
      setError(null);
      navigate('/student/profile');
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again later.');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <h1>Update Profile</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={formData.userName || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="skills">Skills</label>
          <input
            type="text"
            id="skills"
            name="skills"
            value={formData.skills || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <h2>Projects</h2>
          {formData.projects?.map((project, index) => (
              <div key={index}>
                <label htmlFor={`projects[${index}].title`}>Title</label>
                <input
                  type="text"
                  name={`projects[${index}].title`}
                  value={project.title || ''}
                  data-index={index}
                  data-subfield="title"
                  onChange={handleChange}
                />
                <label htmlFor={`projects[${index}].description`}>Description</label>
                <textarea
                  name={`projects[${index}].description`}
                  value={project.description || ''}
                  data-index={index}
                  data-subfield="description"
                  onChange={handleChange}
                ></textarea>
                <button type="button" onClick={() => handleDelete('projects', index)}>
                  Delete
                </button>
              </div>
            ))}
          <button type="button" onClick={() => handleAdd('projects')}>
            Add Project
          </button>
        </div>
        <div>
          <h2>Education</h2>
          {formData.education?.map((education, index) => (
              <div key={index}>
                <label htmlFor={`education[${index}].instituteName`}>Institute Name</label>
                <input
                  type="text"
                  name={`education[${index}].instituteName`}
                  value={education.instituteName || ''}
                  data-index={index}
                  data-subfield="instituteName"
                  onChange={handleChange}
                />
                <label htmlFor={`education[${index}].startYear`}>Start Year</label>
                <input
                  type="number"
                  name={`education[${index}].startYear`}
                  value={education.startYear || ''}
                  data-index={index}
                  data-subfield="startYear"
                  onChange={handleChange}
                />
                <label htmlFor={`education[${index}].endYear`}>End Year</label>
                <input
                  type="number"
                  name={`education[${index}].endYear`}
                  value={education.endYear || ''}
                  data-index={index}
                  data-subfield="endYear"
                  onChange={handleChange}
                />
                <label htmlFor={`education[${index}].degree`}>Degree</label>
                <input
                  type="text"
                  name={`education[${index}].degree`}
                  value={education.degree || ''}
                  data-index={index}
                  data-subfield="degree"
                  onChange={handleChange}
                />
                <label htmlFor={`education[${index}].major`}>Major</label>
                <input
                  type="text"
                  name={`education[${index}].major`}
                  value={education.major || ''}
                  data-index={index}
                  data-subfield="major"
                  onChange={handleChange}
                />
                <button type="button" onClick={() => handleDelete('education', index)}>
                  Delete
                </button>
              </div>
            ))}
          <button type="button" onClick={() => handleAdd('education')}>
            Add Education
          </button>
        </div>
        <div>
          <h2>Experience</h2>
          {formData.experience?.map((experience, index) => (
              <div key={index}>
                <label htmlFor={`experience[${index}].companyName`}>Company Name</label>
                <input
                  type="text"
                  name={`experience[${index}].companyName`}
                  value={experience.companyName || ''}
                  data-index={index}
                  data-subfield="companyName"
                  onChange={handleChange}
                />
                <label htmlFor={`experience[${index}].position`}>Position</label>
                <input
                  type="text"
                  name={`experience[${index}].position`}
                  value={experience.position || ''}
                  data-index={index}
                  data-subfield="position"
                  onChange={handleChange}
                />
                <label htmlFor={`experience[${index}].startYear`}>Start Year</label>
                <input
                  type="number"
                  name={`experience[${index}].startYear`}
                  value={experience.startYear || ''}
                  data-index={index}
                  data-subfield="startYear"
                  onChange={handleChange}
                />
                <label htmlFor={`experience[${index}].endYear`}>End Year</label>
                <input
                  type="number"
                  name={`experience[${index}].endYear`}
                  value={experience.endYear || ''}
                  data-index={index}
                  data-subfield="endYear"
                  onChange={handleChange}
                />
                <button type="button" onClick={() => handleDelete('experience', index)}>
                  Delete
                </button>
              </div>
            ))}
          <button type="button" onClick={() => handleAdd('experience')}>
            Add Experience
          </button>
        </div>
        <button type="submit" disabled={isLoading}>
          Update
        </button>
      </form>
    </div>
  );
};

export default StudentUpdate;
