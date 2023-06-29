import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import Modal from "react-modal";
import "react-datepicker/dist/react-datepicker.css";
import { startOfTomorrow, getDay, getHours, differenceInHours } from "date-fns";
import "./Update.css";
import { useNavigate } from "react-router-dom";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

Modal.setAppElement("#root");

function UserProfile() {
  const [user, setUser] = useState(null);
  const [courseDate, setCourseDate] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const location = useLocation();
  const userId = location.state.userId;
  const navigate = useNavigate();
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false);
  const [courseUpdated, setCourseUpdated] = useState(false);

  const openConfirmModal = () => {
    setConfirmModalIsOpen(true);
  };

  const handleDateChange = (date) => {
    date.setHours(10, 0, 0, 0);
    setCourseDate(date);
  };
  //calendar time filter
  const isSaturday = (date) => {
    return getDay(date) === 6;
  };
  //calendar time filter
  const filterTime = (time) => {
    const hours = getHours(time);
    return hours === 10;
  };

  const stripe = useStripe();
  const elements = useElements();

  const updateUserCourseTime = async () => {
    if (user && user.courseTime) {
      const currentTime = new Date();
      const courseTime = new Date(user.courseTime);
      const timeDifference = differenceInHours(courseTime, currentTime);

      if (timeDifference <= 24) {
        setModalMessage(
          "You cannot reschedule the course within 24 hours of the course time."
        );
        setModalIsOpen(true);
        return;
      }
    }
    if (!courseDate) {
      // If the user hasn't selected a date, show a message and exit the function
      setModalMessage("Please select a course time.");
      setModalIsOpen(true);
      return;
    }
    if (!stripe || !elements) {
      return;
    }
    //check if the course is full
    try {
      const checkCourseRes = await axios.post(
        "http://localhost:3001/api/check-course",
        {
          courseTime: courseDate,
        }
      );
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("This course date is full");
        return;
      } else {
        console.error("There was an error!", error);
        return;
      }
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      alert("Please enter your payment information");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      return;
    }

    const response = await axios.post(
      "http://localhost:3001/api/create-payment-intent",
      { amount: 2500 }
    ); // amount is in cents

    if (!response.data || !response.data.clientSecret) {
      console.log("Invalid response from server:", response);
      return;
    }

    const paymentIntent = response.data.clientSecret;

    const { error: confirmError, paymentIntent: confirmedPaymentIntent } =
      await stripe.confirmCardPayment(paymentIntent, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.log("[confirmError]", confirmError);
      return;
    }

    if (confirmedPaymentIntent.status === "succeeded") {
      axios
        .put(`http://localhost:3001/api/update/${userId}`, {
          courseTime: courseDate,
        })
        .then((response) => {
          console.log("Updated course time:", response);
          setModalMessage("Successfully updated course time!");
          setModalIsOpen(true);
          setCourseUpdated(true); // set courseUpdated to true after the course time is updated
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  const cancelUserCourse = async () => {
    if (user && user.courseTime) {
      const currentTime = new Date();
      const courseTime = new Date(user.courseTime);
      const timeDifference = differenceInHours(courseTime, currentTime);

      if (timeDifference <= 24) {
        setModalMessage(
          "You cannot cancel the course within 24 hours of the course time."
        );
        setModalIsOpen(true);
        return;
      }
    }
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      alert("Please enter your payment information");
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
      return;
    }

    const response = await axios.post(
      "http://localhost:3001/api/create-payment-intent",
      { amount: 2500 }
    ); // amount is in cents

    if (!response.data || !response.data.clientSecret) {
      console.log("Invalid response from server:", response);
      return;
    }

    const paymentIntent = response.data.clientSecret;

    const { error: confirmError, paymentIntent: confirmedPaymentIntent } =
      await stripe.confirmCardPayment(paymentIntent, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      console.log("[confirmError]", confirmError);
      return;
    }

    if (confirmedPaymentIntent.status === "succeeded") {
      axios
        .delete(`http://localhost:3001/api/cancel/${userId}`)
        .then((response) => {
          console.log("Response from server:", response);
          setUser(null);
          setCourseDate(null);
          setModalMessage("Successfully cancelled course!");
          setModalIsOpen(true);
          setConfirmModalIsOpen(false);
          navigate("/");
        })
        .catch((error) => {
          console.error("There was an error!", error);
          setModalMessage("There was an error cancelling the course.");
          setModalIsOpen(true);
          setConfirmModalIsOpen(false);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/get/${userId}`)
      .then((response) => {
        console.log("Response from server:", response.data);
        setUser(response.data[0]);
        console.log("Updated user state:", user);
        setCourseUpdated(false); // reset courseUpdated after the user info is reloaded
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [userId, courseUpdated]); // add courseUpdated to the dependency array

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
          <p>
            Course Time:{" "}
            {new Date(user.courseTime).toLocaleString("en-US", {
              timeZone: "America/Los_Angeles",
            })}
          </p>
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
          <div className="stripe-section">
            <h4>Payment Information *</h4>
            <CardElement />
          </div>
          <button onClick={updateUserCourseTime}>Update Course Time</button>
          <button onClick={openConfirmModal}>Cancel Course</button>

          <Modal
            isOpen={confirmModalIsOpen}
            onRequestClose={() => setConfirmModalIsOpen(false)}
            contentLabel="Confirm Cancel"
            overlayClassName="ReactModal__Overlay"
            className="ReactModal__Content"
          >
            <h2>Are you sure you want to cancel the course?</h2>
            <button className="confirm-button" onClick={cancelUserCourse}>
              Confirm
            </button>
            <button
              className="close-button"
              onClick={() => setConfirmModalIsOpen(false)}
            >
              Close
            </button>
          </Modal>

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
