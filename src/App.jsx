import React, { useState, useEffect } from "react";
import HeroSection from "./components/HeroSection";
import QuestionForm from "./components/QuestionForm";
import { generateTripPlan } from "./utils/generateTripPlan";
import { jsPDF } from "jspdf"; // Import jsPDF for PDF generation
import "./styles/App.css"; // 💅 New styles added here

function App() {
  const [showForm, setShowForm] = useState(false);
  const [userInput, setUserInput] = useState(null);
  const [tripPlan, setTripPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  const loadingMessages = [
    "🧠 Our AI is thinking deeply...",
    "🌍 Gathering insights from thousands of trips...",
    "⏳ You're in the planning queue. Almost there...",
    "🏝️ Your perfect escape is being brewed just for you...",
    "🗺️ Almost done... Get ready for magic!",
  ];

  useEffect(() => {
    let interval;
    if (isLoading) {
      interval = setInterval(() => {
        setLoadingMsgIndex((prev) =>
          prev < loadingMessages.length - 1 ? prev + 1 : 0
        );
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const startTripPlanning = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (data) => {
    setUserInput(data);
    setIsLoading(true);
    setTripPlan("");

    const result = await generateTripPlan(data);
    setTripPlan(result);
    setIsLoading(false);
  };

  // Function to convert the trip plan to a well-formatted PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(16);
    doc.text("AI Generated Trip Plan", 10, 10); // Title
    doc.setFontSize(12);

    // Add trip details
    doc.text("🌍 Trip Details", 10, 20);
    doc.setFontSize(10);
    doc.text(`Destination: ${userInput.location}`, 10, 30);
    doc.text(`Number of Days: ${userInput.days}`, 10, 35);
    doc.text(`Budget: ₹${userInput.budget}`, 10, 40);
    doc.text(`Traveler Type: ${userInput.userType}`, 10, 45);
    doc.text(`Name: ${userInput.name}`, 10, 50);
    doc.setFontSize(12);

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(10, 55, 200, 55); // Draw a line for separation

    // Add the trip plan content
    doc.text("🗺️ Itinerary", 10, 60);
    const tripPlanLines = tripPlan.split("\n");
    let yPosition = 70;

    tripPlanLines.forEach((line) => {
      if (yPosition >= 280) {
        doc.addPage();
        yPosition = 10;
      }

      if (line.startsWith("**")) {
        doc.setFontSize(14);
        doc.text(line.replace(/\*\*/g, ""), 10, yPosition);
        yPosition += 8;
      } else if (line.startsWith("1.") || line.startsWith("2.")) {
        doc.setFontSize(12);
        doc.text(line, 10, yPosition);
        yPosition += 8;
      } else if (line.startsWith("-")) {
        doc.setFontSize(12);
        doc.text("• " + line.replace("-", "").trim(), 10, yPosition);
        yPosition += 8;
      } else {
        doc.setFontSize(12);
        doc.text(line, 10, yPosition);
        yPosition += 8;
      }
    });

    // Save the PDF with a filename
    doc.save("trip-plan.pdf");
  };

  return (
    <div className="App">
      {!showForm && <HeroSection onStart={startTripPlanning} />}
      {showForm && <QuestionForm onSubmit={handleFormSubmit} />}

      {isLoading && (
        <div className="loading-box">
          <p className="loading-text">{loadingMessages[loadingMsgIndex]}</p>
        </div>
      )}

      {!isLoading && tripPlan && (
        <div className="trip-plan-output">
          <h2>🗺️ Your AI Trip Plan</h2>
          <div className="styled-output">
            {tripPlan.split("\n").map((line, index) => {
              if (line.startsWith("**")) {
                return <h3 key={index}>{line.replace(/\*\*/g, "")}</h3>;
              } else if (line.startsWith("1.") || line.startsWith("2.")) {
                return (
                  <p key={index} className="hotel-line">
                    {line}
                  </p>
                );
              } else if (line.startsWith("-")) {
                return <li key={index}>{line.replace("-", "•")}</li>;
              } else {
                return <p key={index}>{line}</p>;
              }
            })}
          </div>
          {/* Button to download the trip plan as a PDF */}
          <button className="download-pdf-button" onClick={downloadPDF}>
            📄 Download PDF
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
