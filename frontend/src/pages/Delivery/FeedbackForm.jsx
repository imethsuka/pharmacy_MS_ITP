import React from "react";
import "./styles/FeedbackForm.css"; 
import BarsV from "./BarsV"
import SideBar from "./SideBar"

const FeedbackForm = () => {
  return (
   <> 
    <div className="form-container">
      <div className="header">
        <h2>Pharmacy Customer Feedback Form</h2>
        <h4>Please fill out this form completely to share your feedback about our services.</h4>
      </div>

      <form>
        <div className="form-group">
          <label>Name</label>
          <div className="name-fields">
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input type="tel" placeholder="Phone" />
        </div>

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

        <button type="submit">Submit</button>
      </form>
    </div>

<BarsV/>
<SideBar/>
</>
  );
};

export default FeedbackForm;