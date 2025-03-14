import React from "react";
import "../../styles/Delivery/FeedbackForm.css";
import NavBar from "../../components/Delivery/NavBar";
import SideBarV from "../../components/Delivery/SideBarV";

const FeedbackForm = () => {
  return (
    <div className="feedback-page">
      {/* Sidebar */}
      <SideBarV />

      {/* Main Content */}
      <div className="main-content">
        {/* Navbar */}
        <NavBar />

        {/* Feedback Form */}
        {/* <div className="header">
            <h2>Pharmacy Customer Feedback Form</h2>
            <h4>Thank you for choosing Sethsiri Pharmacy. We value your feedback.</h4>
            <h4>Please fill out this form completely to share your feedback about our services.</h4>
          </div> */}
        <div className="form-container">
      <form className="Form-content">
            {/* Name Fields */}
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Full Name" />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter your email" />
            </div>

            {/* Phone Number */}
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="Phone" />
            </div>

            {/* Rating */}
            <div className="form-group">
              <label>How would you rate your overall experience with our pharmacy?</label>
              <div className="rating">
                {[1, 2, 3, 4, 5].map((num) => (
                  <label key={num}>
                    <input type="radio" name="rating" value={num} /> {num}
                  </label>
                ))}
              </div>
            </div>

            {/* Message Typing Column */}
            <div className="form-group">
              <label>Your Feedback</label>
              <textarea placeholder="Write your feedback here..."></textarea>
            </div>

            {/* Submit Button */}
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
