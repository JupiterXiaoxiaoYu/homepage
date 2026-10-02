# Homepage — Jupiter Yu

## Layout

- Root: legacy static Bootstrap site (index.html, projects.html, ...) — kept for reference, superseded by `site/`
- `site/`: the new portfolio — Next.js 15 (App Router, static export), codename "Sovereign Graph"

## site/ commands

- `npm install` — install deps
- `npm run dev` — dev server (served under `/homepage/` basePath)
- `npm run build` — static export to `site/out/`

## Architecture

- `lib/data.ts` — ALL content lives here (projects, awards, experience, research, skills)
- `lib/graph.ts` — constellation world model: node/edge layout + CAMERA_STOPS (one per section)
- `lib/graphState.ts` — shared mutable camera/active-cluster state + tiny event bus
- `components/GraphCanvas.tsx` — Canvas2D constellation renderer (drift, pulses, hit-test)
- `components/FiberField.tsx` — WebGL domain-warped filament shader (backdrop)
- `components/HUD.tsx` — nav + metapath readout + bottom ticker
- `components/fx/` — Scramble (text decode), Reveal (line-mask scroll reveal)
- Motion: GSAP ScrollTrigger drives camera stops; Lenis smooth scroll; one ease `expo.out`

## Deploy

`.github/workflows/deploy.yml` builds `site/` and publishes to GitHub Pages.
Requires repo Settings → Pages → Source = "GitHub Actions". URL: jupiterxiaoxiaoyu.github.io/homepage
