"use client";

import React, { useState } from "react";

interface ErrorInputProps {
  onAnalyze: (error: string, character: "senior" | "spark") => void;
  isLoading: boolean;
  selectedCharacter: "senior" | "spark" | null;
}

export default function ErrorInput({ onAnalyze, isLoading, selectedCharacter }: ErrorInputProps) {
  const [errorText, setErrorText] = useState("");

  return (
    <div className="flex flex-col gap-6 w-full max-w-2xl mx-auto p-6 bg-zinc-900 rounded-2xl shadow-xl border border-zinc-800">
      <div>
        <h2 className="text-xl font-bold text-zinc-100 mb-2">Drop your error here</h2>
        <textarea
          className="w-full h-40 p-4 bg-zinc-950 border border-zinc-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-zinc-200 placeholder-zinc-500 transition-all"
          placeholder="Paste that annoying error code..."
          value={errorText}
          onChange={(e) => setErrorText(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-sm font-medium text-zinc-400 mb-3 uppercase tracking-wider">Choose your expert</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => onAnalyze(errorText, "senior")}
            disabled={isLoading || !errorText.trim()}
            className={`
              relative flex flex-col items-start p-4 rounded-xl text-left transition-all duration-300 border-2
              ${
                selectedCharacter === "senior"
                  ? "bg-red-950/40 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                  : "bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-red-900/50"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <span className="text-xl mb-1">🌶️</span>
            <span className={`font-bold ${selectedCharacter === "senior" ? "text-red-400" : "text-zinc-200"}`}>
              Senior
            </span>
            <span className="text-xs text-zinc-500 mt-1">Sarcastic, sharp, straight to the pain.</span>
            {isLoading && selectedCharacter === "senior" && (
              <span className="absolute top-4 right-4 text-xs font-semibold text-red-400 animate-pulse">Thinking...</span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onAnalyze(errorText, "spark")}
            disabled={isLoading || !errorText.trim()}
            className={`
              relative flex flex-col items-start p-4 rounded-xl text-left transition-all duration-300 border-2
              ${
                selectedCharacter === "spark"
                  ? "bg-fuchsia-950/40 border-fuchsia-500 shadow-[0_0_15px_rgba(217,70,239,0.2)]"
                  : "bg-zinc-800/50 border-zinc-700/50 hover:bg-zinc-800 hover:border-fuchsia-900/50"
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            <span className="text-xl mb-1">✨</span>
            <span className={`font-bold ${selectedCharacter === "spark" ? "text-fuchsia-400" : "text-zinc-200"}`}>
              Spark
            </span>
            <span className="text-xs text-zinc-500 mt-1">Bubbly, fun, everyday analogies.</span>
            {isLoading && selectedCharacter === "spark" && (
              <span className="absolute top-4 right-4 text-xs font-semibold text-fuchsia-400 animate-pulse">Thinking...</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
