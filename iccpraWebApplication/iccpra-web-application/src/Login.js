import React, { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [formState, setFormState] = useState({
    email: "",
    userId: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3001/login", {
        email: formState.email,
        idStudents: formState.userId,
      })
      .then((response) => {
        if (response.data === "Success") {
          navigate("/Update", { state: { userId: formState.userId } });
        } else {
          alert("Login Failed! Incorrect email or User ID.");
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });

    // Reset the form state
    setFormState({
      email: "",
      userId: "",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="headline">
        <h1>Login page</h1>
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-group">
        <label>User ID (Your Last Name):</label>
        <input
          type="text"
          name="userId"
          value={formState.userId}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Login in</button>
    </form>
  );
}

export default LoginForm;
