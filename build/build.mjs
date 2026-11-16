/**
 * Static page generator for FORM & SPACE.
 * Reads shared data from js/data.js and writes every HTML page + vendor assets.
 * Usage: node build/build.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { ROOT_DIR, page } from "./lib.mjs";
import home from "./pages/home.mjs";
import studio from "./pages/studio.mjs";
import projects from "./pages/projects.mjs";
import services from "./pages/services.mjs";
import team from "./pages/team.mjs";
import journal from "./pages/journal.mjs";
import contact from "./pages/contact.mjs";
import projectPages from "./pages/project-detail.mjs";
import articlePages from "./pages/article-detail.mjs";

const write = (rel, content) => {
  const abs = path.join(ROOT_DIR, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
};

const specs = [home(), studio(), projects(), services(), team(), journal(), contact(), ...projectPages(), ...articlePages()];
for (const spec of specs) {
  const { html } = page(spec);
  write(spec.file, html);
}
console.log(`✔ Generated ${specs.length} pages`);

/* Vendor assets (copied from node_modules so the site works offline) */
const nm = (p) => path.join(ROOT_DIR, "node_modules", p);
const vendor = {
  "gsap.min.js": "gsap/dist/gsap.min.js",
  "ScrollTrigger.min.js": "gsap/dist/ScrollTrigger.min.js",
  "Flip.min.js": "gsap/dist/Flip.min.js",
  "lenis.min.js": "lenis/dist/lenis.min.js",
  "lenis.css": "lenis/dist/lenis.css",
  "swiper-bundle.min.js": "swiper/swiper-bundle.min.js",
  "swiper-bundle.min.css": "swiper/swiper-bundle.min.css",
};
for (const [out, src] of Object.entries(vendor)) {
  fs.mkdirSync(path.join(ROOT_DIR, "assets/vendor"), { recursive: true });
  fs.copyFileSync(nm(src), path.join(ROOT_DIR, "assets/vendor", out));
}
console.log("✔ Copied vendor assets");

/* Favicon: F/S monogram */
write(
  "assets/icons/favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect width="36" height="36" fill="#20231F"/><path d="M8 7h4v22H8zM8 7h17v4H8zM8 15h12v4H8z" fill="#D7F45B"/><path d="M17 29a7 7 0 0 1 14 0z" fill="#FF7048"/></svg>`
);
