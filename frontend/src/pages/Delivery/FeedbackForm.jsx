import React, { useState } from "react";
import axios from "axios";
import "../../styles/Delivery/FeedbackForm.css";

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5555/feedbacks", formData);
      if (response.status === 201) {
        setSuccessMessage("Feedback submitted successfully!");
        setErrorMessage("");
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      setErrorMessage("Failed to submit feedback. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="Feedback-delivery-dashboard">
      <div className="feedback-container">
        <h2>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Feedback:</label>
          <textarea
            id="message"
            name="message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">Submit</button>
        </form>

        {successMessage && <p className="success-text">{successMessage}</p>}
        {errorMessage && <p className="error-text">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Feedback;
