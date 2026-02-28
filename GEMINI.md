# Project Context & Guidelines

## Verified Models (Google Official)
The following models are confirmed to be official and operational for this project.

- **Text Analysis:** `gemini-2.5-flash` (via `GEMINI_FREE_KEY`)
- **Image Generation:** `imagen-4.0-generate-001` (via `GEMINI_PAID_KEY`)
- **Legacy/Internal Identifiers:** `gemini-3-flash-preview`, `gemini-2.5-flash`

## API Architecture
- **Free Tier:** Used for text analysis and prompt extraction.
  - Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`
  - Auth: `?key=${GEMINI_FREE_KEY}`
- **Paid Tier:** Used for high-quality image generation (KnowLog).
  - Endpoint: `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict`
  - Auth: `x-goog-api-key: ${GEMINI_PAID_KEY}` header

## Implementation Notes
- All major API calls have been refactored from SDKs to direct `fetch` calls for better control over headers and specific model endpoints.
- `.env.local` contains the sensitive keys and is strictly ignored by Git.
