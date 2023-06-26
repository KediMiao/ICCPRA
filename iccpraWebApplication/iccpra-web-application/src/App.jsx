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
import Login from "./Login";
import Update from "./Update";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51N0U7sIvvDWEzpsT3h7x7naE7RBw1ROFS0ZOOqx2j7C3CX1uCj5RIaghZXG1U4IfEYImy7wG4flmdQZXy8mKv0UJ001b0hgIEA");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/certificate" element={<Certificate />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/guestLogin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/form" element={<Form />}></Route>
          <Route path="/update" element={<Update />}></Route>
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
