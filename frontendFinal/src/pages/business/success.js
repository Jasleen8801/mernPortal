import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const BusinessSuccess = () => {
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
      <div className="business-login-container">
        <div className="container d-flex justify-content-center align-items-center">
          <h5 className="text-white">
            We will review your application and get back to you shortly. <br />
            Thank you for your interest in joining our platform. <br />
            Please check your email for further instructions.
          </h5>
        </div>
      </div>
    </>
  );
};

export default BusinessSuccess;
