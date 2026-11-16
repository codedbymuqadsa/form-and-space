import { PHILOSOPHY, STATS, TEAM } from "../../js/data.js";
import { PHOTOS as P, photoUrl } from "../../js/images.js";
import { esc, img, icon, lines, eyebrow, btn, linkArrow, BG } from "../lib.mjs";
import { ctaBand } from "../components.mjs";

export default function studio() {
  return {
    file: "pages/studio.html",
    key: "studio",
    title: "The Studio",
    desc: "Meet FORM & SPACE: an independent architecture and interior design studio designing with purpose and creating with feeling.",
    ogImage: photoUrl(P.studioHero, 1200),
    body: (root) => {
      const phil = PHILOSOPHY.map(
        (p) => `
        <li class="${BG[p.color]} group" data-reveal>
          <div class="wrap grid gap-4 md:grid-cols-12 items-baseline py-9 md:py-12">
            <span class="meta md:col-span-1">${p.n}</span>
            <h3 class="t-lg md:col-span-6 transition-transform duration-500 group-hover:translate-x-3">${esc(p.title)}</h3>
            <p class="md:col-span-4 md:col-start-9 text-ink/85">${esc(p.text)}</p>
          </div>
        </li>`
      ).join("");

      const stats = STATS.map(
        (s) => `<div class="py-8 md:py-10 md:px-8 first:md:pl-0 border-t-2 border-ink md:border-t-0 md:border-l-2 first:md:border-l-0">
          <p class="t-xl"><span data-counter="${s.value}" data-suffix="${s.suffix}" data-pad="${s.pad ?? 0}">${String(s.value).padStart(s.pad ?? 0, "0")}${s.suffix}</span></p>
          <p class="meta mt-3 max-w-[12rem]">${esc(s.label)}</p></div>`
      ).join("");

      const people = TEAM.slice(0, 3)
        .map(
          (m, i) => `<figure class="${i === 1 ? "mt-12" : ""} ${i === 2 ? "mt-24 hidden md:block" : ""}" data-reveal>
          <div class="${BG[m.color]} p-3"><div class="frame" style="--ar:3/4">${img({ id: m.image, alt: `Portrait of ${m.name}`, ratio: 0.75, sizes: "(min-width:768px) 22vw, 50vw" })}</div></div>
          <figcaption class="mt-3"><span class="font-display font-bold text-lg">${esc(m.name)}</span><br><span class="meta opacity-70">${esc(m.role)}</span></figcaption></figure>`
        )
        .join("");

      return `
<!-- HERO -->
<section class="relative isolate overflow-hidden pt-10 md:pt-16" aria-labelledby="page-title">
  <div class="wrap relative">
    <p class="eyebrow mb-8" data-hero-fade><b>01</b>The Studio</p>
    <h1 id="page-title" class="t-mega !text-[clamp(2.7rem,9.2vw,10.5rem)]" data-hero-title>${lines("DESIGNING WITH\n{{PURPOSE.}} CREATING\nWITH {{FEELING.}}")}</h1>
    <div class="absolute right-[clamp(1.25rem,4vw,4rem)] -top-4 md:top-0 w-20 h-20 md:w-36 md:h-36 rounded-full bg-lime -z-10" data-float="-16" aria-hidden="true"></div>
    <div class="mt-10 md:mt-16 grid gap-8 md:grid-cols-12 items-end" data-hero-fade>
      <p class="lead md:col-span-5">An independent practice of architects, interior designers and strategists, shaping homes, workplaces and hospitality spaces around the people who use them.</p>
    </div>
  </div>
  <div class="wrap mt-12 md:mt-20">
    <figure>
      <div class="frame frame-parallax" style="--ar:21/9;--frame-bg:var(--color-sky)" data-img-reveal>${img({ id: P.studioHero, alt: "Timber and black-steel house with a sloping roof and wide glazing", sizes: "100vw", eager: true, w: 1800 })}</div>
      <figcaption class="meta mt-3 flex justify-between"><span>Fig. 01 — Studio built work, 2024</span><span>San Francisco / Lisbon / Rotterdam</span></figcaption>
    </figure>
  </div>
</section>

<!-- STORY -->
<section class="py-24 md:py-40" aria-labelledby="story-title">
  <div class="wrap grid gap-14 lg:grid-cols-12">
    <div class="lg:col-span-4" data-reveal>${eyebrow("02", "Our Story")}
      <p class="mt-8 text-outline font-display font-bold text-[clamp(6rem,14vw,14rem)] leading-[0.85] tracking-tighter" aria-hidden="true">2014</p>
      <p class="meta mt-2">Founded in a converted garage</p></div>
    <div class="lg:col-span-7 lg:col-start-6">
      <h2 id="story-title" class="t-lg" data-reveal>Architecture is more than creating buildings.</h2>
      <div class="mt-10 grid gap-6 max-w-2xl text-ink/85" data-reveal>
        <p class="lead !text-ink">FORM &amp; SPACE began with two friends, one drawing table and a shared belief: buildings should make people feel something.</p>
        <p>Today we are a team of thirty working across four continents. We design homes, workplaces and hotels, always starting with how a space should feel, and only then deciding how it should look.</p>
        <p>We combine thoughtful architecture, creative exploration and purposeful design to create environments that feel timeless yet contemporary. Our work has been recognised with nine design awards, but the reviews we value most come from the people who live and work in our buildings every day.</p>
      </div>
      <div class="mt-12 grid grid-cols-5 gap-4 items-end" data-reveal>
        <div class="col-span-3"><div class="frame" style="--ar:4/3;--frame-bg:var(--color-lilac)">${img({ id: P.studioA, alt: "White villa with an infinity pool and palms", sizes: "(min-width:1024px) 30vw, 60vw" })}</div></div>
        <div class="col-span-2"><div class="frame" style="--ar:3/4;--frame-bg:var(--color-lime)">${img({ id: P.process, alt: "Vintage map sheets laid out on a studio table", sizes: "(min-width:1024px) 20vw, 40vw" })}</div></div>
      </div>
    </div>
  </div>
</section>

<!-- PHILOSOPHY -->
<section aria-labelledby="phil-title">
  <div class="wrap pb-12 md:pb-16">
    <div data-reveal>${eyebrow("03", "Philosophy")}</div>
    <h2 id="phil-title" class="t-xl mt-6">${lines("FOUR IDEAS\nWE {{NEVER}} BREAK")}</h2>
  </div>
  <ul>${phil}</ul>
</section>

<!-- LARGE IMAGE COMPOSITION -->
<section class="py-24 md:py-40 overflow-hidden" aria-label="Studio imagery">
  <div class="wrap grid gap-6 md:grid-cols-12 items-start">
    <figure class="md:col-span-8" data-reveal><div class="frame frame-parallax" style="--ar:16/10;--frame-bg:var(--color-sky)">${img({ id: P.studioB, alt: "Sweeping curved green-roofed building against blue sky", sizes: "(min-width:768px) 65vw, 100vw" })}</div><figcaption class="meta mt-3">Fig. 02 — Landscape as architecture</figcaption></figure>
    <figure class="md:col-span-4 md:mt-40" data-reveal><div class="frame" style="--ar:3/4;--frame-bg:var(--color-lilac)">${img({ id: P.studioC, alt: "Curved blue towers seen from below meeting in a bridge", sizes: "(min-width:768px) 30vw, 100vw" })}</div><figcaption class="meta mt-3">Fig. 03 — Curves in the city</figcaption></figure>
    <figure class="md:col-span-5 md:col-start-2" data-reveal><div class="frame" style="--ar:4/3;--frame-bg:var(--color-lime)">${img({ id: P.studioD, alt: "Contemporary hotel facade over a blue swimming pool", sizes: "(min-width:768px) 40vw, 100vw" })}</div><figcaption class="meta mt-3">Fig. 04 — Hospitality studies</figcaption></figure>
    <p class="md:col-span-4 md:col-start-8 md:mt-16 lead" data-reveal>We work at every scale, from the handle on a cabinet to the shape of a city block, with the same obsession for proportion, light and material.</p>
  </div>
</section>

<!-- TEAM INTRO -->
<section class="bg-lilac py-24 md:py-36" aria-labelledby="team-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 items-start">
    <div class="lg:col-span-5">
      <div data-reveal>${eyebrow("04", "The Team")}</div>
      <h2 id="team-title" class="t-xl mt-6">${lines("THIRTY\nMINDS. ONE\n{{STUDIO.}}")}</h2>
      <p class="mt-8 max-w-md" data-reveal>Architects, interior designers, strategists and makers from twelve countries, united by curiosity and a love of the details.</p>
      <div class="mt-8" data-reveal>${btn(`${root}pages/team.html`, "Meet the Team", "dark")}</div>
    </div>
    <div class="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 items-start">${people}</div>
  </div>
</section>

<!-- STATS -->
<section class="bg-sky py-20 md:py-28" aria-label="Studio statistics">
  <div class="wrap"><div class="grid grid-cols-2 md:grid-cols-4" data-stats>${stats}</div></div>
</section>

<!-- STATEMENT -->
<section class="relative bg-ink text-ivory on-dark overflow-hidden py-28 md:py-44" aria-label="Studio statement">
  <div class="absolute -left-24 top-8 w-[26rem] h-[26rem] rounded-full border-2 border-lime/60" data-parallax="-50" aria-hidden="true"></div>
  <div class="wrap relative">
    <p class="t-xl !text-[clamp(2.3rem,7.6vw,8rem)]" role="heading" aria-level="2">${lines("WE DESIGN FOR\n{{PEOPLE}} FIRST.\nTHE BUILDINGS\nFOLLOW.", "text-lime")}</p>
  </div>
</section>

${ctaBand({ root, n: "05", label: "Work with us", title: `<span class="line"><span>HAVE A PROJECT</span></span><span class="line"><span>IN <span class="mark">MIND?</span></span></span>`, btnLabel: "Start a Project", href: `${root}pages/contact.html?type=new-project`, bg: "lime" })}`;
    },
  };
}
