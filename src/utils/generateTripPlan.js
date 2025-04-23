export const generateTripPlan = async (userInput) => {
  if (
    !userInput.location ||
    !userInput.budget ||
    !userInput.days ||
    !userInput.userType
  ) {
    return "Missing required user input. Please fill in all fields.";
  }

  const prompt = `
You are an expert travel planner AI. Based on the following user input, generate:

1. A day-wise plan for ${userInput.days} days in ${
    userInput.location
  } with a budget of ₹${userInput.budget}.
2. Tailor the plan to be ${userInput.userType.toLowerCase()}-friendly.

User Details:
- Name: ${userInput.name || "N/A"}
- Type: ${userInput.userType}
- Location: ${userInput.location}
- Budget: ₹${userInput.budget}
- Duration: ${userInput.days} days

Return only the trip plan in a simple readable format.
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
