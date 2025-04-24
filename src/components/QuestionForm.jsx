import React, { useState } from "react";
import "../styles/QuestionForm.css";

function QuestionForm({ onSubmit }) {
  const [startLocation, setStartLocation] = useState(""); // NEW
  const [location, setLocation] = useState("");
  const [days, setDays] = useState("");
  const [budget, setBudget] = useState("");
  const [userType, setUserType] = useState("couple");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ startLocation, location, days, budget, userType, name }); // include startLocation
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
        Start Location 🚉
        <input
          type="text"
          value={startLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          placeholder="e.g. Madurai"
          required
        />
      </label>

      <label>
        Destination 🗺️
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Kerala"
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
