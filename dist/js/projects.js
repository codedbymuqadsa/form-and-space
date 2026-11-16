/** Project portfolio: filtering + hover interactions. */
import { qs, qsa, libs, isHoverDevice, prefersReducedMotion } from "./utils.js";
import { initFilterGrid } from "./filter-grid.js";

export function initProjects() {
  const root = qs('[data-filter-root][data-noun="project"]');
  if (root) initFilterGrid(root, { slots: 6 });
  initCardHover();
}

/** Image scale + subtle lift on card hover (GSAP). Shared with journal cards. */
export function initCardHover() {
  const { gsap } = libs();
  if (!gsap || !isHoverDevice() || prefersReducedMotion()) return;

  document.addEventListener(
    "pointerover",
    (e) => {
      const card = e.target.closest?.("[data-project-card]");
      if (!card || card.contains(e.relatedTarget)) return;
      const img = qs(".frame img", card);
      if (img) gsap.to(img, { scale: 1.07, duration: 0.9, ease: "power3.out", overwrite: "auto" });
    },
    { passive: true }
  );
  document.addEventListener(
    "pointerout",
    (e) => {
      const card = e.target.closest?.("[data-project-card]");
      if (!card || card.contains(e.relatedTarget)) return;
      const img = qs(".frame img", card);
      if (img) gsap.to(img, { scale: 1, duration: 0.9, ease: "power3.out", overwrite: "auto" });
    },
    { passive: true }
  );
}
