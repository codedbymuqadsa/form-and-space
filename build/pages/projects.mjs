import { PROJECTS, PROJECT_CATEGORIES } from "../../js/data.js";
import { PHOTOS as P, photoUrl } from "../../js/images.js";
import { esc, icon, lines, eyebrow, btn } from "../lib.mjs";
import { projectCard, ctaBand } from "../components.mjs";

export default function projects() {
  return {
    file: "pages/projects.html",
    key: "projects",
    title: "Projects",
    desc: "Explore nine architecture and interior projects by FORM & SPACE: residential, commercial, interior design and hospitality spaces across the world.",
    ogImage: photoUrl(P.sunHouse, 1200),
    body: (root) => {
      const count = (c) => PROJECTS.filter((p) => p.category === c).length;
      const chips = [
        `<button type="button" class="chip" data-filter="All" aria-pressed="true">All Projects <sup>${PROJECTS.length}</sup></button>`,
        ...PROJECT_CATEGORIES.map((c) => `<button type="button" class="chip" data-filter="${esc(c)}" aria-pressed="false">${esc(c)} <sup>${count(c)}</sup></button>`),
      ].join("");

      return `
<section class="relative isolate overflow-hidden pt-10 md:pt-16 pb-12 md:pb-16" aria-labelledby="page-title">
  <div class="wrap relative">
    <p class="eyebrow mb-8" data-hero-fade><b>01</b>Portfolio</p>
    <div class="flex flex-wrap items-end justify-between gap-8">
      <h1 id="page-title" class="t-mega" data-hero-title>${lines("OUR {{WORK.}}")}</h1>
      <p class="max-w-sm text-ink/80 md:pb-4" data-hero-fade>Homes, workplaces, hotels and interiors, each designed from the inside out. Filter by type to explore.</p>
    </div>
    <div class="absolute right-[clamp(1.25rem,4vw,4rem)] top-0 w-16 h-16 md:w-28 md:h-28 bg-tangerine -z-10" style="border-radius:0 100% 0 0" data-float="-14" aria-hidden="true"></div>
  </div>
</section>

<section class="pb-28 md:pb-40" aria-label="Project portfolio" data-filter-root data-storage-key="fs:projectFilter" data-noun="project">
  <div class="wrap">
    <div class="lg:sticky lg:top-[4.5rem] z-30 -mx-[clamp(1.25rem,4vw,4rem)] px-[clamp(1.25rem,4vw,4rem)] py-4 bg-ivory/90 backdrop-blur border-y border-ink/15 mb-12 md:mb-20 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">${chips}</div>
      <div class="flex items-center gap-4">
        <label class="relative block flex-1 lg:w-72"><span class="sr-only">Search projects</span>
          <span class="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none">${icon("search", "w-4 h-4")}</span>
          <input type="search" data-search-input placeholder="Search by name or place" class="w-full bg-transparent border-b-2 border-ink pl-7 py-2 text-sm focus:outline-none focus:bg-lime/50" autocomplete="off">
        </label>
        <p class="meta whitespace-nowrap" role="status" aria-live="polite" data-status>Showing 9 projects</p>
      </div>
    </div>

    <div class="agrid pgrid" data-grid>
      ${PROJECTS.map((p, i) => projectCard(p, root, { slot: i % 6, index: i, eager: i < 2 })).join("")}
    </div>

    <div class="hidden text-center py-24 md:py-32 border-2 border-dashed border-ink/40" data-empty>
      <p class="t-lg">No projects found.</p>
      <p class="mt-4 text-ink/75">Try a different category or search term.</p>
      <button type="button" class="btn btn-dark mt-8" data-reset>Show all projects${icon("rotate-ccw", "w-4 h-4", 2.5)}</button>
    </div>
  </div>
</section>

${ctaBand({ root, n: "02", label: "Your turn", bg: "ink", title: `<span class="line"><span>YOUR SPACE</span></span><span class="line"><span>COULD BE <span class="text-lime">NEXT.</span></span></span>`, btnLabel: "Start a Project", href: `${root}pages/contact.html?type=new-project` })}`;
    },
  };
}
