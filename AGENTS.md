# AGENTS.md — VoyageAI Client

## What this is

Next.js 16 + React 19 client for an AI-powered travel planning platform. Talks to a separate backend at `NEXT_PUBLIC_API_URL` (default `http://localhost:5000/api/v1`). No tests exist.

## Commands

- `npm run dev` — dev server (Next.js)
- `npm run build` — production build
- `npm run lint` — ESLint (`next lint`)
- No test command. No test files.

## Path aliases

`@/*` → `./src/*` (configured in tsconfig.json). Use it everywhere.

## Project structure

```
src/
  app/              # Next.js App Router pages
    (dashboard)/    # Route group: user dashboard (sidebar layout)
    (admin)/        # Route group: admin panel (sidebar layout)
    explore/        # Public destination browsing ([id] route)
    login/          # Auth pages
    register/
  components/       # Shared + feature-specific UI components
    admin/          # Admin-only components
    auth/           # Login/register components
    dashboard/      # Dashboard layout + shared dashboard components
    destination/    # Destination detail components
    explore/        # Explore page components
    home/           # Landing page sections (HeroSection, AIFeatures, etc.)
  hooks/            # React Query hooks — one per service domain
  lib/              # cn() utility (clsx + tailwind-merge)
  modules/          # Empty barrel — reserved for feature modules
  providers/        # AuthProvider (Context), QueryProvider (TanStack Query)
  services/         # Axios-based API service layer
  types/            # Shared TypeScript interfaces
  constants/        # App constants
  utils/            # Utility functions
```

## Architecture patterns

- **Auth**: `AuthProvider` (React Context) wraps the app. JWT stored in localStorage, sent via axios interceptor in `services/api.ts`.
- **Data fetching**: All hooks in `hooks/` use `@tanstack/react-query`. Each hook wraps `apiClient` calls. No SWR, no raw fetch.
- **Forms**: `react-hook-form` + `zod` resolvers.
- **Styling**: Tailwind CSS v4 via `@tailwindcss/postcss`. Utility function `cn()` from `lib/cn.ts` for conditional classes. Custom CSS component classes in `globals.css` (e.g. `.text-h1`, `.gradient-primary`, `.container-custom`).
- **Layout**: Root layout → QueryProvider → AuthProvider → LayoutWrapper. Dashboard/admin routes have their own nested layouts with sidebar navigation. Public pages get Navbar + Footer; dashboard/admin do not.
- **State**: No global state beyond AuthProvider. All server state via React Query cache.

## Gotchas

- `.env.local` contains `NEXT_PUBLIC_API_URL` and Google OAuth client ID. The IMGBB key is empty.
- `globals.css` defines custom responsive utility classes inside `@layer utilities`. These duplicate some Tailwind defaults — prefer standard Tailwind classes unless using the project's custom ones.
- No test suite exists. If adding tests, there's no established pattern to follow.
- `tsconfig.json` has `noUnusedLocals: true` and `noUnusedParameters: true` — unused imports will fail the build.
- `eslint.config.js` uses `@typescript-eslint/no-unused-vars` as `warn` with `argsIgnorePattern: '^_'`.
- Route groups `(dashboard)` and `(admin)` use parentheses — these are Next.js route groups, not dynamic segments.
- Backend API returns `{ success, message, data, pagination? }` shape. All service calls check `response.data.success`.
