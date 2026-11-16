/**
 * Shared category filter + search for editorial grids (projects and journal).
 * Items are plain DOM (`[data-item]`), so filtering also works without JS libraries.
 * Layout "slots" are re-assigned to visible items so the asymmetric grid never gets gaps.
 */
import { qs, qsa, libs, prefersReducedMotion, storage, debounce } from "./utils.js";

export function initFilterGrid(root, { slots = 6 } = {}) {
  const grid = qs("[data-grid]", root);
  if (!grid) return;

  const items = qsa("[data-item]", grid);
  const chips = qsa("[data-filter]", root);
  const search = qs("[data-search-input]", root);
  const status = qs("[data-status]", root);
  const empty = qs("[data-empty]", root);
  const noun = root.dataset.noun ?? "item";
  const storageKey = root.dataset.storageKey;
  const featuredAware = root.hasAttribute("data-featured-aware");
  const valid = new Set(chips.map((c) => c.dataset.filter));

  const saved = storageKey ? storage.get(storageKey, "All") : "All";
  const state = { filter: valid.has(saved) ? saved : "All", q: "" };

  const matches = (el) =>
    (state.filter === "All" || el.dataset.category === state.filter) && (!state.q || el.dataset.search.includes(state.q));

  const render = ({ animate }) => {
    const { gsap, Flip } = libs();
    const flip = animate && gsap && Flip && !prefersReducedMotion();
    const snapshot = flip ? Flip.getState(items) : null;

    let visible = 0;
    items.forEach((el) => {
      const show = matches(el);
      el.style.display = show ? "" : "none";
      if (show) {
        el.dataset.slot = String(visible % slots);
        visible++;
        // The "Featured" chip only makes sense on the unfiltered view.
        const chip = qs("[data-featured-chip]", el);
        if (chip && featuredAware) chip.hidden = !(el.hasAttribute("data-featured") && state.filter === "All" && !state.q);
      }
    });

    chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === state.filter)));
    if (status) status.textContent = `Showing ${visible} ${noun}${visible === 1 ? "" : "s"}`;
    grid.classList.toggle("hidden", visible === 0);
    empty?.classList.toggle("hidden", visible !== 0);

    if (snapshot) {
      Flip.from(snapshot, {
        duration: 0.8,
        ease: "power3.inOut",
        absolute: true,
        stagger: 0.04,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.7, delay: 0.25 }),
        onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.92, duration: 0.35 }),
      });
    }
  };

  root.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-filter]");
    if (chip && root.contains(chip)) {
      state.filter = chip.dataset.filter;
      if (storageKey) storage.set(storageKey, state.filter);
      render({ animate: true });
    }
    if (e.target.closest("[data-reset]")) {
      state.filter = "All";
      state.q = "";
      if (search) search.value = "";
      if (storageKey) storage.set(storageKey, "All");
      render({ animate: true });
    }
  });

  search?.addEventListener(
    "input",
    debounce(() => {
      state.q = search.value.trim().toLowerCase();
      render({ animate: true });
    }, 180)
  );

  render({ animate: false });
}
