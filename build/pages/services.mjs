import { SERVICES, PROCESS } from "../../js/data.js";
import { PHOTOS as P, photoUrl } from "../../js/images.js";
import { esc, img, icon, lines, eyebrow, btn, BG } from "../lib.mjs";
import { ctaBand } from "../components.mjs";

const SECTION_BG = ["bg-ivory", "bg-sky", "bg-ivory", "bg-lilac", "bg-ivory", "bg-lime"];
const BLOCK = ["bg-lime", "bg-ivory", "bg-tangerine", "bg-ivory", "bg-sky", "bg-ink"];

export default function services() {
  return {
    file: "pages/services.html",
    key: "services",
    title: "Services",
    desc: "Architecture design, interior design, residential planning, commercial architecture, hospitality design and spatial consulting from FORM & SPACE.",
    ogImage: photoUrl(P.svcArch, 1200),
    body: (root) => {
      const chips = SERVICES.map((s, i) => `<a href="#${s.key}" class="chip" data-anchor>${String(i + 1).padStart(2, "0")} ${esc(s.title)}</a>`).join("");

      const sections = SERVICES.map((s, i) => {
        const flip = i % 2 === 1;
        return `
<section id="${s.key}" class="${SECTION_BG[i]} py-20 md:py-32 scroll-mt-16 overflow-x-clip" aria-labelledby="${s.key}-title">
  <div class="wrap">
    <div class="grid gap-12 lg:grid-cols-12 lg:gap-10 items-start">
      <div class="lg:col-span-5 ${flip ? "lg:order-2 lg:col-start-8" : ""} relative" data-reveal>
        <div class="absolute ${flip ? "-left-4 -bottom-4" : "-right-4 -bottom-4"} w-2/3 h-2/3 ${BLOCK[i]} ${BLOCK[i] === "bg-ivory" ? "border-2 border-ink" : ""}" aria-hidden="true"></div>
        <div class="frame relative" style="--ar:${flip ? "4/3" : "4/5"};--frame-bg:var(--color-sky)">${img({ id: s.image, alt: s.alt, sizes: "(min-width:1024px) 40vw, 100vw" })}</div>
      </div>
      <div class="lg:col-span-6 ${flip ? "lg:col-start-1 lg:order-1" : "lg:col-start-7"}">
        <div data-reveal class="flex items-center gap-4"><span class="grid place-items-center w-14 h-14 bg-ink text-lime">${icon(s.icon, "w-6 h-6", 1.75)}</span>${eyebrow(String(i + 1).padStart(2, "0"), "Service")}</div>
        <h2 id="${s.key}-title" class="t-lg mt-6" data-reveal>${esc(s.title)}</h2>
        <p class="lead mt-6 max-w-xl" data-reveal>${esc(s.short)}</p>
        <div class="mt-10 grid gap-8 md:grid-cols-2" data-reveal>
          <div><h3 class="meta mb-3 pb-3 border-b border-ink">What We Do</h3><p class="text-ink/85">${esc(s.what)}</p></div>
          <div><h3 class="meta mb-3 pb-3 border-b border-ink">Our Approach</h3><p class="text-ink/85">${esc(s.approach)}</p></div>
        </div>
        <div class="mt-8" data-reveal>
          <h3 class="meta mb-3 pb-3 border-b border-ink">Key Deliverables</h3>
          <ul class="grid sm:grid-cols-2 gap-x-8 gap-y-2">${s.deliverables.map((d) => `<li class="flex items-start gap-3 py-1">${icon("check", "w-5 h-5 mt-0.5 shrink-0", 3)}<span>${esc(d)}</span></li>`).join("")}</ul>
        </div>
      </div>
    </div>
  </div>
</section>`;
      }).join("");

      const proc = PROCESS.map(
        (p, i) => `<li class="relative border-t border-ivory/30 pt-6 pb-10" data-reveal>
          <span class="font-display font-bold text-lime text-[clamp(3.5rem,6vw,6rem)] leading-none tracking-tighter">${p.n}</span>
          <div class="flex items-center gap-3 mt-5">${icon(p.icon, "w-6 h-6 text-lime", 1.75)}<h3 class="t-md">${p.title}</h3></div>
          <p class="mt-4 text-ivory/80 max-w-xs">${esc(p.text)}</p></li>`
      ).join("");

      return `
<section class="relative isolate overflow-hidden pt-10 md:pt-16 pb-16 md:pb-24" aria-labelledby="page-title">
  <div class="wrap relative">
    <p class="eyebrow mb-8" data-hero-fade><b>01</b>Services</p>
    <h1 id="page-title" class="t-mega" data-hero-title>${lines("DESIGN,\n{{END TO END.}}")}</h1>
    <div class="absolute right-[clamp(1.25rem,4vw,4rem)] top-0 w-20 h-20 md:w-32 md:h-32 rounded-full bg-lilac -z-10" data-float="-16" aria-hidden="true"></div>
    <p class="lead mt-10 max-w-xl" data-hero-fade>Six disciplines, one studio. Whether you need a whole building or a single room reimagined, we bring the same curiosity and craft.</p>
    <nav class="mt-10 flex flex-wrap gap-2" aria-label="Jump to a service" data-hero-fade>${chips}</nav>
  </div>
</section>
${sections}

<section class="bg-ink text-ivory on-dark py-24 md:py-36" aria-labelledby="process-title">
  <div class="wrap">
    <div class="grid gap-8 lg:grid-cols-12 items-end mb-14 md:mb-20">
      <div class="lg:col-span-8"><div data-reveal>${eyebrow("08", "How We Work")}</div><h2 id="process-title" class="t-xl mt-6">${lines("A DESIGN PROCESS\nYOU CAN {{FEEL.}}", "text-lime")}</h2></div>
      <p class="lg:col-span-4 max-w-sm text-ivory/80" data-reveal>Every service follows the same four-step rhythm, so you always know where we are and what comes next.</p>
    </div>
    <ol class="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8">${proc}</ol>
  </div>
</section>

${ctaBand({ root, n: "09", label: "Project Inquiry", title: `<span class="line"><span>TELL US ABOUT</span></span><span class="line"><span>YOUR <span class="mark mark-orange">PROJECT.</span></span></span>`, btnLabel: "Send an Inquiry", href: `${root}pages/contact.html?type=new-project`, bg: "lime" })}`;
    },
  };
}
