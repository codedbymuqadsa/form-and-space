/** Header state, mobile menu, back-to-top. */
import { qs, qsa } from "./utils.js";
import { getLenis, scrollToTarget } from "./scroll.js";

export function initNavigation() {
  initHeaderState();
  initMobileMenu();
  initBackToTop();
}

function initHeaderState() {
  const header = qs("[data-header]");
  if (!header) return;
  // Sentinel + IntersectionObserver: no scroll listener needed.
  const sentinel = document.createElement("div");
  sentinel.setAttribute("aria-hidden", "true");
  sentinel.style.cssText = "position:absolute;top:0;left:0;width:1px;height:24px;pointer-events:none";
  document.body.prepend(sentinel);
  new IntersectionObserver(([entry]) => header.classList.toggle("is-scrolled", !entry.isIntersecting)).observe(sentinel);
}

function initMobileMenu() {
  const menu = qs("[data-mobile-menu]");
  const toggles = qsa("[data-menu-toggle]");
  if (!menu || toggles.length < 2) return;
  const [opener, closer] = toggles;
  const desktop = window.matchMedia("(min-width: 1024px)");
  let open = false;

  const set = (state) => {
    open = state;
    menu.classList.toggle("is-open", open);
    menu.toggleAttribute("inert", !open);
    toggles.forEach((t) => t.setAttribute("aria-expanded", String(open)));
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.documentElement.style.overflow = "hidden";
      setTimeout(() => closer.focus({ preventScroll: true }), 60);
    } else {
      lenis?.start();
      document.documentElement.style.overflow = "";
      if (menu.contains(document.activeElement)) opener.focus({ preventScroll: true });
    }
  };

  toggles.forEach((t) => t.addEventListener("click", () => set(!open)));

  document.addEventListener("keydown", (e) => {
    if (!open) return;
    if (e.key === "Escape") return set(false);
    if (e.key === "Tab") {
      const focusable = qsa("a[href], button:not([disabled])", menu);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  menu.addEventListener("click", (e) => {
    if (e.target.closest("a")) set(false);
  });
  desktop.addEventListener("change", (e) => e.matches && open && set(false));
}

function initBackToTop() {
  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-back-to-top], [data-fab]")) {
      e.preventDefault();
      scrollToTarget(0);
    }
  });

  const fab = qs("[data-fab]");
  if (!fab) return;
  let ticking = false;
  const update = () => {
    const show = window.scrollY > 900;
    fab.classList.toggle("opacity-0", !show);
    fab.classList.toggle("pointer-events-none", !show);
    fab.classList.toggle("translate-y-4", !show);
    fab.tabIndex = show ? 0 : -1;
    ticking = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    },
    { passive: true }
  );
  update();
}
