import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_FREE_KEY;

if (!apiKey) {
  throw new Error("GEMINI_FREE_KEY is not defined in environment variables");
}

const genAI = new GoogleGenerativeAI(apiKey);

export const model3 = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

export const model25 = genAI.getGenerativeModel({
  model: "gemini-2.5-flash",
});
