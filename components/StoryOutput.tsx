"use client";

import React, { useState, useEffect } from "react";

interface StoryOutputProps {
  story: string;
  character: "senior" | "spark" | null;
}

export default function StoryOutput({ story, character }: StoryOutputProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    if (!story || !character) {
      setImageSrc(null);
      setIsGeneratingImage(false);
      return;
    }

    const generateImage = async () => {
      setIsGeneratingImage(true);
      setImageSrc(null);

      try {
        const response = await fetch("/api/image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ story, character }),
        });

        const data = await response.json();
        if (data.imageBase64) {
          setImageSrc(`data:image/png;base64,${data.imageBase64}`);
        } else {
          console.error("Failed to generate image:", data.error);
        }
      } catch (err) {
        console.error("Image fetch error:", err);
      } finally {
        setIsGeneratingImage(false);
      }
    };

    generateImage();
  }, [story, character]);

  if (!story) return null;

  const characterName = character === "senior" ? "Senior 🌶️" : "Spark ✨";
  const bgColor = character === "senior" ? "bg-red-950/30" : "bg-fuchsia-950/30";
  const borderColor = character === "senior" ? "border-red-900/50" : "border-fuchsia-900/50";
  const textColor = character === "senior" ? "text-red-100" : "text-fuchsia-100";
  const nameColor = character === "senior" ? "text-red-400" : "text-fuchsia-400";
  
  const btnBg = character === "senior" ? "bg-red-900/50 hover:bg-red-800/60" : "bg-fuchsia-900/50 hover:bg-fuchsia-800/60";
  const btnText = character === "senior" ? "text-red-200" : "text-fuchsia-200";
  
  const skeletonBg = character === "senior" ? "bg-red-900/20" : "bg-fuchsia-900/20";

  const handleListen = async () => {
    if (isPlaying) return;
    setIsPlaying(true);

    try {
      const response = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: story, character }),
      });

      const data = await response.json();
      if (data.audioContent) {
        const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
        audio.onended = () => setIsPlaying(false);
        audio.play();
      } else {
        alert("Failed to get audio. Check API key.");
        setIsPlaying(false);
      }
    } catch (err) {
      console.error(err);
      setIsPlaying(false);
    }
  };

  return (
    <div className={`w-full max-w-2xl mx-auto mt-8 p-6 rounded-2xl border ${bgColor} ${borderColor} shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-xl font-bold ${nameColor}`}>{characterName} says:</h3>
        <button
          onClick={handleListen}
          disabled={isPlaying}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 ${btnBg} ${btnText} disabled:opacity-50 border border-white/5`}
        >
          {isPlaying ? (
            <>
              <span className="w-2 h-2 rounded-full bg-current animate-ping" />
              Playing...
            </>
          ) : (
            "Listen 🔊"
          )}
        </button>
      </div>
      <p className={`text-lg leading-relaxed italic font-medium mb-6 ${textColor}`}>
        &quot;{story}&quot;
      </p>

      {/* Image Generation Section */}
      {isGeneratingImage && (
        <div className={`w-full aspect-square max-w-sm mx-auto rounded-xl animate-pulse flex items-center justify-center border border-white/10 ${skeletonBg}`}>
          <div className="flex flex-col items-center gap-3">
            <span className="text-3xl animate-bounce">🎨</span>
            <span className={`text-sm font-medium ${textColor} opacity-70`}>Visualizing the pain...</span>
          </div>
        </div>
      )}

      {imageSrc && !isGeneratingImage && (
        <div className="w-full flex justify-center mt-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageSrc} 
            alt="Generated illustration of the error analogy" 
            className="w-full max-w-sm aspect-square rounded-xl shadow-md border border-white/10 object-cover"
          />
        </div>
      )}
    </div>
  );
}
