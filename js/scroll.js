/** Lenis smooth scrolling, synchronised with GSAP ScrollTrigger. */
import { qs, libs, prefersReducedMotion } from "./utils.js";

let lenis = null;
export const getLenis = () => lenis;

const HEADER_OFFSET = -88;

export function scrollToTarget(target, opts = {}) {
  const behavior = prefersReducedMotion() ? "auto" : "smooth";
  if (lenis) {
    lenis.scrollTo(target, { offset: typeof target === "number" ? 0 : HEADER_OFFSET, duration: 1.4, ...opts });
  } else if (typeof target === "number") {
    window.scrollTo({ top: target, behavior });
  } else {
    target?.scrollIntoView({ behavior, block: "start" });
  }
}

export function initScroll() {
  const { Lenis, gsap, ScrollTrigger } = libs();

  if (Lenis && !prefersReducedMotion()) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    if (gsap && ScrollTrigger) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => {
        lenis.raf(t);
        requestAnimationFrame(raf);
      };
      requestAnimationFrame(raf);
    }
  }

  // Same-page anchors (e.g. #featured) go through Lenis so they never break.
  document.addEventListener("click", (e) => {
    const a = e.target.closest?.('a[href*="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
    const url = new URL(a.href, location.href);
    if (url.pathname !== location.pathname || !url.hash || url.hash === "#") return;
    const target = qs(decodeURIComponent(url.hash));
    if (!target) return;
    e.preventDefault();
    scrollToTarget(target);
    history.pushState(null, "", url.hash);
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  });

  // Landing on /page.html#section from another page.
  if (location.hash) {
    const target = qs(decodeURIComponent(location.hash));
    if (target) window.addEventListener("load", () => setTimeout(() => scrollToTarget(target, { immediate: true }), 80), { once: true });
  }
}
