// to be completed in - https://youtu.be/qALsVa-V9qo

import React from "react";
import { IonIcon } from "react-ion-icon";

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
        <div className="wavy-background">
          <div className="wave"></div>
        </div>
        <div className="work-container">
          <div className="work-card" style={{ "--clr": "#C2DEDC" }}>
            <div className="work-box">
              <div className="work-icon">
                <div className="work-iconbox">
                  <IonIcon name="people-circle-outline"></IonIcon>
                </div>
              </div>
              <div className="work-content">
                <h3>Startups</h3>
                <p>
                  Find talented individuals, collaborate on projects, and
                  accelerate your growth.
                </p>
                <a href="/business/login">Login</a>
              </div>
            </div>
          </div>

          <div className="work-card" style={{ "--clr": "#C2DEDC" }}>
            <div className="work-box">
              <div className="work-icon">
                <div className="work-iconbox">
                  <IonIcon name="person-circle-outline"></IonIcon>
                </div>
              </div>
              <div className="work-content">
                <h3>Students</h3>
                <p>
                  Unlock internship opportunities, gain real-world experience,
                  and kickstart your career.
                </p>
                <a href="/student/login">Login</a>
              </div>
            </div>
          </div>

          <div className="work-card" style={{ "--clr": "#C2DEDC" }}>
            <div className="work-box">
              <div className="work-icon">
                <div className="work-iconbox">
                  <IonIcon name="people-circle-outline"></IonIcon>
                </div>
              </div>
              <div className="work-content">
                <h3>Business Ventures</h3>
                <p>
                  Discover new ventures, connect with entrepreneurs, and drive
                  innovation and success.
                </p>
                <a href="#"> (Coming Soon)</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="promo-section--contact">
        <div class="background">
          <div class="contact-container">
            <div class="screen">
              <div class="screen-header">
                <div class="screen-header-left">
                  <div class="screen-header-button close"></div>
                  <div class="screen-header-button maximize"></div>
                  <div class="screen-header-button minimize"></div>
                </div>
                <div class="screen-header-right">
                  <div class="screen-header-ellipsis"></div>
                  <div class="screen-header-ellipsis"></div>
                  <div class="screen-header-ellipsis"></div>
                </div>
              </div>
              <div class="screen-body">
                <div class="screen-body-item left">
                  <div class="app-title">
                    <span>CONTACT</span>
                    <span>US</span>
                  </div>
                  <div class="app-contact">
                    CONTACT INFO : +62 81 314 928 595
                  </div>
                </div>
                <div class="screen-body-item">
                  <div class="app-form">
                    <div class="app-form-group">
                      <input
                        class="app-form-control"
                        placeholder="NAME"
                        value="BEAN TO BOND"
                      />
                    </div>
                    <div class="app-form-group">
                      <input class="app-form-control" placeholder="EMAIL" />
                    </div>
                    <div class="app-form-group">
                      <input
                        class="app-form-control"
                        placeholder="CONTACT NO"
                      />
                    </div>
                    <div class="app-form-group message">
                      <input class="app-form-control" placeholder="MESSAGE" />
                    </div>
                    <div class="app-form-group buttons">
                      <button class="app-form-button">CANCEL</button>
                      <button class="app-form-button">SEND</button>
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
