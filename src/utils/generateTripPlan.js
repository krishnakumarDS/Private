export const generateTripPlan = async (userInput) => {
  if (
    !userInput.startLocation ||
    !userInput.location ||
    !userInput.budget ||
    !userInput.days ||
    !userInput.userType
  ) {
    return "Missing required user input. Please fill in all fields.";
  }

  const prompt = `
You are a travel planner AI assistant. Based on the details provided below, generate a complete trip itinerary including:

1. A **route-based plan** starting from ${userInput.startLocation} to ${
    userInput.location
  }.
2. Suggest **notable places to visit on the way**, such as cities, towns, or natural spots.
3. Provide a **day-by-day itinerary** for ${
    userInput.days
  } days at the destination with Budget.
4. Ensure the plan is tailored for a ${userInput.userType}-friendly experience.
5. Stick to the budget of ₹${
    userInput.budget
  } and consider travel + stay + experience.

User Info:
- Name: ${userInput.name || "N/A"}
- Start Location: ${userInput.startLocation}
- Destination: ${userInput.location}
- Duration: ${userInput.days} days
- Budget: ₹${userInput.budget}
- Traveler Type: ${userInput.userType}

Return only the trip plan in a simple, readable format.
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyAEaRZSpV_iB5ruw_bchNEAOizGerXTJ - U",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    const data = await response.json();
    return (
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from Gemini."
    );
  } catch (error) {
    console.error("Error:", error);
    return "Failed to fetch trip plan.";
  }
};
