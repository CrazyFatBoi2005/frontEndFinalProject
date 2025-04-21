import React from "react";
import { useState } from "react";
import "./styles.css";

function FeedbackPage() {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Feedback:", feedback);
    setFeedback("");
  };

  return (
    <div className="feedback-container">
      <h1>Your Feedback</h1>
      <form onSubmit={handleSubmit} className="feedback-form">
        <textarea
          className="feedback-textarea"
          placeholder="Write smthng..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
        <button className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackPage;
