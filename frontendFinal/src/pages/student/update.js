import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../../styles/student/update.css";

const StudentUpdate = () => {
  const [user, setUser] = useState({});
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    description: "",
    skills: "",
    projects: [],
    education: [],
    experience: [],
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const cookie = Cookies.get("jwt");
  const isLoggedIn = !!cookie;

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER + "student/home",
        {
          params: { cookieValue: cookie },
        }
      );
      const { student, message } = response.data;
      setUser(student);
      setFormData(student);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        navigate("/student/login");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, index, subField] = name
      .match(/(\w+)(\[\d+\])?\.?(\w+)?/)
      .slice(1);

    setFormData((prevData) => {
      const newData = { ...prevData };
      if (subField) {
        if (!newData[field][index]) {
          newData[field][index] = {};
        }
        newData[field][index][subField] = value;
      } else if (index) {
        if (!newData[field][index]) {
          newData[field][index] = {};
        }
        newData[field][index][field] = value;
      } else {
        newData[field] = value;
      }
      return { ...newData };
    });
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
      console.log(formData);
      const response = await axios.put(
        process.env.REACT_APP_SERVER + `student/update/${user._id}`,
        formData
      );
      const { message, student } = response.data;
      setUser(student);
      setError(null);
      navigate("/student/profile");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!isLoggedIn) {
    navigate("/student/login");
  } else if (isLoading) {
    return (
      <div className="container">
        <p className="lead">Loading...</p>
      </div>
    );
  } else {
    return (
      <div className="student-update-container">
        <div className="container">
          <h1>Update Profile</h1>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <label htmlFor="userName">Username</label>
            <input
              type="text"
              name="userName"
              value={formData.userName}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <label htmlFor="skills">Skills</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
            />
            <label>Experience</label>
            {formData.experience &&
              formData.experience.map((experience, index) => (
                <div key={index}>
                  <label htmlFor={`experience[${index}].title`}>Title</label>
                  <input
                    type="text"
                    name={`experience[${index}].title`}
                    value={experience.title}
                    onChange={handleChange}
                  />
                  <label htmlFor={`experience[${index}].company`}>
                    Company
                  </label>
                  <input
                    type="text"
                    name={`experience[${index}].company`}
                    value={experience.company}
                    onChange={handleChange}
                  />
                  <label htmlFor={`experience[${index}].location`}>
                    Location
                  </label>
                  <input
                    type="text"
                    name={`experience[${index}].location`}
                    value={experience.location}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete("experience", index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button type="button" onClick={() => handleAdd("experience")}>
              Add Experience
            </button>
            <label>Projects</label>
            {formData.projects &&
              formData.projects.map((project, index) => (
                <div key={index}>
                  <label htmlFor={`projects[${index}].title`}>Title</label>
                  <input
                    type="text"
                    name={`projects[${index}].title`}
                    value={project.title}
                    onChange={handleChange}
                  />
                  <label htmlFor={`projects[${index}].description`}>
                    Description
                  </label>
                  <textarea
                    name={`projects[${index}].description`}
                    value={project.description}
                    onChange={handleChange}
                  ></textarea>
                  <button
                    type="button"
                    onClick={() => handleDelete("projects", index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button type="button" onClick={() => handleAdd("projects")}>
              Add Project
            </button>
            <label>Education</label>
            {formData.education &&
              formData.education.map((education, index) => (
                <div key={index}>
                  <label htmlFor={`education[${index}].instituteName`}>
                    Institute Name
                  </label>
                  <input
                    type="text"
                    name={`education[${index}].instituteName`}
                    value={education.instituteName}
                    onChange={handleChange}
                  />
                  <label htmlFor={`education[${index}].startYear`}>
                    Start Year
                  </label>
                  <input
                    type="number"
                    name={`education[${index}].startYear`}
                    value={education.startYear}
                    onChange={handleChange}
                  />
                  <label htmlFor={`education[${index}].endYear`}>
                    End Year
                  </label>
                  <input
                    type="number"
                    name={`education[${index}].endYear`}
                    value={education.endYear}
                    onChange={handleChange}
                  />
                  <label htmlFor={`education[${index}].degree`}>Degree</label>
                  <input
                    type="text"
                    name={`education[${index}].degree`}
                    value={education.degree}
                    onChange={handleChange}
                  />
                  <label htmlFor={`education[${index}].major`}>Major</label>
                  <input
                    type="text"
                    name={`education[${index}].major`}
                    value={education.major}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => handleDelete("education", index)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            <button type="button" onClick={() => handleAdd("education")}>
              Add Education
            </button>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default StudentUpdate;
