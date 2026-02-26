import { NextResponse } from "next/server";
import { model3, model25 } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const { story, character } = await req.json();

    // 1. Extract core analogy using Gemini
    let extractedPrompt = "";
    const extractInstruction = `Extract the core visual scene or analogy from this story into a single, short descriptive sentence suitable for an image generator prompt. Do not include any text or words in the prompt, just the visual description: ${story}`;
    
    try {
      const result = await model3.generateContent(extractInstruction);
      extractedPrompt = result.response.text().trim();
    } catch (e) {
      console.error("Gemini 3 failed prompt extraction, trying 2.5", e);
      const result = await model25.generateContent(extractInstruction);
      extractedPrompt = result.response.text().trim();
    }

    // 2. Add character styling
    let finalPrompt = extractedPrompt;
    if (character === "senior") {
      finalPrompt += ", dark moody illustration style, dramatic lighting, serious tone";
    } else {
      finalPrompt += ", bright colorful cartoon style, cute, cheerful, vibrant colors";
    }

    // 3. Call Google AI Studio Imagen API (Paid)
    const apiKey = process.env.GEMINI_PAID_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_PAID_KEY missing" }, { status: 500 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "x-goog-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instances: [{ prompt: finalPrompt }],
        parameters: { sampleCount: 1 }
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("Imagen API Error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 500 });
    }

    // Extract base64 image data from predictions array
    const imageData = data.predictions?.[0]?.bytesBase64Encoded;

    if (!imageData) {
       console.error("No image data returned from Imagen API response", data);
       return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    return NextResponse.json({ imageBase64: imageData });

  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Image API Error:", errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
