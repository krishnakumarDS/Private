import React, { useState } from "react";
import "../styles/QuestionForm.css";

function QuestionForm({ onSubmit }) {
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [userType, setUserType] = useState("couple");
  const [name, setName] = useState(""); // Added state for name

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ location, days, budget, userType, name });
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <h2>🧳 Plan Your Trip</h2>

      <label>
        Name 👤
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
        />
      </label>

      <label>
        Destination 🗺️
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Madurai"
          required
        />
      </label>

      <label>
        Number of Days 📅
        <input
          type="number"
          value={days}
          onChange={(e) => setDays(e.target.value)}
          min="1"
          required
        />
      </label>

      <label>
        Budget (INR) 💰
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          min="1000"
          required
        />
      </label>
      <label className="traveler-type-label">
        Traveler Type 🚶
        <div className="traveler-type-grid">
          {["couple", "group", "family", "solo"].map((type) => (
            <div
              key={type}
              className={`traveler-option ${
                userType === type ? "selected" : ""
              }`}
              onClick={() => setUserType(type)}
            >
              {type === "couple" && "💑 Couple"}
              {type === "group" && "👯 Group"}
              {type === "family" && "👨‍👩‍👧‍👦 Family"}
              {type === "solo" && "🧍 Solo"}
            </div>
          ))}
        </div>
      </label>

      <button type="submit">🚀 Plan Trip with AI</button>
    </form>
  );
}

export default QuestionForm;
