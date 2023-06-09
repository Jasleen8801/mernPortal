// to be completed in - https://youtu.be/qALsVa-V9qo

import React from "react";

import "../../styles/promo/promo.css";

import logo from "../../assets/logo.png";

const LandingPage = () => {
  return (
    <div className="promo-container--main">
      <div className="promo-section--home" id="home">
        <nav
          expand="lg"
          fixed="top"
          className="navbar navbar-expand-lg navbar-dark"
        >
          <div className="container">
            <a className="navbar-brand" href="#header">
              <img src={logo} alt="logo" className="navbar--logo" />
            </a>
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
              className="collapse navbar-collapse justify-content-between"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#work">
                    Our Works
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact Us
                  </a>
                </li>
              </ul>
              <div className="navbar-btn navbar-btn-one">
                <a href="#contact" className="navbar-text">
                  Connect with Us
                </a>
              </div>
            </div>
          </div>
        </nav>

        <div className="promo-home-content container">
          <div className="water-wave--content">
            <h2>Engage</h2>
            <h2>Engage</h2>
          </div>
          <h1>Growth through Connection</h1>
          <p>
            Life is too short for bad coffee. Discover the rich aroma and
            flavors of our website, where every sip brings you closer to a world
            of exquisite brews and delightful moments.
          </p>
          <div className="navbar-btn btn-three">
            <a href="#about">READ MORE</a>
          </div>
        </div>
      </div>

      <div className="promo-section--about" id="about">
        <div className="about-left container">
          <h1>About Us</h1>
          <p className="lead">
            At our company, we are passionate about connecting students seeking
            internships with new and emerging startups. We understand the
            importance of gaining real-world experience and learning
            opportunities during your educational journey.
          </p>
          <p className="lead">
            Just like a cup of freshly brewed coffee, our platform brings
            together the freshness of ideas and the energy of youth. We strive
            to create meaningful connections between students and startups,
            providing a platform for growth, innovation, and collaboration.
          </p>
          <p className="lead">
            Whether you're a student looking for an internship opportunity or a
            startup searching for talented individuals, we're here to bridge the
            gap and facilitate the perfect match.
          </p>
        </div>
        <div className="about-right rain-container">
          <div className="rain">
            <div className="drop"></div>
            <div className="waves">
              <div></div>
              <div></div>
            </div>
            {/* <div className="splash"></div> */}
            <div className="particles">
              <div></div>
              <div></div>
              <div></div>
              {/* <div></div> */}
            </div>
          </div>

          <div className="rain">
            <div className="drop"></div>
            <div className="waves">
              <div></div>
              {/* <div></div> */}
            </div>
            {/* <div className="splash"></div> */}
            <div className="particles">
              <div></div>
              <div></div>
              <div></div>
              {/* <div></div> */}
            </div>
          </div>

          <div className="rain">
            <div className="drop"></div>
            <div className="waves">
              <div></div>
              {/* <div></div> */}
            </div>
            {/* <div className="splash"></div> */}
            <div className="particles">
              <div></div>
              <div></div>
              <div></div>
              {/* <div></div> */}
            </div>
          </div>

          <div className="rain">
            <div className="drop"></div>
            <div className="waves">
              <div></div>
              {/* <div></div> */}
            </div>
            {/* <div className="splash"></div> */}
            <div className="particles">
              <div></div>
              <div></div>
              <div></div>
              {/* <div></div> */}
            </div>
          </div>

          <div className="rain">
            <div className="drop"></div>
            <div className="waves">
              <div></div>
              {/* <div></div> */}
            </div>
            {/* <div className="splash"></div> */}
            <div className="particles">
              <div></div>
              <div></div>
              <div></div>
              {/* <div></div> */}
            </div>
          </div>

          <div className="rain">
            <div className="drop"></div>
            <div className="waves">
              <div></div>
              {/* <div></div> */}
            </div>
            {/* <div className="splash"></div> */}
            <div className="particles">
              <div></div>
              <div></div>
              <div></div>
              {/* <div></div> */}
            </div>
          </div>

          <div className="rain">
            <div className="drop"></div>
            <div className="waves">
              <div></div>
              {/* <div></div> */}
            </div>
            {/* <div className="splash"></div> */}
            <div className="particles">
              <div></div>
              <div></div>
              <div></div>
              {/* <div></div> */}
            </div>
          </div>

          <div className="rain">
            <div className="drop"></div>
            <div className="waves">
              <div></div>
              {/* <div></div> */}
            </div>
            {/* <div className="splash"></div> */}
            <div className="particles">
              <div></div>
              <div></div>
              <div></div>
              {/* <div></div> */}
            </div>
          </div>

          <div className="rain">
            <div className="drop"></div>
            <div className="waves">
              <div></div>
              <div></div>
            </div>
            {/* <div className="splash"></div> */}
            <div className="particles">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="promo-section--works">
        <div className="work-container">
          <div className="work-card">
            <div className="work-content">
              <div className="work-img">
                <img src="https://images.unsplash.com/photo-1592188657297-c6473609e988?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c3R1ZGVudHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
              </div>
              <div className="work-cardContent">
                <h3>
                  Student?
                  <br />
                  <span>Kickstart your career.</span>
                </h3>
              </div>
            </div>
            <ul className="work-sci">
              <li style={{ "--i": 1 }}>
                <a href="/student/login">Login</a>
              </li>
            </ul>
          </div>
          <div className="work-card">
            <div className="work-content">
              <div className="work-img">
                <img src="https://images.unsplash.com/photo-1589561253898-768105ca91a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhcnQlMjB1cHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60" />
              </div>
              <div className="work-cardContent">
                <h3>
                  Start up?
                  <br />
                  <span>Accelerate your growth</span>
                </h3>
              </div>
            </div>
            <ul className="work-sci">
              <li style={{ "--i": 1 }}>
                <a href="/business/login">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="promo-section--contact">
        <div className="background">
          <div className="contact-container">
            <div className="screen">
              <div className="screen-header">
                <div className="screen-header-left">
                  <div className="screen-header-button close"></div>
                  <div className="screen-header-button maximize"></div>
                  <div className="screen-header-button minimize"></div>
                </div>
                <div className="screen-header-right">
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                  <div className="screen-header-ellipsis"></div>
                </div>
              </div>
              <div className="screen-body">
                <div className="screen-body-item left">
                  <div className="app-title">
                    <span>CONTACT</span>
                    <span>US</span>
                  </div>
                  <div className="app-contact">
                    CONTACT INFO : +62 81 314 928 595
                  </div>
                </div>
                <div className="screen-body-item">
                  <div className="app-form">
                    <div className="app-form-group">
                      <input
                        className="app-form-control"
                        placeholder="NAME"
                        value="BEAN TO BOND"
                      />
                    </div>
                    <div className="app-form-group">
                      <input className="app-form-control" placeholder="EMAIL" />
                    </div>
                    <div className="app-form-group">
                      <input
                        className="app-form-control"
                        placeholder="CONTACT NO"
                      />
                    </div>
                    <div className="app-form-group message">
                      <input
                        className="app-form-control"
                        placeholder="MESSAGE"
                      />
                    </div>
                    <div className="app-form-group buttons">
                      <button className="app-form-button">CANCEL</button>
                      <button className="app-form-button">SEND</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
