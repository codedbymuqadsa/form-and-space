import { PROJECTS, related } from "../../js/data.js";
import { PHOTOS as P, photoUrl } from "../../js/images.js";
import { esc, img, icon, lines, eyebrow, btn, BG, CSS_VAR } from "../lib.mjs";
import { projectCard, projectUrl, ctaBand } from "../components.mjs";

const TEXT_ON = { lime: "text-ink", lilac: "text-ink", sky: "text-ink", orange: "text-ink" };

export default function projectPages() {
  return PROJECTS.map((p, idx) => {
    const d = p.detail;
    const prev = PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length];
    const next = PROJECTS[(idx + 1) % PROJECTS.length];
    const rel = related(PROJECTS, p, 3);
    const flip = idx % 2 === 1;
    const accent = BG[p.color];
    const area = d.specs.Area;

    return {
      file: `pages/projects/${p.slug}.html`,
      key: "projects",
      title: `${p.title} — ${p.kind}`,
      desc: `${p.title}: ${p.summary} ${p.kind} in ${p.location}, ${p.year}.`,
      ogImage: photoUrl(p.image, 1200),
      swiper: true,
      body: (root) => {
        const slides = d.gallery
          .slice(1)
          .map(
            (id, i0) => { const i = i0 + 1; return `<figure class="swiper-slide !w-[82%] md:!w-[52%] lg:!w-[44%]">
            <div class="frame" style="--ar:${["4/3", "3/4", "1/1", "4/3", "3/4"][i % 5]};--frame-bg:${CSS_VAR[p.color]}">${img({ id, alt: d.galleryAlts[i], sizes: "(min-width:1024px) 44vw, 82vw" })}</div>
            <figcaption class="meta mt-3 flex justify-between gap-4"><span>Fig. ${String(i + 2).padStart(2, "0")}</span><span class="text-right opacity-80 normal-case tracking-normal text-sm font-medium">${esc(d.galleryAlts[i])}</span></figcaption></figure>`; }
          )
          .join("");

        const materials = d.materials
          .map(
            (m, i) => `<li class="grid gap-3 md:grid-cols-12 py-7 border-t border-ivory/25" data-reveal>
            <span class="meta text-lime md:col-span-1">${String(i + 1).padStart(2, "0")}</span>
            <h3 class="t-md md:col-span-5">${esc(m.name)}</h3>
            <p class="md:col-span-5 md:col-start-8 text-ivory/80">${esc(m.note)}</p></li>`
          )
          .join("");

        const specs = Object.entries(d.specs)
          .map(([k, v]) => `<div class="py-5 border-t border-ink"><dt class="meta opacity-70">${esc(k)}</dt><dd class="mt-2 font-display font-bold text-xl md:text-2xl tracking-tight">${esc(v)}</dd></div>`)
          .join("");

        const nav = (pr, dir) => `
          <a href="${projectUrl(root, pr.slug)}" class="group relative block ${dir === "next" ? "text-right bg-ink text-ivory on-dark" : BG[pr.color] + " text-ink"} p-8 md:p-14 overflow-hidden" aria-label="${dir === "next" ? "Next" : "Previous"} project: ${esc(pr.title)}">
            <p class="meta flex items-center gap-3 ${dir === "next" ? "justify-end" : ""}">${dir === "prev" ? icon("arrow-left", "w-4 h-4 transition-transform group-hover:-translate-x-2", 2.5) : ""}${dir === "next" ? "Next project" : "Previous project"}${dir === "next" ? icon("arrow-right", "w-4 h-4 transition-transform group-hover:translate-x-2", 2.5) : ""}</p>
            <p class="t-lg mt-6 transition-transform duration-500 ${dir === "next" ? "group-hover:-translate-x-3" : "group-hover:translate-x-3"}">${esc(pr.title)}</p>
            <p class="meta mt-4 opacity-80">${esc(pr.kind)} · ${esc(pr.location.split(",")[0])}</p>
          </a>`;

        return `
<!-- HEADER -->
<section class="relative isolate overflow-hidden pt-8 md:pt-12" aria-labelledby="page-title">
  <div class="wrap relative">
    <nav aria-label="Breadcrumb" class="meta flex items-center gap-2 mb-10" data-hero-fade><a href="${root}pages/projects.html" class="hover:underline">Projects</a>${icon("chevron-right", "w-3 h-3", 3)}<span aria-current="page" class="opacity-70">${esc(p.title)}</span></nav>
    <p class="eyebrow mb-6" data-hero-fade><b>${String(idx + 1).padStart(2, "0")}</b>${esc(p.kind)}</p>
    <h1 id="page-title" class="t-mega" data-hero-title>${lines(p.title.toUpperCase().replace(/ (?=[^ ]+$)/, "\n").split("\n").map((l, i, a) => (i === a.length - 1 ? `{{${l}}}` : l)).join("\n"))}</h1>
    <div class="absolute right-[clamp(1.25rem,4vw,4rem)] top-12 w-16 h-16 md:w-32 md:h-32 ${accent} ${flip ? "rounded-full" : ""} -z-10" ${flip ? "" : 'style="border-radius:0 100% 0 0"'} data-float="-16" aria-hidden="true"></div>
    <dl class="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-6" data-hero-fade>
      ${[["Category", p.category], ["Location", p.location], ["Year", p.year], ["Area", area]].map(([k, v]) => `<div class="py-4 border-t-2 border-ink"><dt class="meta opacity-70">${k}</dt><dd class="mt-1 font-display font-bold text-lg md:text-xl tracking-tight">${esc(v)}</dd></div>`).join("")}
    </dl>
  </div>
  <div class="wrap mt-6 md:mt-10">
    <figure>
      <div class="frame frame-parallax" style="--ar:21/10;--frame-bg:${CSS_VAR[p.color]}" data-img-reveal>${img({ id: p.image, alt: p.alt, sizes: "100vw", eager: true, w: 1800 })}</div>
      <figcaption class="meta mt-3 flex justify-between"><span>Fig. 01 — ${esc(p.title)}</span><span>${esc(p.location)}</span></figcaption>
    </figure>
  </div>
</section>

<!-- OVERVIEW -->
<section class="py-24 md:py-36" aria-labelledby="overview-title">
  <div class="wrap grid gap-10 lg:grid-cols-12">
    <div class="lg:col-span-3" data-reveal>${eyebrow("A", "Overview")}</div>
    <div class="lg:col-span-9">
      <h2 id="overview-title" class="t-lg !normal-case !tracking-[-0.035em] !leading-[1.02] max-w-4xl" data-reveal>${esc(d.lead)}</h2>
      <p class="mt-10 max-w-2xl text-lg text-ink/85" data-reveal>${esc(d.overview)}</p>
    </div>
  </div>
</section>

<!-- CONCEPT -->
<section class="${accent} ${TEXT_ON[p.color]} py-24 md:py-36 overflow-hidden" aria-labelledby="concept-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 items-center">
    <div class="lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}">
      <div data-reveal>${eyebrow("B", "Design Concept")}</div>
      <h2 id="concept-title" class="t-xl mt-6">${lines(`THE BIG\nIDEA.`)}</h2>
      <p class="lead mt-8 max-w-xl" data-reveal>${esc(d.concept)}</p>
    </div>
    <div class="lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}" data-reveal>
      <div class="frame" style="--ar:${flip ? "4/3" : "4/5"};--frame-bg:var(--color-ivory)">${img({ id: d.gallery[0], alt: d.galleryAlts[0], sizes: "(min-width:1024px) 40vw, 100vw" })}</div>
      <p class="meta mt-3">Fig. 02 — ${esc(d.galleryAlts[0])}</p>
    </div>
  </div>
</section>

<!-- CHALLENGE + APPROACH -->
<section class="py-24 md:py-36" aria-label="Challenge and approach">
  <div class="wrap grid gap-16 md:grid-cols-2 md:gap-20">
    <div data-reveal>
      <p class="text-outline font-display font-bold text-[clamp(5rem,10vw,9rem)] leading-none tracking-tighter" aria-hidden="true">C</p>
      <h2 class="t-lg mt-2">The challenge</h2>
      <p class="mt-6 text-lg text-ink/85 max-w-lg">${esc(d.challenge)}</p>
    </div>
    <div class="md:mt-28" data-reveal>
      <p class="text-outline font-display font-bold text-[clamp(5rem,10vw,9rem)] leading-none tracking-tighter" aria-hidden="true">A</p>
      <h2 class="t-lg mt-2">Our approach</h2>
      <p class="mt-6 text-lg text-ink/85 max-w-lg">${esc(d.approach)}</p>
    </div>
  </div>
</section>

<!-- GALLERY -->
<section class="pb-24 md:pb-36 overflow-hidden" aria-labelledby="gallery-title">
  <div class="wrap">
    <div class="flex flex-wrap items-end justify-between gap-6 mb-10">
      <div><div data-reveal>${eyebrow("D", "Gallery")}</div><h2 id="gallery-title" class="t-lg mt-4">Inside the project</h2></div>
      <div class="flex items-center gap-3">
        <button class="sw-btn" type="button" data-gal-prev aria-label="Previous image">${icon("arrow-left", "w-5 h-5", 2.5)}</button>
        <button class="sw-btn" type="button" data-gal-next aria-label="Next image">${icon("arrow-right", "w-5 h-5", 2.5)}</button>
      </div>
    </div>
    <div class="swiper !overflow-visible" data-gallery aria-roledescription="carousel" aria-label="${esc(p.title)} image gallery"><div class="swiper-wrapper">${slides}</div>
      <div class="swiper-pagination !static mt-8 !text-left"></div></div>
  </div>
</section>

<!-- MATERIALS -->
<section class="bg-ink text-ivory on-dark py-24 md:py-36" aria-labelledby="materials-title">
  <div class="wrap grid gap-12 lg:grid-cols-12">
    <div class="lg:col-span-4"><div data-reveal>${eyebrow("E", "Material & Design Details", "text-lime")}</div><h2 id="materials-title" class="t-xl mt-6">${lines("MADE OF\n{{THIS.}}", "text-lime")}</h2></div>
    <ul class="lg:col-span-8 lg:col-start-5 border-b border-ivory/25">${materials}</ul>
  </div>
</section>

<!-- SPECS -->
<section class="py-24 md:py-36" aria-labelledby="specs-title">
  <div class="wrap grid gap-12 lg:grid-cols-12">
    <div class="lg:col-span-4"><div data-reveal>${eyebrow("F", "Specifications")}</div><h2 id="specs-title" class="t-lg mt-6">At a glance</h2></div>
    <dl class="lg:col-span-8 grid sm:grid-cols-2 gap-x-10" data-reveal>${specs}</dl>
  </div>
</section>

<!-- RELATED -->
<section class="pb-24 md:pb-36" aria-labelledby="related-title">
  <div class="wrap">
    <div class="flex flex-wrap items-end justify-between gap-6 mb-12"><div><div data-reveal>${eyebrow("G", "Related Projects")}</div><h2 id="related-title" class="t-lg mt-4">You might also like</h2></div>
    <a class="link-arrow" href="${root}pages/projects.html">All Projects${icon("arrow-up-right", "w-4 h-4", 2.5)}</a></div>
    <div class="grid gap-12 md:grid-cols-3 md:gap-8">${rel.map((r, i) => projectCard(r, root, { slot: 0, index: PROJECTS.indexOf(r), sizes: "(min-width:768px) 33vw, 100vw" }).replace("<article ", "<article data-reveal ")).join("")}</div>
  </div>
</section>

<!-- PREV / NEXT -->
<nav class="grid md:grid-cols-2" aria-label="Project navigation">${nav(prev, "prev")}${nav(next, "next")}</nav>

${ctaBand({ root, n: "H", label: "Your turn", bg: "lime", title: `<span class="line"><span>LIKE WHAT</span></span><span class="line"><span>YOU <span class="mark mark-orange">SEE?</span></span></span>`, btnLabel: "Start a Project", href: `${root}pages/contact.html?type=new-project` })}`;
      },
    };
  });
}
