import { PROJECTS, ARTICLES, formatDate } from "../js/data.js";
import { esc, img, icon, btn, CSS_VAR } from "./lib.mjs";

export const projectUrl = (root, slug) => `${root}pages/projects/${slug}.html`;
export const articleUrl = (root, slug) => `${root}pages/articles/${slug}.html`;

/** Portfolio card — layout is controlled by data-slot (see src/input.css). */
export function projectCard(p, root, { slot = 0, index = 0, sizes = "(min-width: 768px) 55vw, 100vw", eager = false } = {}) {
  const n = String(index + 1).padStart(2, "0");
  return `
<article data-item data-category="${esc(p.category)}" data-search="${esc(`${p.title} ${p.location} ${p.kind}`.toLowerCase())}" data-slot="${slot}">
  <a class="pc group" href="${projectUrl(root, p.slug)}" data-project-card aria-label="View project: ${esc(p.title)}">
    <div class="frame pc-frame" style="--frame-bg:${CSS_VAR[p.color]}">
      <span class="pc-chip">${esc(p.category)}</span>
      ${img({ id: p.image, alt: p.alt, sizes, eager })}
      <span class="pc-cta">${icon("arrow-up-right", "w-6 h-6", 2.5)}</span>
    </div>
    <div class="mt-5 flex items-start justify-between gap-6">
      <div>
        <p class="meta opacity-70">${n} — ${esc(p.kind)}</p>
        <h3 class="t-md mt-2"><span class="pc-title">${esc(p.title)}</span></h3>
      </div>
      <p class="meta text-right opacity-80 shrink-0 pt-1">${esc(p.location.split(",")[0])}<br>${p.year}</p>
    </div>
    <p class="mt-3 max-w-md text-ink/75">${esc(p.summary)}</p>
    <span class="link-arrow mt-4">View Project${icon("arrow-up-right", "w-4 h-4", 2.5)}</span>
  </a>
</article>`;
}

export function articleCard(a, root, { slot = 0, sizes = "(min-width: 768px) 50vw, 100vw", showFeatured = true } = {}) {
  return `
<article data-item data-category="${esc(a.category)}" data-search="${esc(`${a.title} ${a.excerpt}`.toLowerCase())}" data-slot="${slot}" ${a.featured ? 'data-featured="true"' : ""}>
  <a class="pc group block" href="${articleUrl(root, a.slug)}" data-project-card aria-label="Read article: ${esc(a.title)}">
    <div class="frame pc-frame" style="--frame-bg:var(--color-lilac)">
      <span class="pc-chip" data-featured-chip ${a.featured && showFeatured ? "" : "hidden"}>Featured</span>
      ${img({ id: a.image, alt: a.alt, sizes })}
      <span class="pc-cta">${icon("arrow-up-right", "w-6 h-6", 2.5)}</span>
    </div>
    <div class="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 meta">
      <span class="bg-lime text-ink px-2 py-1">${esc(a.category)}</span>
      <time datetime="${a.date}" class="opacity-70">${formatDate(a.date)}</time>
      <span class="opacity-70">${a.readTime} read</span>
    </div>
    <h3 class="t-md mt-4 !normal-case !tracking-[-0.03em] !leading-[1.02]"><span class="pc-title">${esc(a.title)}</span></h3>
    <p class="mt-3 max-w-xl text-ink/75">${esc(a.excerpt)}</p>
    <span class="link-arrow mt-4">Read Article${icon("arrow-up-right", "w-4 h-4", 2.5)}</span>
  </a>
</article>`;
}

export const allProjects = PROJECTS;
export const allArticles = ARTICLES;

/** Full-width call-to-action band. */
export function ctaBand({ root, n = "08", label = "Start Here", title, btnLabel, href, bg = "lime", id = "cta-title" }) {
  const dark = bg === "ink";
  const cls = { lime: "bg-lime text-ink", sky: "bg-sky text-ink", lilac: "bg-lilac text-ink", ink: "bg-ink text-ivory on-dark" }[bg];
  return `
<section class="relative ${cls} overflow-hidden py-24 md:py-40" aria-labelledby="${id}">
  <div class="absolute -left-20 -bottom-24 w-80 h-80 rounded-full border-2 border-current opacity-80" data-parallax="40" aria-hidden="true"></div>
  <div class="absolute right-[6%] top-10 w-24 h-24 md:w-28 md:h-28 ${dark ? "bg-lime" : "bg-ink"}" style="border-radius:100% 0 0 0" data-parallax="-50" aria-hidden="true"></div>
  <div class="wrap relative">
    <p class="eyebrow mb-8" data-reveal><b>${n}</b>${esc(label)}</p>
    <h2 id="${id}" class="t-xl !text-[clamp(2.4rem,8vw,8.5rem)]">${title}</h2>
    <div class="mt-12 flex flex-wrap items-center gap-6" data-reveal>
      ${btn(href, btnLabel, dark ? "lime" : "primary", "!py-5 !px-8")}
    </div>
  </div>
</section>`;
}
