# Project Context & Guidelines

## Verified Models (Google Official)
The following models are confirmed to be official and operational as of the current development phase. These model names must be used for all generative AI features in this project.

- **Main Model:** `gemini-3-flash-preview`
- **Fallback Model:** `gemini-2.5-flash`

## Implementation Details
- `lib/gemini.ts` uses these specific identifiers to initialize the `GoogleGenerativeAI` instance.
- These names are verified directly from Google's official documentation for the current environment.
