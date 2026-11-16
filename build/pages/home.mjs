import { PROJECTS, FEATURED_SLUGS, SERVICES, STATS, PROCESS, TESTIMONIALS, ARTICLES, getProject, formatDate, SITE } from "../../js/data.js";
import { PHOTOS as P } from "../../js/images.js";
import { photoUrl } from "../../js/images.js";
import { esc, img, icon, lines, eyebrow, btn, linkArrow, BG, CSS_VAR } from "../lib.mjs";
import { projectCard, projectUrl, articleUrl } from "../components.mjs";

const PREVIEW = [
  { key: "architecture", title: "Architecture", span: "lg:col-span-7", min: "lg:min-h-[26rem]" },
  { key: "interior", title: "Interior Design", span: "lg:col-span-5", min: "lg:min-h-[26rem]" },
  { key: "residential", title: "Spatial Planning", span: "lg:col-span-4", min: "lg:min-h-[24rem]" },
  { key: "commercial", title: "Commercial Spaces", span: "lg:col-span-4", min: "lg:min-h-[24rem]" },
  { key: "consulting", title: "Creative Consulting", span: "lg:col-span-4", min: "lg:min-h-[24rem]", dark: true },
];

export default function home() {
  return {
    file: "index.html",
    key: "home",
    title: "FORM & SPACE — Architecture & Interior Design Studio",
    desc: "FORM & SPACE is a contemporary architecture and interior design studio creating meaningful, innovative spaces. Spaces That Speak. Forms That Inspire.",
    ogImage: photoUrl(P.hero, 1200),
    swiper: true,
    body: (root) => {
      const featured = FEATURED_SLUGS.map(getProject);

      const services = PREVIEW.map((s, i) => {
        const svc = SERVICES.find((x) => x.key === s.key);
        const bg = s.dark ? "bg-ink text-ivory on-dark" : `${BG[svc.color]} text-ink`;
        return `
        <a href="${root}pages/services.html#${s.key}" class="group relative flex flex-col justify-between p-7 md:p-9 min-h-[18rem] ${s.min} ${s.span} ${bg}" data-reveal>
          <div class="flex items-start justify-between">
            <span class="meta">0${i + 1}</span>
            <span class="grid place-items-center w-14 h-14 border-[1.5px] border-current transition-transform duration-500 group-hover:rotate-[20deg] group-hover:scale-110">${icon(svc.icon, "w-6 h-6", 1.75)}</span>
          </div>
          <div>
            <h3 class="t-md">${esc(s.title)}</h3>
            <p class="mt-4 max-w-sm ${s.dark ? "text-ivory/80" : "text-ink/80"}">${esc(svc.short)}</p>
            <span class="link-arrow mt-6">Explore${icon("arrow-up-right", "w-4 h-4", 2.5)}</span>
          </div>
        </a>`;
      }).join("");

      const stats = STATS.map(
        (s) => `
        <div class="py-8 md:py-10 md:px-8 first:md:pl-0 border-t-2 border-ink md:border-t-0 md:border-l-2 first:md:border-l-0 border-ink/100">
          <p class="t-xl" aria-label="${s.value}${s.suffix} ${esc(s.label)}"><span data-counter="${s.value}" data-suffix="${s.suffix}" data-pad="${s.pad ?? 0}">${String(s.value).padStart(s.pad ?? 0, "0")}${s.suffix}</span></p>
          <p class="meta mt-3 max-w-[12rem]">${esc(s.label)}</p>
        </div>`
      ).join("");

      const process = PROCESS.map(
        (p, i) => `
        <li class="relative pl-8 md:pl-0 md:pt-10 pb-12 md:pb-0 border-l-2 md:border-l-0 border-ink" data-reveal>
          <span class="absolute -left-[0.55rem] top-1 md:left-0 md:-top-[0.55rem] w-4 h-4 bg-ink ${i % 2 ? "rounded-full" : ""}"></span>
          <p class="text-outline font-display font-bold text-[clamp(4rem,8vw,8rem)] leading-none tracking-tighter">${p.n}</p>
          <h3 class="t-md mt-4">${p.title}</h3>
          <p class="mt-4 max-w-xs text-ink/80">${esc(p.text)}</p>
        </li>`
      ).join("");

      const slides = TESTIMONIALS.map((t) => {
        const p = getProject(t.project);
        return `
        <div class="swiper-slide !h-auto">
          <figure class="grid gap-10 lg:grid-cols-12 items-end">
            <div class="lg:col-span-7">
              ${icon("quote", "w-14 h-14 md:w-20 md:h-20 mb-6", 1.5)}
              <blockquote class="font-display font-bold tracking-[-0.035em] leading-[1.04] text-[clamp(1.7rem,3.5vw,3.4rem)]">“${esc(t.quote)}”</blockquote>
              <figcaption class="mt-8 meta">— ${esc(t.name)}<span class="block opacity-70 mt-1 normal-case tracking-normal text-sm font-medium">${esc(t.role)}</span></figcaption>
            </div>
            <a href="${projectUrl(root, p.slug)}" class="lg:col-span-4 lg:col-start-9 block ${BG[t.color]} p-4 group" aria-label="See the project: ${esc(p.title)}">
              <div class="frame" style="--ar:4/5">${img({ id: p.image, alt: p.alt, sizes: "(min-width:1024px) 30vw, 90vw" })}</div>
              <div class="flex items-center justify-between pt-4"><span class="meta">${esc(p.title)} · ${p.year}</span>${icon("arrow-up-right", "w-5 h-5", 2.5)}</div>
            </a>
          </figure>
        </div>`;
      }).join("");

      const [a0, a1, a2] = [ARTICLES[0], ARTICLES[1], ARTICLES[3]];
      const jSmall = (a) => `
        <article class="grid grid-cols-5 gap-5 items-center" data-reveal>
          <a href="${articleUrl(root, a.slug)}" class="pc group col-span-2 block" aria-label="Read article: ${esc(a.title)}" data-project-card>
            <div class="frame pc-frame" style="--ar:1/1;--frame-bg:var(--color-sky)">${img({ id: a.image, alt: a.alt, sizes: "(min-width:1024px) 14vw, 40vw" })}</div>
          </a>
          <div class="col-span-3">
            <p class="meta"><span class="bg-lime px-2 py-1">${esc(a.category)}</span> <time class="opacity-70 ml-2" datetime="${a.date}">${formatDate(a.date)}</time></p>
            <h3 class="mt-3 font-display font-bold tracking-tight leading-[1.08] text-xl md:text-2xl"><a href="${articleUrl(root, a.slug)}" class="hover:underline underline-offset-4">${esc(a.title)}</a></h3>
            ${linkArrow(articleUrl(root, a.slug), "Read Article", "mt-3")}
          </div>
        </article>`;

      return `
<!-- HERO -->
<section class="relative overflow-hidden" data-hero aria-labelledby="hero-title">
  <div class="wrap relative pt-8 md:pt-12 pb-20 md:pb-28 grid gap-12 lg:grid-cols-12 lg:gap-6 items-start">
    <div class="lg:col-span-8 relative z-10 lg:pt-6">
      <p class="eyebrow mb-8 md:mb-10" data-hero-fade><b>SF</b> Architecture &amp; Interiors Studio, Est. 2014</p>
      <h1 id="hero-title" class="t-mega !text-[clamp(2.7rem,8.2vw,8.6rem)] !leading-[0.9]" data-hero-title>${lines("WE {{SHAPE}}\nTHE WAY YOU\nEXPERIENCE\n{{SPACE.}}")}</h1>
      <div class="mt-10 md:mt-12 grid gap-8 max-w-xl" data-hero-fade>
        <p class="lead">Architecture and interiors designed to inspire, connect, and transform the everyday.</p>
        <div class="flex flex-wrap gap-3">
          ${btn(`${root}pages/projects.html`, "Explore Our Work", "primary")}
          ${btn(`${root}pages/contact.html?type=new-project`, "Start a Project", "dark")}
        </div>
      </div>
    </div>

    <div class="relative lg:absolute lg:right-[clamp(1.25rem,4vw,4rem)] lg:top-12 lg:w-[38%] 2xl:w-[34%] z-0">
      <div class="absolute -z-10 -top-6 -left-6 md:-top-10 md:-left-10 w-3/5 aspect-square rounded-full bg-lime" data-float="-18" aria-hidden="true"></div>
      <div class="absolute -z-10 -bottom-8 -right-4 w-24 h-24 md:w-36 md:h-36 bg-tangerine" style="border-radius:100% 0 0 0" data-float="14" aria-hidden="true"></div>
      <figure>
        <div class="frame" style="--ar:4/5;--frame-bg:var(--color-sky)" data-img-reveal data-hero-image>
          ${img({ id: P.hero, alt: "Contemporary house with corten steel and white volumes, a lawn and a swimming pool", sizes: "(min-width:1024px) 38vw, 100vw", eager: true, w: 1200 })}
        </div>
        <figcaption class="mt-3 flex items-center justify-between gap-4 meta" data-hero-fade>
          <span>Fig. 01 — Corten &amp; Stone, Palm Springs</span>
          <span class="inline-flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-tangerine animate-pulse"></span>${SITE.city.split(",")[0]}, CA</span>
        </figcaption>
      </figure>
    </div>
    <a href="#featured" class="hidden lg:inline-flex absolute left-[clamp(1.25rem,4vw,4rem)] bottom-8 items-center gap-3 meta" data-hero-fade data-scroll-cue>
      <span class="relative w-px h-12 bg-ink/30 overflow-hidden"><span class="absolute inset-x-0 top-0 h-1/2 bg-ink animate-[cue_1.8s_ease-in-out_infinite]"></span></span>Scroll
    </a>
  </div>
</section>

<!-- MARQUEE -->
<div class="bg-ink text-ivory on-dark marquee py-5 border-y border-ink" aria-hidden="true">
  <div class="marquee-track">
    ${[0, 1].map(() => `<div class="flex shrink-0 items-center gap-10 pr-10 font-display font-bold uppercase text-2xl md:text-4xl tracking-tight">${["Architecture", "Interiors", "Spatial Planning", "Hospitality", "Commercial", "Consulting"].map((w, i) => `<span class="${i % 2 ? "text-lime" : ""}">${w}</span><span class="text-tangerine">✦</span>`).join("")}</div>`).join("")}
  </div>
</div>

<!-- FEATURED PROJECTS -->
<section id="featured" class="py-24 md:py-36" aria-labelledby="featured-title">
  <div class="wrap">
    <div class="grid gap-8 lg:grid-cols-12 items-end mb-16 md:mb-24">
      <div class="lg:col-span-8">
        <div data-reveal>${eyebrow("01", "Featured Projects")}</div>
        <h2 id="featured-title" class="t-xl mt-6" data-split>${lines("SPACES WITH\nA {{STORY.}}")}</h2>
      </div>
      <div class="lg:col-span-4" data-reveal>
        <p class="text-ink/80 max-w-sm">Four recent commissions, from desert courtyards to waterfront villas, each shaped by its light, climate and the people who live there.</p>
        ${linkArrow(`${root}pages/projects.html`, "All Projects", "mt-6")}
      </div>
    </div>
    <div class="agrid pgrid">
      ${featured.map((p, i) => projectCard(p, root, { slot: i, index: i }).replace("<article ", '<article data-reveal ')).join("")}
    </div>
  </div>
</section>

<!-- STUDIO INTRO -->
<section class="relative bg-ivory pb-24 md:pb-36" aria-labelledby="studio-title">
  <div class="wrap">
    <div class="grid gap-16 lg:grid-cols-12 lg:gap-8 items-center">
      <div class="lg:col-span-6 xl:col-span-5">
        <div data-reveal>${eyebrow("02", "The Studio")}</div>
        <h2 id="studio-title" class="t-xl mt-6">${lines("WE THINK\nBEYOND\n{{FOUR WALLS.}}")}</h2>
        <p class="lead mt-10 max-w-xl" data-reveal>FORM &amp; SPACE is a contemporary architecture and interior design studio. We design homes, workplaces and hospitality spaces that feel timeless yet unmistakably of now.</p>
        <p class="mt-5 max-w-xl text-ink/80" data-reveal>We believe architecture is more than creating buildings. It is about shaping experiences, inspiring emotions, and connecting people with their surroundings. So we combine thoughtful planning, creative exploration and purposeful design in everything we make.</p>
        <div class="mt-10" data-reveal>${btn(`${root}pages/studio.html`, "Discover Our Studio", "dark")}</div>
      </div>
      <div class="lg:col-span-6 lg:col-start-7 xl:col-span-6 xl:col-start-7 relative pb-24 md:pb-32">
        <div class="absolute -z-0 top-10 right-0 w-2/3 aspect-square bg-lilac" aria-hidden="true" data-parallax="-40"></div>
        <div class="relative w-[78%] ml-auto" data-reveal><div class="frame" style="--ar:4/5;--frame-bg:var(--color-lilac)">${img({ id: P.introA, alt: "Modern home with dark cladding and warmly lit entrance", sizes: "(min-width:1024px) 38vw, 80vw" })}</div></div>
        <div class="absolute left-0 bottom-0 w-[52%] border-[10px] border-ivory bg-ivory" data-parallax="30"><div class="frame" style="--ar:1/1;--frame-bg:var(--color-sky)">${img({ id: P.introB, alt: "Sunlit apartment living room with a green sofa and wooden floor", sizes: "(min-width:1024px) 22vw, 50vw" })}</div></div>
        <div class="absolute right-[-1rem] md:right-4 bottom-6 w-20 h-20 md:w-28 md:h-28 rounded-full bg-lime" data-float="-12" aria-hidden="true"></div>
      </div>
    </div>
  </div>
  <div class="wrap mt-16 md:mt-24"><div class="grid grid-cols-2 md:grid-cols-4" data-stats>${stats}</div></div>
</section>

<!-- SERVICES PREVIEW -->
<section class="pb-24 md:pb-36" aria-labelledby="services-title">
  <div class="wrap">
    <div class="flex flex-wrap items-end justify-between gap-6 mb-14">
      <div><div data-reveal>${eyebrow("03", "What We Do")}</div><h2 id="services-title" class="t-xl mt-6">${lines("FIVE WAYS\nWE {{SHAPE}} SPACE")}</h2></div>
      <div data-reveal>${linkArrow(`${root}pages/services.html`, "All Services")}</div>
    </div>
    <div class="grid gap-3 lg:grid-cols-12">${services}</div>
  </div>
</section>

<!-- CREATIVE STATEMENT -->
<section class="relative bg-ink text-ivory on-dark overflow-hidden py-28 md:py-44" aria-label="Design statement">
  <div class="absolute -right-24 top-10 w-[28rem] h-[28rem] rounded-full border-2 border-lime/60" data-parallax="-60" aria-hidden="true"></div>
  <div class="hidden md:block absolute right-[14%] bottom-10 w-32 h-32 md:w-40 md:h-40 bg-tangerine" style="border-radius:0 100% 0 0" data-parallax="40" aria-hidden="true"></div>
  <div class="wrap relative">
    <p class="eyebrow text-lime mb-8" data-reveal><b>04</b>Our Belief</p>
    <p class="t-xl !text-[clamp(2.3rem,8vw,8.5rem)]" data-split role="heading" aria-level="2">${lines("GOOD DESIGN\nISN’T JUST {{SEEN.}}\nIT’S {{EXPERIENCED.}}", "text-lime")}</p>
  </div>
</section>

<!-- PROCESS -->
<section class="bg-lilac py-24 md:py-36" aria-labelledby="process-title">
  <div class="wrap">
    <div class="grid gap-8 lg:grid-cols-12 items-end mb-16 md:mb-24">
      <div class="lg:col-span-8"><div data-reveal>${eyebrow("05", "Design Process")}</div><h2 id="process-title" class="t-xl mt-6">${lines("FROM FIRST\nIDEA TO {{FINAL}}\nDETAIL.")}</h2></div>
      <p class="lg:col-span-4 max-w-sm" data-reveal>A clear four-step rhythm keeps every project creative, collaborative and calm from the first conversation to handover.</p>
    </div>
    <div class="relative">
      <div class="hidden md:block absolute left-0 right-0 top-0 h-[2px] bg-ink process-line" data-process-line aria-hidden="true"></div>
      <ol class="grid md:grid-cols-4 md:gap-8">${process}</ol>
    </div>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="py-24 md:py-36 overflow-hidden" aria-labelledby="testi-title">
  <div class="wrap">
    <div class="flex flex-wrap items-end justify-between gap-6 mb-14">
      <div><div data-reveal>${eyebrow("06", "Kind Words")}</div><h2 id="testi-title" class="t-xl mt-6">${lines("THE PEOPLE\nBEHIND {{THE WALLS.}}")}</h2></div>
      <div class="flex items-center gap-3" data-reveal>
        <span class="meta mr-4" aria-live="polite" data-slide-count>01 / 0${TESTIMONIALS.length}</span>
        <button class="sw-btn" type="button" data-testi-prev aria-label="Previous testimonial">${icon("arrow-left", "w-5 h-5", 2.5)}</button>
        <button class="sw-btn" type="button" data-testi-next aria-label="Next testimonial">${icon("arrow-right", "w-5 h-5", 2.5)}</button>
      </div>
    </div>
    <div class="swiper" data-testimonials aria-roledescription="carousel" aria-label="Client testimonials"><div class="swiper-wrapper">${slides}</div></div>
  </div>
</section>

<!-- JOURNAL PREVIEW -->
<section class="pb-24 md:pb-36" aria-labelledby="journal-title">
  <div class="wrap">
    <div class="flex flex-wrap items-end justify-between gap-6 mb-14">
      <div><div data-reveal>${eyebrow("07", "From the Journal")}</div><h2 id="journal-title" class="t-xl mt-6">${lines("IDEAS WORTH\n{{READING.}}")}</h2></div>
      <div data-reveal>${linkArrow(`${root}pages/journal.html`, "Visit the Journal")}</div>
    </div>
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <article class="lg:col-span-7" data-reveal>
        <a href="${articleUrl(root, a0.slug)}" class="pc group block" data-project-card aria-label="Read article: ${esc(a0.title)}">
          <div class="frame pc-frame" style="--ar:4/3;--frame-bg:var(--color-lilac)"><span class="pc-chip">Featured</span>${img({ id: a0.image, alt: a0.alt, sizes: "(min-width:1024px) 55vw, 100vw" })}<span class="pc-cta">${icon("arrow-up-right", "w-6 h-6", 2.5)}</span></div>
          <p class="meta mt-5"><span class="bg-lime px-2 py-1">${esc(a0.category)}</span> <time class="opacity-70 ml-2" datetime="${a0.date}">${formatDate(a0.date)}</time></p>
          <h3 class="t-md !normal-case !tracking-[-0.03em] mt-4"><span class="pc-title">${esc(a0.title)}</span></h3>
          <p class="mt-3 max-w-xl text-ink/75">${esc(a0.excerpt)}</p>
          <span class="link-arrow mt-4">Read Article${icon("arrow-up-right", "w-4 h-4", 2.5)}</span>
        </a>
      </article>
      <div class="lg:col-span-5 grid gap-10 content-start lg:pt-16">${jSmall(a1)}${jSmall(a2)}</div>
    </div>
  </div>
</section>

<!-- FINAL CTA -->
<section class="relative bg-lime overflow-hidden py-28 md:py-44" aria-labelledby="cta-title">
  <div class="absolute -left-20 -bottom-24 w-80 h-80 rounded-full border-2 border-ink" data-parallax="40" aria-hidden="true"></div>
  <div class="absolute right-[6%] top-10 w-28 h-28 bg-ink" style="border-radius:100% 0 0 0" data-parallax="-50" aria-hidden="true"></div>
  <div class="wrap relative">
    <p class="eyebrow mb-8" data-reveal><b>08</b>Start Here</p>
    <h2 id="cta-title" class="t-xl !text-[clamp(2.4rem,8.4vw,9rem)]">${lines("LET’S MAKE\nSOMETHING\n{{MEANINGFUL.}}", "mark-orange mark")}</h2>
    <div class="mt-12 flex flex-wrap items-center gap-6" data-reveal>
      ${btn(`${root}pages/contact.html?type=new-project`, "Start a Conversation", "primary", "!py-5 !px-8")}
      <a href="mailto:${SITE.email}" class="link-arrow">${SITE.email}</a>
    </div>
  </div>
</section>`;
    },
  };
}
