import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { text, character } = await req.json();
    const apiKey = process.env.GOOGLE_TTS_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "TTS API Key missing" }, { status: 500 });
    }

    const voiceName = character === "senior" ? "en-US-Neural2-D" : "en-US-Neural2-F";

    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: "en-US",
            name: voiceName,
          },
          audioConfig: {
            audioEncoding: "MP3",
          },
        }),
      }
    );

    const data = await response.json();

    if (data.audioContent) {
      return NextResponse.json({ audioContent: data.audioContent });
    } else {
      console.error("TTS API Error:", data);
      return NextResponse.json({ error: "Failed to synthesize speech" }, { status: 500 });
    }
  } catch (error) {
    console.error("TTS Route Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
