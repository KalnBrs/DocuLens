export async function askGemini(document) {
  const response = await fetch("http://localhost:8080/gemini", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ document }),
  });

  const data = await response.json();
  console.log(data.test)
  return data.response
}