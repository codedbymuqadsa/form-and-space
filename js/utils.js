/** Small, dependency-free helpers shared by every module. */

export const qs = (sel, root = document) => root.querySelector(sel);
export const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
export const prefersReducedMotion = () => motionQuery.matches;
export const isHoverDevice = () => window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/** Safe localStorage wrapper (private mode / blocked storage must never throw). */
export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable: ignore */
    }
  },
  remove(key) {
    try {
      localStorage.removeItem(key);
    } catch {
      /* ignore */
    }
  },
};

export const debounce = (fn, wait = 200) => {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
};

export const pad = (n, len = 2) => String(n).padStart(len, "0");

/** Run `fn` once the DOM is ready. */
export const onReady = (fn) =>
  document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", fn, { once: true }) : fn();

/** Third-party libraries are loaded as deferred classic scripts; resolve them defensively. */
export const libs = () => ({
  gsap: window.gsap,
  ScrollTrigger: window.ScrollTrigger,
  Flip: window.Flip,
  Lenis: window.Lenis,
  Swiper: window.Swiper,
});
