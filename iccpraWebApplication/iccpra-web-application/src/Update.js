import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import { startOfTomorrow, getDay, getHours } from "date-fns";
import "./Update.css";

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function UserProfile() {
  const [user, setUser] = useState(null);
  const [courseDate, setCourseDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const location = useLocation();
  const userId = location.state.userId;

  const handleDateChange = (date) => {
    date.setHours(10, 0, 0, 0);
    setCourseDate(date);
  };

  const updateUserCourseTime = () => {
    axios
      .put(`http://localhost:3001/api/update/${userId}`, {
        courseTime: courseDate,
      })
      .then((response) => {
        console.log("Updated course time:", response);
        setModalMessage("Successfully updated course time!");
        setModalIsOpen(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
        if (error.response && error.response.status === 409) {
          setModalMessage("This course time is full");
          setModalIsOpen(true);
        } else {
          setModalMessage("There was an error updating the course time.");
          setModalIsOpen(true);
        }
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/${userId}`)
      .then((response) => {
        console.log("Response from server:", response.data);
        setUser(response.data[0]);
        console.log("Updated user state:", user);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [userId]);

  //calendar time filter
  const isSaturday = (date) => {
    return getDay(date) === 6;
  };
  //calendar time filter
  const filterTime = (time) => {
    const hours = getHours(time);
    return hours === 10;
  };

  return (
    <div>
      <h1>User Profile</h1>
      {user ? (
        <div>
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNum}</p>
          <p>Course Time: {user.courseTime}</p>
          <DatePicker
            selected={courseDate}
            onChange={handleDateChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={60}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            minDate={startOfTomorrow()}
            filterDate={isSaturday}
            filterTime={filterTime}
            placeholderText="Select Course Time"
          />
          <button onClick={updateUserCourseTime}>Update Course Time</button>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => setModalIsOpen(false)}
            contentLabel="Update Message"
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content"
          >
            <h2>{modalMessage}</h2>
            <button
              className="close-button"
              onClick={() => setModalIsOpen(false)}
            >
              Close
            </button>
          </Modal>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default UserProfile;
