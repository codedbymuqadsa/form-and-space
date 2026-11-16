# FORM & SPACE

Multi-page frontend portfolio site for a fictional architecture and interior design studio.
Stack: HTML5, Tailwind CSS v4, vanilla ES modules, GSAP + ScrollTrigger + Flip, Lenis, Swiper, Lucide icons (inlined), Google Fonts. No frameworks, no backend.

## Run

```bash
npm install
npm run build   # generates all HTML pages, copies vendor libs, compiles Tailwind -> dist/output.css
npm start       # local server at http://localhost:5173/
```

Open it over http (ES modules do not load from file://). Under XAMPP, browse to `/form%26space/`.
`npm run watch:css` rebuilds CSS while you edit. The Tailwind CLI is invoked through `node` directly because the `&` in the folder name breaks npm `.bin` shims on Windows.

## Structure

- `js/data.js` and `js/images.js`: single source of truth for projects, articles, team, services, copy and photo IDs.
- `build/`: page generator (`build.mjs`, `lib.mjs`, `components.mjs`, `pages/*`). Edit content in `js/data.js`, then `npm run build`.
- `js/`: `main.js` entry plus `navigation`, `scroll` (Lenis), `animations` (GSAP), `projects`, `journal`, `filter-grid`, `contact`, `sliders`, `utils`.
- `src/input.css`: Tailwind v4 `@theme` tokens and components. `dist/output.css`: compiled output.
- `pages/`: generated pages (studio, projects, services, team, journal, contact, 9 project pages, 6 article pages).

Images are Unsplash photos, each verified to resolve. The contact form is a demo: nothing is sent; the draft is kept in localStorage.
