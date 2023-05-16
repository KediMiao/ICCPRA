import React from "react";
// importing Link from react-router-dom to navigate to
// different end points.
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>ICCPRA</h1>
      <br />
      <ul>
        <li>
          <Link to="/certificate">CPR Certificate</Link>
        </li>
        <li>
          <Link to="/signin">In-person Sign In</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
