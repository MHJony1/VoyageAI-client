<div align="center">

# ✈️ VoyageAI

### Plan Smarter. Travel Better.

AI-powered travel planning platform that turns "where should I go?" into a fully personalized itinerary in seconds.

[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-Utility--First-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![React Query](https://img.shields.io/badge/React_Query-Data%20Fetching-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)

[Live Demo](https://voyageai-topaz.vercel.app/) · [Backend Repository](https://github.com/MHJony1/VoyageAI-server) · [Report a Bug](../../issues)

</div>

---

## 📖 Overview

**VoyageAI** reimagines trip planning by pairing curated destination discovery with generative AI. Instead of piecing together blog posts and spreadsheets, travelers describe what they want — a destination, a budget, a number of days, a travel style — and get back a complete, editable itinerary.

This repository is the **client application**: a fast, responsive Next.js frontend that consumes the [VoyageAI API](https://github.com/MHJony1/VoyageAI-server) and delivers the full user experience, from landing page to admin dashboard.

---

## ✨ Features

| | |
|---|---|
| 🌍 **Destination Explorer** | Search, category & country filters, sorting, and pagination — fully backend-driven, no fake client-side filtering |
| 🧠 **AI Trip Planner** | Generates day-by-day itineraries from destination, budget, duration, and travel style |
| 💬 **AI Travel Assistant** | Conversational chat for on-demand travel advice, powered by Google Gemini |
| 🔐 **Authentication** | Email/password and Google Sign-In, with role-aware routing (user vs. admin) |
| 📊 **User Dashboard** | Saved trips, AI recommendation history, profile & settings management |
| 🛠️ **Admin Panel** | Standalone admin layout with full CRUD for destinations, users, and reviews — including confirmation modals on destructive actions |
| 📱 **Responsive Design** | Polished, consistent UI across mobile, tablet, and desktop |

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Data Fetching / Cache | TanStack React Query |
| HTTP Client | Axios |
| Auth | JWT + Google OAuth |
| Icons | Lucide React |
| Charts | Recharts |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router — pages & layouts
│   ├── (dashboard)/        # Authenticated user dashboard routes
│   ├── admin/               # Standalone admin panel (own layout, no public navbar/footer)
│   ├── explore/              # Destination listing & detail pages
│   └── ...
├── components/              # Reusable UI, organized by feature/domain
├── hooks/                    # Custom hooks — data fetching, auth state, etc.
├── services/                  # Axios instances & API endpoint definitions
├── types/                      # Shared TypeScript interfaces & types
└── lib/                         # Utilities and helpers
```

---

## 🚀 Getting Started
 
### Prerequisites
 
- Node.js 18+
- [VoyageAI backend](https://github.com/MHJony1/VoyageAI-server) running locally or deployed
### Installation
 
```bash
git clone https://github.com/MHJony1/VoyageAI-client.git
cd VoyageAI-client
npm install
```





### Run locally

```bash
npm run dev
```

App runs at **http://localhost:3000**.

### Production build

```bash
npm run build
npm run start
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint checks |

---

## ☁️ Deployment

Deployed via [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel login
vercel --prod
```

Make sure all environment variables are configured in the Vercel project dashboard, and that the backend API is deployed and reachable from your production domain before going live.

---

## 🗺️ Roadmap

- [ ] Wishlist / saved destinations sync across devices
- [ ] Multi-language support
- [ ] Offline itinerary export (PDF)
- [ ] Collaborative trip planning (shared itineraries)

---




<div align="center">

Built with ❤️ using Next.js & TypeScript

</div>
