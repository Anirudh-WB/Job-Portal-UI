import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import SettingPage from "./pages/SettingPage";
import MemberPage from "./pages/MemberPage";
import MembersPage from "./pages/MembersPage";
import ProfilePage from "./pages/profile/ProfilePage";
import LoginPage from "./pages/auth/LoginPage";
import PrivateRoutes from "./pages/auth/PrivateRoutes";
import JobPage from "./pages/job/JobPost/JobPage";
import { getSessionValue } from "./utilities/SessionStorageUtility";
import JobsPage from "./pages/job/JobList/JobsPage";
import TestTablePage from "./pages/job/TestTablePage";
import JobSearchPage from "./pages/job/JobSearchPage";
import JobApplicationsPage from "./pages/job/JobApplicationsPage";
import ViewProfilePage from "./pages/profile/ViewProfilePage";
import JobseekerRegistration from "./pages/auth/JobseekerRegistration";
import CompanyRegistration from "./pages/auth/CompanyRegistration";
import Navbar from "./components/Navbar";
import JobLandingPage from "./pages/job/JobLandingPage";

function App() {
  return (
    <>
      <div className="h-screen w-screen flex flex-col">
        <Navbar />
        <div className="overflow-auto h-full">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/jobseeker-registration"
              element={<JobseekerRegistration />}
            />
            <Route path="/table" element={<TestTablePage />} />
            <Route path="/job-search" element={<JobSearchPage />} />
            <Route
              path="/company-registration"
              element={<CompanyRegistration />}
            />

            {/* Protected routes for role 1 */}
            <Route
              element={<PrivateRoutes allowedRoles={["company", "admin"]} />}
            >
              <Route path="/about" element={<AboutPage />} />
              <Route path="/companyProfile" element={<JobLandingPage />} />
              {/* <Route path='/job' element={<JobPage />} /> */}
              <Route path="/job/:id?" element={<JobPage />} />
              <Route path="/jobs" element={<JobsPage />} />
              {/* <Route path='/contact' element={<ContactPage />} /> */}

              <Route
                path="/job-applications"
                element={<JobApplicationsPage />}
              />
              <Route
                path="/job-applications/:paramJobId?"
                element={<JobApplicationsPage />}
              />
            </Route>

            {/* Protected routes for role 2 */}
            <Route
              element={<PrivateRoutes allowedRoles={["jobseaker", "admin"]} />}
            >
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/view-profile/:id?" element={<ViewProfilePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
