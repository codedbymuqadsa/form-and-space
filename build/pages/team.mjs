import { TEAM } from "../../js/data.js";
import { PHOTOS as P, PORTRAITS, photoUrl } from "../../js/images.js";
import { esc, img, icon, lines, eyebrow, btn, linkArrow, BG } from "../lib.mjs";
import { ctaBand } from "../components.mjs";

// Asymmetric placement for the six portraits (desktop)
const LAYOUT = [
  { span: "md:col-span-5 md:col-start-1", ar: "4/5", mt: "" },
  { span: "md:col-span-4 md:col-start-8", ar: "1/1", mt: "md:mt-28" },
  { span: "md:col-span-4 md:col-start-2", ar: "3/4", mt: "" },
  { span: "md:col-span-5 md:col-start-7", ar: "4/5", mt: "md:mt-20" },
  { span: "md:col-span-4 md:col-start-1", ar: "1/1", mt: "" },
  { span: "md:col-span-4 md:col-start-7", ar: "3/4", mt: "md:mt-24" },
];

export default function team() {
  return {
    file: "pages/team.html",
    key: "studio",
    title: "Team",
    desc: "Meet the architects, interior designers and strategists at FORM & SPACE, the people behind every project.",
    ogImage: photoUrl(PORTRAITS.amara, 1200),
    body: (root) => {
      const members = TEAM.map((m, i) => {
        const L = LAYOUT[i];
        return `
        <article class="${L.span} ${L.mt}" data-reveal>
          <div class="relative">
            <div class="absolute -right-3 -bottom-3 w-3/4 h-3/4 ${BG[m.color]}" aria-hidden="true"></div>
            <div class="frame relative" style="--ar:${L.ar};--frame-bg:var(--color-lilac)">${img({ id: m.image, alt: `Portrait of ${m.name}, ${m.role}`, ratio: L.ar === "4/5" ? 0.8 : L.ar === "3/4" ? 0.75 : 1, sizes: "(min-width:768px) 40vw, 100vw" })}</div>
          </div>
          <div class="mt-8 grid gap-1">
            <p class="meta opacity-70">${String(i + 1).padStart(2, "0")} — ${esc(m.role)}</p>
            <h2 class="t-lg">${esc(m.name)}</h2>
            <p class="mt-3 max-w-md text-ink/80">${esc(m.bio)}</p>
            ${linkArrow(m.link, `Connect with ${m.name.split(" ")[0]}`, "mt-4 justify-self-start").replace("<a ", '<a target="_blank" rel="noopener noreferrer" ')}
          </div>
        </article>`;
      }).join("");

      return `
<section class="relative isolate overflow-hidden pt-10 md:pt-16 pb-16 md:pb-24" aria-labelledby="page-title">
  <div class="wrap relative">
    <p class="eyebrow mb-8" data-hero-fade><b>01</b>The Team</p>
    <h1 id="page-title" class="t-mega" data-hero-title>${lines("THE PEOPLE\nBEHIND THE\n{{FORM.}}")}</h1>
    <div class="absolute right-[clamp(1.25rem,4vw,4rem)] top-6 w-24 h-24 md:w-44 md:h-44 bg-lime -z-10" style="border-radius:100% 0 100% 0" data-float="-16" aria-hidden="true"></div>
    <p class="lead mt-10 max-w-xl" data-hero-fade>Six of the thirty minds who shape our work, from the first sketch to the final handover.</p>
  </div>
</section>

<section class="pb-28 md:pb-44" aria-label="Team members">
  <div class="wrap"><div class="grid gap-y-20 md:grid-cols-12 md:gap-x-8 md:gap-y-24 items-start">${members}</div></div>
</section>

<section class="bg-ink text-ivory on-dark py-24 md:py-40 overflow-hidden" aria-labelledby="culture-title">
  <div class="wrap grid gap-14 lg:grid-cols-12 items-center">
    <div class="lg:col-span-7">
      <div data-reveal>${eyebrow("02", "Studio Culture", "text-lime")}</div>
      <h2 id="culture-title" class="t-xl mt-6">${lines("GOOD WORK\nHAPPENS WHEN\n{{GOOD MINDS}}\nCOME TOGETHER.", "text-lime")}</h2>
      <div class="mt-12 grid gap-6 sm:grid-cols-3" data-reveal>
        ${[
          ["Friday Pin-Ups", "Every week the whole studio pins up work-in-progress and critiques it kindly."],
          ["Open Studio Lunch", "A shared table, a rotating cook, and zero laptops."],
          ["Learning Budget", "Everyone gets time and funds for travel, workshops and making things."],
        ]
          .map(([t, d]) => `<div class="border-t border-ivory/30 pt-4"><h3 class="font-display font-bold text-lg">${t}</h3><p class="mt-2 text-sm text-ivory/75">${d}</p></div>`)
          .join("")}
      </div>
    </div>
    <div class="lg:col-span-5 relative" data-reveal>
      <div class="absolute -top-6 -left-6 w-1/2 aspect-square bg-lilac" aria-hidden="true" data-parallax="-30"></div>
      <div class="frame relative" style="--ar:4/5;--frame-bg:var(--color-sky)">${img({ id: P.x4, alt: "Bright, sociable living space with a sofa and wide windows", sizes: "(min-width:1024px) 38vw, 100vw" })}</div>
    </div>
  </div>
</section>

${ctaBand({ root, n: "03", label: "We’re Hiring", bg: "lime", title: `<span class="line"><span>COME MAKE</span></span><span class="line"><span><span class="mark mark-orange">SPACE</span> WITH US.</span></span>`, btnLabel: "Join Our Studio", href: `${root}pages/contact.html?type=careers` })}`;
    },
  };
}
