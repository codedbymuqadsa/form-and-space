import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { SITE, NAV, SERVICES } from "../js/data.js";
import { photoUrl } from "../js/images.js";

export const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/* ---------------- escaping ---------------- */
export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* ---------------- Lucide icons (inlined from lucide-static) ---------------- */
const iconCache = new Map();
const ICON_ALIASES = { instagram: "camera", linkedin: "briefcase", youtube: "play", pin: "pin" };

export function icon(name, cls = "w-5 h-5", sw = 2) {
  const file = ICON_ALIASES[name] ?? name;
  let inner = iconCache.get(file);
  if (inner === undefined) {
    const p = path.join(ROOT_DIR, "node_modules/lucide-static/icons", `${file}.svg`);
    if (!fs.existsSync(p)) throw new Error(`Lucide icon not found: ${file}`);
    const raw = fs.readFileSync(p, "utf8");
    inner = raw.replace(/<!--[\s\S]*?-->/g, "").replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim();
    iconCache.set(file, inner);
  }
  return `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${inner}</svg>`;
}

/* ---------------- colour helpers (full literal class names so Tailwind detects them) ---------------- */
export const BG = { lime: "bg-lime", lilac: "bg-lilac", sky: "bg-sky", orange: "bg-tangerine", ink: "bg-ink", ivory: "bg-ivory" };
export const CSS_VAR = { lime: "var(--color-lime)", lilac: "var(--color-lilac)", sky: "var(--color-sky)", orange: "var(--color-tangerine)" };

/* ---------------- images ---------------- */
export function img({ id, alt, sizes = "100vw", eager = false, cls = "", ratio, w = 1400 }) {
  const widths = [480, 800, 1200, 1600, 2200];
  const url = (x) => photoUrl(id, x, ratio ? Math.round(x / ratio) : undefined);
  const srcset = widths.map((x) => `${url(x)} ${x}w`).join(", ");
  return `<img src="${url(w)}" srcset="${srcset}" sizes="${sizes}" alt="${esc(alt)}" ${
    eager ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'
  } decoding="async" class="${cls}">`;
}

/* ---------------- shared UI pieces ---------------- */
export const eyebrow = (n, text, cls = "") => `<p class="eyebrow ${cls}"><b>${n}</b>${esc(text)}</p>`;

export const btn = (href, label, variant = "primary", extra = "") =>
  `<a href="${href}" class="btn btn-${variant} ${extra}">${esc(label)}${icon("arrow-up-right", "w-4 h-4", 2.5)}</a>`;

export const linkArrow = (href, label, extra = "") =>
  `<a href="${href}" class="link-arrow ${extra}">${esc(label)}${icon("arrow-up-right", "w-4 h-4", 2.5)}</a>`;

/** Splits headline lines into masked, animatable spans. Use `{{...}}` for lime highlight. */
export function lines(text, markCls = "mark") {
  return text
    .split("\n")
    .map((l) => {
      const html = esc(l).replace(/\{\{(.+?)\}\}/g, `<span class="${markCls}">$1</span>`);
      return `<span class="line"><span>${html}</span></span>`;
    })
    .join("");
}

export const logo = (root, { light = false } = {}) => {
  const bg = light ? "#D7F45B" : "#20231F";
  const fg = light ? "#20231F" : "#D7F45B";
  return `<a href="${root}index.html" class="logo ${light ? "logo-light text-ivory" : "text-ink"}" aria-label="FORM &amp; SPACE — home">
  <svg class="logo-mark w-9 h-9" viewBox="0 0 36 36" aria-hidden="true"><rect width="36" height="36" fill="${bg}"/><path d="M8 7h4v22H8zM8 7h17v4H8zM8 15h12v4H8z" fill="${fg}"/><path d="M17 29a7 7 0 0 1 14 0z" fill="#FF7048"/></svg>
  <span class="whitespace-nowrap">Form<span class="amp">&amp;</span>Space</span>
</a>`;
};

/* ---------------- header / footer ---------------- */
function header(root, active) {
  const links = NAV.map(
    (n) =>
      `<li><a class="nav-link" href="${root}${n.href}" ${n.key === active ? 'aria-current="page"' : ""}>${n.label}</a></li>`
  ).join("");
  const mm = NAV.map(
    (n, i) =>
      `<li class="mm-item" style="--i:${i}"><a class="mm-link" href="${root}${n.href}" ${
        n.key === active ? 'aria-current="page"' : ""
      }><small>0${i + 1}</small>${n.label}</a></li>`
  ).join("");
  return `
<header class="site-header" data-header>
  <div class="wrap flex items-center justify-between h-[4.5rem]">
    ${logo(root)}
    <nav aria-label="Primary" class="hidden lg:block"><ul class="flex items-center gap-8 xl:gap-10">${links}</ul></nav>
    <div class="flex items-center gap-3">
      <a href="${root}pages/contact.html?type=new-project" class="btn btn-primary !py-3 hidden md:inline-flex">Start a Project${icon("arrow-up-right", "w-4 h-4", 2.5)}</a>
      <button class="menu-btn lg:hidden" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="Open menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div id="mobile-menu" class="mobile-menu on-dark" data-mobile-menu role="dialog" aria-modal="true" aria-label="Site menu" inert>
  <div class="flex items-center justify-between h-[3.75rem] mb-8">
    ${logo(root, { light: true })}
    <button class="menu-btn !border-ivory" type="button" data-menu-toggle aria-expanded="false" aria-controls="mobile-menu" aria-label="Close menu"><span class="!bg-ivory"></span><span class="!bg-ivory"></span><span class="!bg-ivory"></span></button>
  </div>
  <nav aria-label="Mobile"><ul>${mm}</ul></nav>
  <div class="mm-item mt-auto pt-10 grid gap-6" style="--i:6">
    <a href="${root}pages/contact.html?type=new-project" class="btn btn-lime w-full">Start a Project${icon("arrow-up-right", "w-4 h-4", 2.5)}</a>
    <div class="flex items-center justify-between text-sm opacity-80"><a href="mailto:${SITE.email}">${SITE.email}</a><span>${SITE.city.split(",")[0]}</span></div>
  </div>
</div>`;
}

function footer(root) {
  const nav = NAV.map((n) => `<li><a class="hover:text-lime transition-colors" href="${root}${n.href}">${n.label}</a></li>`).join("");
  const navAll = nav + `<li><a class="hover:text-lime transition-colors" href="${root}pages/team.html">Team</a></li>`;
  const svc = SERVICES.map(
    (s) => `<li><a class="hover:text-lime transition-colors" href="${root}pages/services.html#${s.key}">${esc(s.title)}</a></li>`
  ).join("");
  const soc = SITE.social
    .map(
      (s) =>
        `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.label} (opens in a new tab)" class="grid place-items-center w-11 h-11 border border-ivory/30 hover:bg-lime hover:text-ink hover:border-lime transition-colors">${icon(s.icon, "w-4 h-4")}</a></li>`
    )
    .join("");
  return `
<footer class="bg-ink text-ivory on-dark overflow-hidden" data-footer>
  <div class="wrap pt-20 md:pt-28 pb-10">
    <div class="grid gap-14 lg:grid-cols-12">
      <div class="lg:col-span-5">
        ${logo(root, { light: true })}
        <p class="mt-8 max-w-md text-ivory/75">${esc(SITE.tagline)} An independent architecture and interior design studio shaping meaningful, innovative spaces since 2014.</p>
        <ul class="mt-8 flex gap-3">${soc}</ul>
      </div>
      <nav aria-label="Footer" class="lg:col-span-2 lg:col-start-7"><h2 class="meta text-lime mb-5">Explore</h2><ul class="grid gap-3">${navAll}</ul></nav>
      <nav aria-label="Services" class="lg:col-span-2"><h2 class="meta text-lime mb-5">Services</h2><ul class="grid gap-3">${svc}</ul></nav>
      <div class="lg:col-span-2"><h2 class="meta text-lime mb-5">Studio</h2>
        <address class="not-italic grid gap-3 text-ivory/90">
          <a class="hover:text-lime transition-colors break-words" href="mailto:${SITE.email}">${SITE.email}</a>
          <a class="hover:text-lime transition-colors" href="tel:${SITE.phone.replace(/[^+\d]/g, "")}">${SITE.phone}</a>
          <span>${SITE.address}<br>${SITE.city}</span>
        </address>
      </div>
    </div>
    <p class="t-mega mt-20 md:mt-28 text-lime leading-[0.8] select-none whitespace-nowrap" aria-hidden="true" style="font-size:clamp(3rem,14.5vw,15rem)">Form&amp;Space</p>
    <div class="mt-10 pt-6 rule-soft flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-sm text-ivory/70">
      <p>© <span data-year>2026</span> FORM &amp; SPACE Studio. A frontend portfolio project, all content is fictional.</p>
      <button type="button" data-back-to-top class="inline-flex items-center gap-3 self-start sm:self-auto meta text-ivory hover:text-lime transition-colors">Back to top ${icon("arrow-up", "w-4 h-4", 2.5)}</button>
    </div>
  </div>
</footer>`;
}

/* ---------------- page shell ---------------- */
export function page({ file, title, desc, key, body, swiper = false, ogImage, bodyClass = "" }) {
  const depth = file.split("/").length - 1;
  const root = depth === 0 ? "" : "../".repeat(depth);
  const fullTitle = key === "home" ? title : `${title} — FORM & SPACE`;
  const og = ogImage || photoUrl("1600047509807-ba8f99d2cdde", 1200);
  const v = `${root}assets/vendor/`;
  return {
    root,
    html: `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="theme-color" content="#F7F4EA">
<meta property="og:type" content="website">
<meta property="og:site_name" content="FORM &amp; SPACE">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${og}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(fullTitle)}">
<meta name="twitter:description" content="${esc(desc)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="${root}assets/icons/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://images.unsplash.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,400&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${v}lenis.css">${swiper ? `\n<link rel="stylesheet" href="${v}swiper-bundle.min.css">` : ""}
<link rel="stylesheet" href="${root}dist/output.css">
<script>document.documentElement.classList.add("js");setTimeout(function(){if(!window.__fsReady)document.documentElement.classList.add("reveal-failsafe")},5000);</script>
</head>
<body data-page="${key}" class="${bodyClass}">
<a href="#main" class="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-lime focus:text-ink focus:px-4 focus:py-3 font-semibold">Skip to content</a>
${header(root, key)}
<main id="main">
${body(root)}
</main>
${footer(root)}
<button type="button" data-fab class="fixed right-5 bottom-5 z-40 w-12 h-12 grid place-items-center bg-lime text-ink border-2 border-ink opacity-0 pointer-events-none translate-y-4 transition-all duration-500" aria-label="Back to top">${icon("arrow-up", "w-5 h-5", 2.5)}</button>
<script src="${v}gsap.min.js" defer></script>
<script src="${v}ScrollTrigger.min.js" defer></script>
<script src="${v}Flip.min.js" defer></script>
<script src="${v}lenis.min.js" defer></script>${swiper ? `\n<script src="${v}swiper-bundle.min.js" defer></script>` : ""}
<script type="module" src="${root}js/main.js"></script>
</body>
</html>
`,
  };
}
