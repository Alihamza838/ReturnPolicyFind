# ReturnPolicyFind

Find any store's return policy in seconds: return windows, receipt rules, refund times and exceptions for 96 stores in 10 countries (US, UK, Germany, France, Canada, Australia, UAE, Saudi Arabia, India, Pakistan). Every store page links to the retailer's official policy and shows the date it was checked.

## How it works

- **Static site generation:** React 19 + [vite-react-ssg](https://github.com/Daydreamer-riri/vite-react-ssg) + React Router. Every page is rendered to its own HTML file at build time with its own title, description, canonical URL, Open Graph image and JSON-LD.
- **One source of truth:** `src/data/policies.ts` and `src/data/world/*.ts` hold the verified policy for every store (window, facts, exceptions, steps, FAQs, holiday rules, official source, date checked). Research notes with every source URL: `research/verified-2026-11.md`.
- **Countries and brands:** `src/data/countries.ts` (legal rights, official consumer authority links, shopping habits, multi-country brands).
- **Guides:** `src/site/guides.ts`. Each list (cheat sheet, 90-day stores, holiday deadlines, no-receipt rules, restocking fees…) is built from the verified data, so a store's numbers always match its own page.
- **Design:** receipt and ticket shapes, navy and coral, monospace numbers (`src/index.css`, `src/site/ui.tsx`). Scroll reveals only animate transform/opacity, never hide the static HTML and switch off with reduced motion.
- **Images:** `npm run images` draws every image from the data with Playwright + sharp (no store logos).
- **Checks:** `npm run build` runs `scripts/verify-build.mjs` (unique titles and descriptions, canonicals, internal links, images, redirects, sitemap, word counts). Old URLs are 301-redirected via `scripts/redirects.mjs` → `vercel.json` (`node scripts/write-vercel.mjs`).

## Commands

```bash
npm install
npm run dev       # local dev server
npm run build     # static build into dist/ + checks
npm run images    # redraw images after a policy change (CHROMIUM_PATH=... to pick a browser)
```

## Updating a policy

1. Check the store's official returns page.
2. Edit its record and set `checked` to today.
3. `npm run images -- <slug>` and `npm run build`.
