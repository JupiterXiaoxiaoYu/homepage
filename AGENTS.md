# Homepage — Jupiter Yu

## Layout

- Root: legacy static Bootstrap site (index.html, projects.html, ...) — kept for reference, superseded by `site/`
- `site/`: the portfolio — Next.js 15 (App Router), magazine-style big portfolio, codename remains "drum"

## site/ commands

- `npm install` — install deps
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run start` — serve the production build

## Architecture

- Route groups: `app/(site)/[lang]` is the magazine portfolio (`en` | `zh`), `app/(play)/play` is the pixel dungeon game (own root layout + `dungeon.css`), `app/api/ask` is the Ask Jupiter streaming endpoint.
- `middleware.ts` redirects `/` → `/zh` or `/en` by Accept-Language.
- `lib/data.ts` — ALL content lives here (profile, projects, awards, experience, research, skills). Every project has `category`, optional `impact`/`zh`/`cover`/`video`.
- `lib/i18n.ts` — UI strings + `loc(item, lang)` merge helper. `lib/knowledge.ts` — text corpus for /api/ask.
- `components/Cover.tsx` — seeded generative SVG cover art; drop real media into `public/work/<id>/` and set `cover`/`video` on the project.
- `components/ask/AskPanel.tsx` — chat drawer; opened via `window.dispatchEvent(new CustomEvent("ask:open", {detail}))`.
- `components/site/` — Nav, Footer, Reveal (IO reveals), CaseLink (cursor pill), WorkGrid (filterable), Lenis smooth scroll.
- Motion: one ease `cubic-bezier(.2,.7,0,1)`; Lenis + reveals disabled under prefers-reduced-motion.
- Ask Jupiter: `/api/ask` streams OpenAI-compatible completions when `LLM_API_KEY` (plus optional `LLM_BASE_URL`, `LLM_MODEL`) is set; otherwise an offline keyword fallback.

## Deploy

Vercel project **jupiter-homepage**, root directory `site`. Push to `main` auto-deploys. GitHub Pages mirror was dropped (the API route needs a Node runtime).
