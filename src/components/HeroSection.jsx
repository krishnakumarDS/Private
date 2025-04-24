import React from "react";
import "../styles/HeroSection.css";

const HeroSection = ({ onStart }) => {
  return (
    <div className="hero-container">
      <div className="hero-overlay"></div>
      <div className="glow-orbs">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
      </div>
      <div className="hero-content">
        <h1 className="hero-title">Plan Your Dream Trip with AI</h1>
        <p className="hero-description">
          Design your perfect vacation with intelligent day-by-day planning.
        </p>
        <button className="hero-button" onClick={onStart}>
          Start Planning Now
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
