/** Journal: article filtering and article-page interactions. */
import { qs } from "./utils.js";
import { initFilterGrid } from "./filter-grid.js";

export function initJournal() {
  const root = qs('[data-filter-root][data-noun="article"]');
  if (root) initFilterGrid(root, { slots: 6 });
  initCopyLink();
}

function initCopyLink() {
  const btn = qs("[data-copy-link]");
  if (!btn) return;
  const label = qs("[data-copy-label]", btn);
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      label.textContent = "Link copied";
    } catch {
      label.textContent = "Copy failed";
    }
    setTimeout(() => (label.textContent = "Copy link"), 2200);
  });
}
