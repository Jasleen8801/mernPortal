// to be completed in -

import React from "react";

import "../../styles/promo/promo.css";

import logo from "../../assets/logo.png";

const LandingPage = () => {
  return (
    <div className="promo-container--main">
      {/* <h1>ABHI KRNA HAIIIIII</h1> */}

      <div className="promo-section--header" id="header">
        <nav expand="lg" fixed="top" className="navbar navbar-expand-lg">
          <div className="container">
            <a className="navbar-brand" href="#header">
              <img src={logo} alt="logo" className="navbar--logo" />
            </a>
            <button
              className="navbar-toggler navbar-toggler-white"
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
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            ></div>
          </div>
        </nav>
      </div>

      <div className="promo-section--about">about</div>
      <div className="promo-section--works">works</div>
      <div className="promo-section--contact">contact</div>
    </div>
  );
};

export default LandingPage;
