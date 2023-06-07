import React from "react";
import StudentInfoBox from "./studentInfoBox";

function ErrorMessage() {
  return (
    <div>
      <h1>Student Reschedule Page</h1>
      <p>
        Sorry, your in person session will begin within 24 hrs, according our
        policy, we can not reschedule your class. If you would like to cancel
        it, there will be no refund.
      </p>
      <button>reCAPTCHA</button>
      <h2>Student Personal Information</h2>
      <ul>
        <li>ID: </li>
        <li>Name: </li>
        <li>Email: </li>
        <li>Phone Number: </li>
        <li>In Person Date/Time: </li>
        <li>Location: </li>
      </ul>
      <button>Cancel</button>
    </div>
  );
}

export default ErrorMessage;
