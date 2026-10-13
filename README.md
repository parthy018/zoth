# ZOTH IDO Landing Page

A single landing page for the $ZOTH IDO on Sonar, built with Next.js (App Router), TypeScript, Tailwind CSS and shadcn/ui.

**Live demo:** https://zoth-demo.vercel.app/

## Getting started

Requirements: Node.js 24 (see `.nvmrc`) and npm.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check with no emit |
| `npm run format` | Prettier, writes changes |

## Project structure

```
app/
  api/sale/route.ts     Mock sale API (GET /api/sale)
  layout.tsx            Fonts, metadata, providers, toaster, skip link
  page.tsx              Composes the page sections
  globals.css           Tailwind theme tokens (ZOTH colours, radius 0)
components/
  layout/               Top banner, navbar, footer, newsletter form
  sections/             Hero, partners strip, sale details table, reveal animation
  sale/                 Sale card, countdown, position panel, error state
  wallet/               Connect Wallet / Connect Sonar dialog (placeholder)
  ui/                   shadcn/ui primitives plus two small custom ones
hooks/
  use-sale.ts           TanStack Query hook for the sale data
  use-countdown.ts      Real-time countdown
lib/
  sale-schema.ts        Zod schema for the API response
  sale-data.ts          Mock sale data
  format.ts             Number, currency and percentage helpers
  utils.ts              cn() helper
```

## Data flow

- The UI never hard-codes sale data. `GET /api/sale` returns it, and `useSale()` (TanStack Query) fetches it.
- The response is validated with a Zod schema before the UI uses it, so a malformed payload shows the error state instead of breaking the page.
- The sale card and the details table share one query, so the page makes a single request.
- To test the error state, open `/api/sale?fail=1` or change the request in `use-sale.ts`. The route returns a 500.

## Decisions

- **Mock API route instead of hard-coded data.** Keeps the UI data-driven. Swapping in a real endpoint only means changing the route and the schema.
- **TanStack Query** handles loading, error, retry and caching. App defaults are `staleTime` 30s and `retry` 1 (`components/providers.tsx`). The sale query overrides these: `staleTime` is 4s and it polls every 8s to mimic live activity (`hooks/use-sale.ts`).
- **Countdown.** `useCountdown` computes the remaining time from `Date.now()` on every tick, so it doesn't drift. It only starts after mount, so the server and client markup match and there is no hydration mismatch. It also resyncs when the tab becomes visible again.
- **Mock closing time.** The mock sets `closesAt` to two days and five hours after each request (`lib/sale-data.ts`). A real API would return a fixed date, and then the countdown would stop at zero and show "closed".
- **Progress is clamped** to 0–100% so out-of-range values can't break the bar.
- **Connect buttons** open a shadcn Dialog with placeholder content. No Web3 code is included, as the brief asks.
- **Accessibility.** Semantic landmarks (`header`, `nav`, `main`, `footer`), one `h1`, a skip link, visible focus rings, `aria-label`s on icon-only buttons, and `prefers-reduced-motion` respected for animations. The countdown is in a `sr-only` text element and the visual boxes are `aria-hidden`, so screen readers don't announce every second.
- **Responsive.** Tested at 375px and at desktop widths. The partners list scrolls horizontally inside its own container, so the page itself never scrolls sideways.
- **Design source.** The Figma file was access-restricted during development, so spacing, colours and assets were taken from the live zoth.io site. The full spec is in `DESIGN.md`.

## Known limitations

- No automated tests. The brief didn't ask for them, and the time went into the UI and data layer.
- Allocation names and amounts, the footer disclaimer and the "Subscription window ends soon" text are placeholders until the final copy is available.
- The Connect Wallet and Connect Sonar dialogs, the newsletter form and the "Show terms" action are UI-only and don't submit anything.
- The partners strip scrolls automatically. It pauses on hover and is static when the user prefers reduced motion.
- **Countdown resets.** The sale query polls every 8s and the mock recalculates `closesAt` on each request, so the countdown jumps back to its start value on every poll. Fix: compute the mock closing time once when the server starts, so it stays fixed while still counting down.

## Deployment

Deploy to Vercel by importing the repo at [vercel.com/new](https://vercel.com/new). Vercel detects Next.js automatically, so no build settings need changing. To check a production build locally, run `npm run build` and then `npm run start`.
