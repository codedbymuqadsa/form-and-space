import { ARTICLES, ARTICLE_CATEGORIES } from "../../js/data.js";
import { PHOTOS as P, photoUrl } from "../../js/images.js";
import { esc, icon, lines, eyebrow } from "../lib.mjs";
import { articleCard, ctaBand } from "../components.mjs";

export default function journal() {
  return {
    file: "pages/journal.html",
    key: "journal",
    title: "Journal",
    desc: "The FORM & SPACE journal: essays and notes on architecture, interiors, materials, design thinking and studio life.",
    ogImage: photoUrl(P.jArt, 1200),
    body: (root) => {
      const count = (c) => ARTICLES.filter((a) => a.category === c).length;
      const chips = [
        `<button type="button" class="chip" data-filter="All" aria-pressed="true">All <sup>${ARTICLES.length}</sup></button>`,
        ...ARTICLE_CATEGORIES.map((c) => `<button type="button" class="chip" data-filter="${esc(c)}" aria-pressed="false">${esc(c)} <sup>${count(c)}</sup></button>`),
      ].join("");

      return `
<section class="relative isolate overflow-hidden pt-10 md:pt-16 pb-12 md:pb-16" aria-labelledby="page-title">
  <div class="wrap relative">
    <p class="eyebrow mb-8" data-hero-fade><b>01</b>The Journal</p>
    <div class="flex flex-wrap items-end justify-between gap-8">
      <h1 id="page-title" class="t-mega" data-hero-title>${lines("NOTES ON\n{{SPACE.}}")}</h1>
      <p class="max-w-sm text-ink/80 md:pb-4" data-hero-fade>Essays, studies and stories from the studio, on how we think about architecture, interiors and the way we live.</p>
    </div>
    <div class="absolute right-[clamp(1.25rem,4vw,4rem)] top-0 w-20 h-20 md:w-32 md:h-32 rounded-full bg-sky -z-10" data-float="-14" aria-hidden="true"></div>
  </div>
</section>

<section class="pb-28 md:pb-40" aria-label="Journal articles" data-filter-root data-storage-key="fs:journalFilter" data-noun="article" data-featured-aware>
  <div class="wrap">
    <div class="py-4 border-y border-ink/15 mb-12 md:mb-20 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filter articles by category">${chips}</div>
      <p class="meta" role="status" aria-live="polite" data-status>Showing 6 articles</p>
    </div>
    <div class="agrid jgrid" data-grid>
      ${ARTICLES.map((a, i) => articleCard(a, root, { slot: i % 6, sizes: i === 0 ? "100vw" : "(min-width:768px) 45vw, 100vw" })).join("")}
    </div>
    <div class="hidden text-center py-24 md:py-32 border-2 border-dashed border-ink/40" data-empty>
      <p class="t-lg">No articles yet.</p>
      <p class="mt-4 text-ink/75">Nothing has been published in this category. Check back soon.</p>
      <button type="button" class="btn btn-dark mt-8" data-reset>Show all articles${icon("rotate-ccw", "w-4 h-4", 2.5)}</button>
    </div>
  </div>
</section>

${ctaBand({ root, n: "02", label: "Say hello", bg: "lilac", title: `<span class="line"><span>GOT A TOPIC OR</span></span><span class="line"><span>A <span class="mark">PROJECT?</span></span></span>`, btnLabel: "Get in Touch", href: `${root}pages/contact.html` })}`;
    },
  };
}
