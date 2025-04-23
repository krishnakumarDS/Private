import React from "react";
import "../styles/HeroSection.css";

const HeroSection = ({ onStart }) => {
  return (
    <div className="hero-container">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">🌍 Plan Your Dream Trip with AI ✈️</h1>
        <p className="hero-description">
          Tell us what you love, and we’ll create the perfect travel plan just
          for you.
        </p>
        <button className="hero-button" onClick={onStart}>
          🚀 Plan Trip with AI
        </button>
      </div>
      <div className="hero-image-container">
        <img
          className="hero-image"
          src="https://via.placeholder.com/800x500.png?text=Travel+With+AI"
          alt="Travel with AI"
        />
      </div>
    </div>
  );
};

export default HeroSection;
