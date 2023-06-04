import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/promo/landingPage";
import StudentLogin from "./pages/student/login";
import StudentSignUp from "./pages/student/signup";
import StudentProfile from "./pages/student/profile";
import StudentUpdate from "./pages/student/update";
import StudentJobListing from "./pages/student/jobListing";
import StudentAppliedJobs from "./pages/student/appliedJobs";
import BusinessLogin from "./pages/business/login";
import BusinessSignUp from "./pages/business/signup";
import BusinessProfile from "./pages/business/profile";
import BusinessUpdate from "./pages/business/update";
import BusinessAddJob from "./pages/business/addJob";
import BusinessApplicantList from "./pages/business/applicantList";
import AdminLogin from "./pages/admin/login";
import AdminSignUp from "./pages/admin/signup";
import AdminProfile from "./pages/admin/profile";
import AdminAddBusiness from "./pages/admin/addBusiness";

const routes = [
  { path: "/", element: <LandingPage /> },
  { path: "/student/login", element: <StudentLogin /> },
  { path: "/student/signUp", element: <StudentSignUp /> },
  { path: "/student/profile", element: <StudentProfile /> },
  { path: "/student/update", element: <StudentUpdate /> },
  { path: "/student/joblistings", element: <StudentJobListing /> },
  { path: "/student/appliedJobs", element: <StudentAppliedJobs /> },
  { path: "/business/login", element: <BusinessLogin /> },
  { path: "/business/signUp", element: <BusinessSignUp /> },
  { path: "/business/profile", element: <BusinessProfile /> },
  { path: "/business/update", element: <BusinessUpdate /> },
  { path: "/business/addJob", element: <BusinessAddJob /> },
  { path: "/business/applicantList", element: <BusinessApplicantList /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/signUp", element: <AdminSignUp /> },
  { path: "/admin/profile", element: <AdminProfile /> },
  { path: "/admin/addBusiness", element: <AdminAddBusiness /> },
];

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
