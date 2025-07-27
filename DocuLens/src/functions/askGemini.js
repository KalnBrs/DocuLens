export async function askGemini(document, sessionId) {
  const response = await fetch("http://localhost:8080/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({document, sessionId}),
  });

  const data = await response.json();
  return data.response
}