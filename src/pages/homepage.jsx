import React from "react";
import "../styles/HeroSection.css";

const HeroSection = ({ onStart }) => {
  return (
    <div className="hero-container">
      <h1>Plan Your Dream Trip with AI ✈️</h1>
      <p>Tell us what you love, and we’ll create the perfect travel plan.</p>
      <button onClick={onStart}>Plan Trip with AI</button>
    </div>
  );
};

export default HeroSection;
