import React, { useState } from "react";
import axios from "axios";
import { setHours, setMinutes } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import "./Form.css";
import Name from "./Name";
import PhoneNumberInput from "./PhoneNumInput";
import EmailInput from "./EmailInput";
import CourseTimeInput from "./CourseTimeInput";
import FeedBackInput from "./FeedBackInput";
import TermsConditions from "./TermsNCondition";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

function RegistrationForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [formState, setFormState] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    courseTime: null,
    channel: "",
    agreeToTerms: false,
    otherDetails: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date) => {
    setFormState((prevState) => ({
      ...prevState,
      courseTime: setMinutes(setHours(date, 10), 0),
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Ensure that Stripe has loaded.
    if (!stripe || !elements) {
      return;
    }
    //check if the course is full
    try {
      const checkCourseRes = await axios.post(
        "http://localhost:3001/api/check-course",
        {
          courseTime: formState.courseTime,
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
      { amount: 9900 }
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
      // Only if payment is successful, submit the form
      axios
        .post("http://localhost:3001/api/insert", {
          firstName: formState.firstName,
          lastName: formState.lastName,
          phoneNum: formState.phoneNumber,
          email: formState.email,
          courseTime: formState.courseTime,
          channel: formState.channel,
          otherDetails: formState.otherDetails,
        })
        .then(() => {
          alert("Successful submission");
          // Reset the form state
          setFormState({
            firstName: "",
            middleName: "",
            lastName: "",
            phoneNumber: "",
            email: "",
            courseTime: null,
            channel: "",
            agreeToTerms: false,
            otherDetails: "",
          });
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="headline">
        <h1>CPR Form (Weekend Only)</h1>
      </div>
      <div className="notice">
        <p>Thank you for registering our CPR course!</p>
      </div>
      <br></br>
      {/*name section */}
      <Name value={formState} onChange={handleChange} />
      {/*Phone Number section */}
      <PhoneNumberInput value={formState} onChange={handleChange} />
      {/*Email section */}
      <EmailInput value={formState} onChange={handleChange} />
      {/*Time Schedule section */}
      <CourseTimeInput value={formState} onChange={handleDateChange} />
      {/*Feedback section*/}
      <FeedBackInput value={formState} onChange={handleChange} />
      {/*Terms&Condition section */}
      <TermsConditions value={formState} onChange={handleChange} />
      <br></br>
      <div className="stripe-section">
        <h4>Payment Information *</h4>
        <CardElement />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default RegistrationForm;
