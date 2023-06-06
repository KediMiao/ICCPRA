import React, { useState } from "react";

function Register() {
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    email: "",
  });

  function updateInfo(event) {
    const { value, name } = event.target;
    setContact((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  }

  return (
    <div className="container">
      <h1>
        Hello {contact.fName} {contact.lName}
      </h1>
      <p>{contact.email}</p>
      <form>
        <input
          className="registerInput"
          name="fName"
          onChange={updateInfo}
          placeholder="First Name"
          value={contact.fName}
        />
        <input
          className="registerInput"
          name="lName"
          onChange={updateInfo}
          placeholder="Last Name"
          value={contact.lName}
        />
        <input
          className="registerInput"
          name="email"
          onChange={updateInfo}
          placeholder="Email"
          value={contact.email}
        />
        <button className="registerButton">Submit</button>
      </form>
    </div>
  );
}

export default Register;
