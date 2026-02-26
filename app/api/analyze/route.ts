import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { error, character } = await req.json();

    if (!error || !character) {
      return NextResponse.json({ error: "Missing error or character" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_FREE_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_FREE_KEY missing" }, { status: 500 });
    }

    let prompt = "";

    if (character === "senior") {
      prompt = `You are a sarcastic, sharp senior developer (Senior 🌶️). 
      Explain WHY this error happens using a clever analogy. 
      Do NOT explain how to fix it. 
      Keep it between 3-5 sentences in English. 
      Error: ${error}`;
    } else if (character === "spark") {
      prompt = `You are a bubbly, fun person who uses cute everyday analogies (Spark ✨). 
      Explain WHY this error happens using a cute analogy. 
      Do NOT explain how to fix it. 
      Keep it between 3-5 sentences in English. 
      Error: ${error}`;
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Gemini Analyze API Error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Oops, Gemini is feeling shy right now.";

    return NextResponse.json({ text });
  } catch (err: unknown) {
    console.error(err);
    return NextResponse.json({ error: "Failed to analyze error" }, { status: 500 });
  }
}
