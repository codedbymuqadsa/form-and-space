
/**
 * Static page generator for FORM & SPACE.
 * Generates all HTML pages and copies required assets into dist.
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

const OUT_DIR = path.join(ROOT_DIR, "dist");

// Start with a clean output directory.
fs.rmSync(OUT_DIR, { recursive: true, force: true });
fs.mkdirSync(OUT_DIR, { recursive: true });

// Copy static assets and JavaScript into dist.
for (const folder of ["assets", "js"]) {
  const source = path.join(ROOT_DIR, folder);
  const destination = path.join(OUT_DIR, folder);

  if (fs.existsSync(source)) {
    fs.cpSync(source, destination, { recursive: true });
  }
}

// Write generated files inside dist.
const write = (rel, content) => {
  const abs = path.join(OUT_DIR, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
};

// Generate all HTML pages.
const specs = [
  home(),
  studio(),
  projects(),
  services(),
  team(),
  journal(),
  contact(),
  ...projectPages(),
  ...articlePages(),
];

for (const spec of specs) {
  const { html } = page(spec);
  write(spec.file, html);
}

console.log(`✔ Generated ${specs.length} pages`);

// Copy vendor assets from node_modules.
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

const vendorDir = path.join(OUT_DIR, "assets/vendor");
fs.mkdirSync(vendorDir, { recursive: true });

for (const [out, src] of Object.entries(vendor)) {
  fs.copyFileSync(
    nm(src),
    path.join(vendorDir, out)
  );
}

console.log("✔ Copied vendor assets");

// Generate favicon.
write(
  "assets/icons/favicon.svg",
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect width="36" height="36" fill="#20231F"/><path d="M8 7h4v22H8zM8 7h17v4H8zM8 15h12v4H8z" fill="#D7F45B"/><path d="M17 29a7 7 0 0 1 14 0z" fill="#FF7048"/></svg>`
);

console.log("✔ Build output ready in dist/");
