
export async function onRequestPost({ request, env }) {
  if (!env.GEMINI_API_KEY) {
    return Response.json({
      error: "AI service is not configured yet."
    }, { status: 503 });
  }

  let input;
  try {
    input = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const languages = ["Marathi", "Hindi", "English"];
  const language = languages.includes(input.language)
    ? input.language : "Marathi";

  const fields = ["work", "team", "materials", "aftercare"];
  const answers = {};

  for (const key of fields) {
    answers[key] = typeof input[key] === "string"
      ? input[key].trim().slice(0, 700) : "";
  }

  if (!fields.some(key => answers[key])) {
    return Response.json({
      error: "Please share your actual experience."
    }, { status: 400 });
  }

  const prompt = `
Write one natural Google review in ${language}
for Swarajya Solar Services.

Use ONLY the customer's actual experience below.

Rules:
- Never invent facts or claims.
- Do not add fake savings or warranties.
- Do not force a five-star rating.
- Do not add promotional keywords.
- Use natural first-person language.
- Keep the review concise and genuine.
- Output only the review draft.

Customer experience:
${JSON.stringify(answers)}
`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" +
      encodeURIComponent(env.GEMINI_API_KEY),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 220
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json({
        error: "AI provider error. Check API key and usage limits."
      }, { status: 502 });
    }

    const review = data?.candidates?.[0]?.content?.parts
      ?.map(part => part.text || "").join("").trim();

    if (!review) {
      return Response.json({
        error: "Could not generate review. Please try again."
      }, { status: 502 });
    }

    return Response.json({ review });

  } catch {
    return Response.json({
      error: "AI service unavailable. Please try again."
    }, { status: 502 });
  }
}
