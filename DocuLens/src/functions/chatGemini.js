export async function chatGemini(sessionId, message) {
  const response = await fetch("http://localhost:8080/gemini/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      "sessionId": sessionId,
      "message": message
    }),
  });

  const data = await response.json();
  return data.response
}