import { SITE } from "../../js/data.js";
import { PHOTOS as P, photoUrl } from "../../js/images.js";
import { esc, img, icon, lines, eyebrow } from "../lib.mjs";

export const PROJECT_TYPES = [
  ["new-project", "New project — not sure where to start"],
  ["architecture", "Architecture (new build or extension)"],
  ["interior", "Interior design"],
  ["commercial", "Commercial / workplace"],
  ["hospitality", "Hospitality"],
  ["consulting", "Spatial consulting"],
  ["careers", "Joining the studio"],
  ["other", "Something else"],
];
export const BUDGETS = ["Under $50k", "$50k – $150k", "$150k – $500k", "$500k – $1.5M", "$1.5M +", "Not sure yet"];

export default function contact() {
  const info = [
    ["mail", "Email", `<a class="link-arrow !normal-case !tracking-normal !text-base" href="mailto:${SITE.email}">${SITE.email}</a>`],
    ["phone", "Phone", `<a class="link-arrow !normal-case !tracking-normal !text-base" href="tel:${SITE.phone.replace(/[^+\d]/g, "")}">${SITE.phone}</a>`],
    ["map-pin", "Studio", `${SITE.address}<br>${SITE.city}`],
    ["clock", "Office hours", SITE.hours],
  ];
  return {
    file: "pages/contact.html",
    key: "contact",
    title: "Contact",
    desc: "Have a space in mind? Contact FORM & SPACE to start a conversation about architecture, interiors or hospitality design.",
    ogImage: photoUrl(P.contact, 1200),
    body: (root) => `
<section class="relative isolate overflow-hidden pt-10 md:pt-16 pb-14 md:pb-20" aria-labelledby="page-title">
  <div class="wrap relative">
    <p class="eyebrow mb-8" data-hero-fade><b>01</b>Contact</p>
    <h1 id="page-title" class="t-mega" data-hero-title>${lines("HAVE A\nSPACE IN {{MIND?}}")}</h1>
    <div class="absolute right-[clamp(1.25rem,4vw,4rem)] top-4 w-20 h-20 md:w-36 md:h-36 rounded-full bg-tangerine -z-10" data-float="-16" aria-hidden="true"></div>
  </div>
</section>

<section class="pb-28 md:pb-40" aria-label="Contact details and form">
  <div class="wrap grid gap-16 lg:grid-cols-12 lg:gap-10">
    <div class="lg:col-span-5 grid gap-12 content-start">
      <p class="lead" data-reveal>Tell us about the building, the room or the idea. We reply to every enquiry within two working days, and the first conversation is always free.</p>
      <dl class="grid gap-0" data-reveal>
        ${info.map(([ic, label, val]) => `<div class="flex items-start gap-5 py-5 border-t border-ink/25 first:border-t-2 first:border-ink"><span class="grid place-items-center w-11 h-11 bg-lime shrink-0">${icon(ic, "w-5 h-5")}</span><div><dt class="meta opacity-70">${label}</dt><dd class="mt-1 text-lg font-medium">${val}</dd></div></div>`).join("")}
      </dl>
      <div data-reveal>
        <p class="meta mb-4">Follow the studio</p>
        <ul class="flex gap-3">${SITE.social.map((s) => `<li><a href="${s.href}" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border-[1.5px] border-ink px-4 py-3 meta hover:bg-ink hover:text-lime transition-colors" aria-label="${s.label} (opens in a new tab)">${icon(s.icon, "w-4 h-4")}<span class="hidden sm:inline">${s.label}</span></a></li>`).join("")}</ul>
      </div>
      <figure class="relative overflow-hidden bg-sky gridlines aspect-[16/10]" data-reveal aria-label="Studio location marker">
        <div class="absolute left-[56%] top-[44%] -translate-x-1/2 -translate-y-1/2 grid place-items-center">
          <span class="absolute w-20 h-20 rounded-full bg-lime/70 animate-ping"></span>
          <span class="relative grid place-items-center w-12 h-12 bg-ink text-lime rounded-full">${icon("map-pin", "w-5 h-5")}</span>
        </div>
        <figcaption class="absolute left-4 bottom-4 meta bg-ivory px-3 py-2">37.7749° N, 122.4194° W — Mercer Lane</figcaption>
      </figure>
    </div>

    <div class="lg:col-span-7">
      <div class="bg-lilac p-6 sm:p-10 md:p-14 relative" data-reveal>
        <div data-form-wrap>
          <h2 class="t-lg">Start a conversation</h2>
          <p class="mt-4 flex items-start gap-3 text-sm bg-ivory/70 p-4 border-l-4 border-ink">${icon("info", "w-5 h-5 shrink-0 mt-0.5")}<span><strong>Frontend demo.</strong> This form has no backend, so nothing is sent or stored on a server. Your draft is saved only in this browser (localStorage) and cleared once you submit.</span></p>
          <form novalidate data-contact-form class="mt-10 grid gap-8" aria-describedby="form-status">
            <div class="grid gap-8 md:grid-cols-2">
              <div class="field"><label for="name">Full name <span aria-hidden="true">*</span></label><input id="name" name="name" type="text" autocomplete="name" required minlength="2" placeholder="Jane Cooper"><p class="err" id="name-err" role="alert"></p></div>
              <div class="field"><label for="email">Email address <span aria-hidden="true">*</span></label><input id="email" name="email" type="email" autocomplete="email" required placeholder="jane@example.com"><p class="err" id="email-err" role="alert"></p></div>
            </div>
            <div class="grid gap-8 md:grid-cols-2">
              <div class="field"><label for="type">Project type <span aria-hidden="true">*</span></label>
                <select id="type" name="type" required><option value="">Select a project type</option>${PROJECT_TYPES.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join("")}</select><p class="err" id="type-err" role="alert"></p></div>
              <div class="field"><label for="budget">Estimated budget <span aria-hidden="true">*</span></label>
                <select id="budget" name="budget" required><option value="">Select a budget range</option>${BUDGETS.map((b) => `<option value="${esc(b)}">${esc(b)}</option>`).join("")}</select><p class="err" id="budget-err" role="alert"></p></div>
            </div>
            <div class="field"><label for="message">Tell us about your project <span aria-hidden="true">*</span></label>
              <textarea id="message" name="message" required minlength="20" rows="5" placeholder="Where is it, how big, and what should it feel like?"></textarea>
              <div class="flex justify-between gap-4"><p class="err" id="message-err" role="alert"></p><p class="field-hint ml-auto mt-1" data-count>0 / 20 min</p></div></div>
            <div class="flex flex-wrap items-center gap-5">
              <button type="submit" class="btn btn-dark !py-5 !px-8" data-submit><span data-submit-label>Send Message</span>${icon("arrow-up-right", "w-4 h-4", 2.5)}</button>
              <p id="form-status" class="text-sm font-medium" role="status" aria-live="polite" data-form-status></p>
            </div>
          </form>
        </div>

        <div class="hidden text-center py-10 md:py-16" data-success tabindex="-1" role="status">
          <span class="grid place-items-center w-20 h-20 bg-lime mx-auto">${icon("check", "w-10 h-10", 3)}</span>
          <h2 class="t-lg mt-8">Thank you<span data-success-name></span>.</h2>
          <p class="mt-5 max-w-md mx-auto">Your message is on its way. In a real project we'd reply within two working days. <em>(This is a frontend demo, so nothing was actually sent.)</em></p>
          <button type="button" class="btn btn-dark mt-10" data-again>Send another message${icon("arrow-up-right", "w-4 h-4", 2.5)}</button>
        </div>
      </div>
    </div>
  </div>
</section>`,
  };
}
