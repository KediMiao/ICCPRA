import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import Certificate from "./components/Certificate";
import SignIn from "./components/SignIn";
import Register from "./components/register/register";
import ErrorMessage from "./components/studentReschedule/errorMessage";
import RegisterConfirmation from "./components/registerConfirmation/registerConfirmation";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/errorMessage" element={<ErrorMessage />} />
          <Route
            path="/registerConfirmation"
            element={<RegisterConfirmation />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
