"use client";

import { useState } from "react";
import ErrorInput from "@/components/ErrorInput";
import StoryOutput from "@/components/StoryOutput";

export default function Home() {
  const [story, setStory] = useState("");
  const [character, setCharacter] = useState<"senior" | "spark" | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAnalyze = async (error: string, char: "senior" | "spark") => {
    setIsLoading(true);
    setStory("");
    setCharacter(char);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error, character: char }),
      });

      const data = await response.json();
      if (data.text) {
        setStory(data.text);
      } else {
        setStory("Oops, Gemini is feeling shy right now.");
      }
    } catch (err) {
      console.error(err);
      setStory("Something went wrong. Even I don't know why.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">
          Error Talk v2
        </h1>
        <p className="text-lg text-zinc-400">
          Paste your error and let our experts tell you why it&apos;s happening (in their own way).
        </p>
      </div>

      <ErrorInput onAnalyze={handleAnalyze} isLoading={isLoading} selectedCharacter={character} />

      {isLoading && (
        <div className="flex justify-center mt-8">
          <div className="animate-pulse text-zinc-500 font-medium">Analyzing...</div>
        </div>
      )}

      <StoryOutput story={story} character={character} />
    </main>
  );
}
