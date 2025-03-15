import React from "react";
import "../../styles/Delivery/FeedbackForm.css";
import NavBarV from "../../components/Delivery/NavBarV";
import SideBarV from "../../components/Delivery/SideBarV";

const FeedbackForm = () => {
  return (
    <div className="feedback-page">
      {/* <NavBarV /> */}
      <div className="content">
        <SideBarV />
        <div>
        <div className="feedback-container">
          <h2>Feedback Form</h2>
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Feedback:</label>
            <textarea id="message" name="message" rows="4" required></textarea>

            <button type="submit">Submit</button>
          </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;

