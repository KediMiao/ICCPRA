import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Form from "./form/Form";

import Home from "./components/Home";
import Certificate from "./components/Certificate";
import SignIn from "./components/SignIn";
import Register from "./components/register/register";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/form" element={<Form />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
