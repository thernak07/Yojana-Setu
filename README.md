# CODING AGENTS: READ THIS FIRST

This is a **handoff bundle** from Claude Design (claude.ai/design).

A user mocked up designs in HTML/CSS/JS using an AI design tool, then exported this bundle so a coding agent can implement the designs for real.

## What you should do — IMPORTANT

**Read the chat transcripts first.** There are 1 chat transcript(s) in `chats/`. The transcripts show the full back-and-forth between the user and the design assistant — they tell you **what the user actually wants** and **where they landed** after iterating. Don't skip them. The final HTML files are the output, but the chat is where the intent lives.

**Read `project/Scheme Match Assistant.dc.html` in full.** The user had this file open when they triggered the handoff, so it's almost certainly the primary design they want built. Read it top to bottom — don't skim. Then **follow its imports**: open every file it pulls in (shared components, CSS, scripts) so you understand how the pieces fit together before you start implementing.

**If anything is ambiguous, ask the user to confirm before you start implementing.** It's much cheaper to clarify scope up front than to build the wrong thing.

## About the design files

The design medium is **HTML/CSS/JS** — these are prototypes, not production code. Your job is to **recreate them pixel-perfectly** in whatever technology makes sense for the target codebase (React, Vue, native, whatever fits). Match the visual output; don't copy the prototype's internal structure unless it happens to fit.

**Don't render these files in a browser or take screenshots unless the user asks you to.** Everything you need — dimensions, colors, layout rules — is spelled out in the source. Read the HTML and CSS directly; a screenshot won't tell you anything they don't.

## Bundle contents

- `README.md` — this file
- `chats/` — conversation transcripts (read these!)
- `project/` — the `AI Scheme Matching Platform` project files (HTML prototypes, assets, components)
- `client/` — the implemented app: Vite + React frontend
- `server/` — the implemented app: Express backend that calls Gemini and proxies AI calls for the frontend

---

# Setu — implementation (built from the design above)

Full-stack build of the "Scheme Match Assistant" design: a landing page, an AI chat interface with a live-updating ranked scheme rail, and slide-over panels for scheme detail / application drafting / document checklist. Chat replies and matches are generated live by Gemini through the `server/` backend; if the backend or API key is unavailable, the app transparently falls back to a built-in rule engine (ported from the original prototype) so a demo never dies on stage.

Also implemented beyond the original prototype: a functional English/Hindi toggle (UI chrome **and** AI replies switch language) and real voice input / text-to-speech via the browser's Web Speech API.

## Run it

**1. Get a free Gemini API key** at https://aistudio.google.com/apikey

**2. Server**
```
cd server
cp .env.example .env   # then paste your key into GEMINI_API_KEY=
npm install
npm run dev             # http://localhost:8787
```

**3. Client** (separate terminal)
```
cd client
npm install
npm run dev              # http://localhost:5173
```

Open http://localhost:5173. The Vite dev server proxies `/api/*` to the Express server on port 8787.

Without a key (or with the server not running), the app still works end-to-end using its offline rule engine — the header badge shows "Offline rules" instead of "Live AI".

## Notes

- **State is in-memory only** (per the hackathon scope) — refreshing the page clears the conversation. No database.
- **Model**: defaults to `gemini-2.5-flash` (fast + cheap for a live demo); override via `GEMINI_MODEL` in `server/.env`.
- **Hindi mode**: toggle "EN · हिं" in the header. UI copy and the AI's chat replies switch to Hindi; scheme/agency names and structured data stay in English for consistent rendering.
- **Voice**: the mic button in the composer uses `SpeechRecognition` (Chrome/Edge); the "🔊 Read aloud" header toggle speaks new assistant replies via `SpeechSynthesis`. Both no-op gracefully in unsupported browsers.

## Where scheme data comes from

There is no live government schemes API (checked — neither myscheme.gov.in nor data.gov.in expose one). Three layers instead, in priority order:

1. **`server/data/schemes.json`** (also mirrored to `client/src/data/schemes.json` for the offline path) — a curated database of 12 real schemes (PM MUDRA, PMEGP, CGTMSE, Stand-Up India, PM Vishwakarma, Startup India Seed Fund, plus NBCFDC/NHFDC/NSKFDC/NSFDC/NSTFDC/SMILE for OBC/PwD/Safai Karamchari/SC/ST/transgender routes), researched from official .gov.in/nic.in sources and verified as of the date in `lastVerified`. This is real data, but **frozen** — it won't update itself. Re-research and edit this file periodically to keep it current.
2. **Gemini Google Search grounding** (`server/lib/groundedSearch.js`) — every chat turn and panel open also runs a live Gemini search (biased toward myscheme.gov.in, India's official scheme aggregator) for anything *not* in the curated file — state-specific schemes, newly announced ones. Adds latency (an extra model call) and API usage beyond the free tier; degrades gracefully to curated-only if it fails or the key lacks grounding access.
3. **Model memory** — only as a last resort, for details neither of the above covers, always marked lower confidence in the UI.

Every match and panel shows its **Sources** (clickable links to where the data came from) so this is always checkable, not just asserted.
