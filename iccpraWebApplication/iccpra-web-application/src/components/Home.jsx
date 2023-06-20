import React from "react";
// importing Link from react-router-dom to navigate to
// different end points.
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <h1>ICCPRA</h1>
      <br />
      <ul>
        <li> CPR Blended Course</li>
        <ul>
          <li>
            <Link to="/form">Register</Link>
          </li>
          <li>
            <p>
              Detail:
              <br />
              Language: English Chinese (Schedule twice a week) What you’ll
              learn: This course provides healthcare providers and public safety
              professionals the knowledge and skills necessary to respond to
              breathing and cardiac emergencies in adult child and infant
              patients. This course includes: 1. Combines the flexibility of
              online training with instructor-led skills check 2. Online portion
              can access via mobile, desktop or tablet (must be completed prior
              to practical session) 3. 2.5 hours Instructor-led skills session
              4. Exercises and reading materials 5. Red Cross CPR Certificate of
              completion (Valid 2 year) Requirement: None Course length: 1.5 – 3
              hours online session + 2.5 skill session Address: 1631N 1st St,
              suite 200, San Jose, CA 95112 (University of San Jose)
            </p>
          </li>
        </ul>
        <li>BLS Blended Course</li>
        <ul>
          <li>
            <Link to="/form">Register</Link>
          </li>
          <li>
            <p>
              Detail:
              <br />
              Language: English Chinese (Schedule twice a week) What you’ll
              learn: This course provides healthcare providers and public safety
              professionals the knowledge and skills necessary to respond to
              breathing and cardiac emergencies in adult child and infant
              patients. This course includes: 1. Combines the flexibility of
              online training with instructor-led skills check 2. Online portion
              can access via mobile, desktop or tablet (must be completed prior
              to practical session) 3. 2.5 hours Instructor-led skills session
              4. Exercises and reading materials 5. Red Cross CPR Certificate of
              completion (Valid 2 year) Requirement: None Course length: 1.5 – 3
              hours online session + 2.5 skill session Address: 1631N 1st St,
              suite 200, San Jose, CA 95112 (University of San Jose)
            </p>
          </li>
        </ul>
        <li>CPR Online</li>
        <ul>
          <li>
            <Link to="/form">Register</Link>
          </li>
          <li>
            <p>
              Detail:
              <br />
              Language: English Chinese (Schedule twice a week) What you’ll
              learn: This course provides healthcare providers and public safety
              professionals the knowledge and skills necessary to respond to
              breathing and cardiac emergencies in adult child and infant
              patients. This course includes: 1. Combines the flexibility of
              online training with instructor-led skills check 2. Online portion
              can access via mobile, desktop or tablet (must be completed prior
              to practical session) 3. 2.5 hours Instructor-led skills session
              4. Exercises and reading materials 5. Red Cross CPR Certificate of
              completion (Valid 2 year) Requirement: None Course length: 1.5 – 3
              hours online session + 2.5 skill session Address: 1631N 1st St,
              suite 200, San Jose, CA 95112 (University of San Jose)
            </p>
          </li>
        </ul>
      </ul>
      <ul>
        <li>
          <Link to="/certificate">CPR Certificate</Link>
        </li>
        <li>
          <Link to="/signin">In-person Sign In</Link>
        </li>
        <li>
          <Link to="/guestLogin">Guest Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/form">form</Link>
        </li>
        <li>
          <Link to="/update">update</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
