# SC/ST Channel Finance Platform — Frontend

A ChatGPT-style, bilingual (Hindi/English), voice-enabled web application that helps Scheduled Caste (SC) beneficiaries discover the right concessional credit scheme, find the nearest eligible Channel Partner, and calculate EMIs — with a full government admin dashboard.

## 🎯 SIH Problem Context

Citizens with annual family income ≤ ₹5 Lakhs are eligible for concessional loans (Micro Finance up to ₹1.40L, Term Loan up to ₹50L, Educational Loan) at 6.5%–8% p.a. via a Channel Finance System of 100+ SCAs, PSBs, RRBs, and NBFC-MFIs. Direct applications are not entertained — funds are routed through Channel Partners.

**The problem:** citizens don't know which scheme fits them or which partner to approach.

**This app solves it** with an AI chat, smart recommender, EMI calculator, and a geo-spatial partner locator that filters out partners with high NPAs / overdues.

## 🏗️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14 (App Router)** | SSR for SEO, built-in routing, API proxy, easy Vercel deploy |
| Language | **TypeScript** | Type-safe from day one |
| Styling | **Tailwind CSS** | Utility-first, dark mode built-in |
| State | **Zustand** | Tiny, no boilerplate |
| Maps | **Leaflet + OpenStreetMap** | Free, no Google API key needed |
| Voice | **Web Speech API** | Free, works in Chrome/Edge, supports `hi-IN` + `en-IN` |
| i18n | **Custom React Context + JSON messages** | Zero-dependency, full UI + AI reply translation |
| Theming | **next-themes** | Light/dark toggle with system preference |
| Auth | **JWT (access + refresh)** stored in httpOnly cookies via backend | Simple, standard |

## ✨ Features

- **AI Chat (ChatGPT-style)** — streaming responses, bilingual, voice input
- **Smart Scheme Recommender** — AI + rule engine recommends the best scheme from user inputs
- **EMI / Loan Calculator** — dynamic, respects max loan limits, interest rates, moratorium periods
- **Geo-Spatial Partner Locator** — Leaflet map + radius filter, excludes partners with high NPA/overdues
- **Admin Dashboard** — scheme CRUD, partner management, user analytics, ingestion pipeline control
- **Auto-Scheme Ingestion UI** — manage seed URLs, trigger crawls, review AI-extracted schemes
- **Full Localization** — every label, AI reply, and scheme field available in Hindi & English
- **Light + Dark mode**

## 🚀 Quick Start (Local)

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env.local
# Edit .env.local — set NEXT_PUBLIC_API_URL to your backend

# 3. Run
npm run dev
# Open http://localhost:3000
```

The frontend **works standalone** with mock data if the backend is unreachable — perfect for UI demos.

## 🐳 Docker

```
docker build -t scst-frontend .
docker run -p 3000:3000 --env-file .env.local scst-frontend
```

Or via docker-compose (from project root):

```
docker compose up frontend
```

## 🌐 Cloud Deploy (Vercel)

1. Push to GitHub
2. Import repo on vercel.com
3. Set `NEXT_PUBLIC_API_URL` in project settings
4. Deploy

## 📁 Project Structure

```
frontend/
├── messages/             # i18n JSON (en, hi)
├── public/               # static assets
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── chat/         # ChatGPT-style interface
│   │   ├── schemes/      # scheme browse + detail
│   │   ├── partners/     # geo-spatial locator
│   │   ├── calculator/   # EMI calculator
│   │   ├── admin/        # govt dashboard (RBAC)
│   │   ├── login/        # JWT login
│   │   └── register/     # signup
│   ├── components/       # reusable UI
│   ├── lib/              # api client, auth, i18n, theme, mock data
│   ├── hooks/            # custom hooks (voice, etc.)
│   └── types/            # shared TS types
```

## 🔌 Backend Integration

The frontend expects these endpoints from the backend (see `src/lib/api.ts`):

| Method ↕▾ | Path ↕▾ | Purpose ↕▾ |
|---|---|---|
| −POST | `/api/auth/register` | Create account |
| −POST | `/api/auth/login` | Get JWT |
| −POST | `/api/auth/refresh` | Refresh token |
| −GET | `/api/schemes` | List schemes (filterable) |
| GET | `/api/schemes/:id` | Scheme detail |
| POST | `/api/recommend` | AI scheme recommender |
| POST | `/api/chat` | Streaming chat (SSE) |
| GET | `/api/partners/nearby` | Geo query |
| POST | `/api/calculator/emi` | EMI computation |
| GET | `/api/admin/*` | Admin (RBAC) |
⚙

If the backend is not running, all calls fall back to `src/lib/mock-data.ts`.

## 🎨 Design System

- **Light mode:** white backgrounds, near-black text, soft blue accent (`#4d6bfe`)
- **Dark mode:** deep slate, same accent
- **Typography:** system stack + Noto Sans Devanagari for Hindi
- **Radius:** 12px cards, 8px buttons

## 📝 License

Built for Smart India Hackathon. Free to use, modify, and submit.

