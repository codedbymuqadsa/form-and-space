/**
 * GSAP + ScrollTrigger animation system.
 * Progressive: content is fully visible without it (see reveal states in src/input.css).
 */
import { qs, qsa, libs, prefersReducedMotion, pad } from "./utils.js";

export function initAnimations() {
  const { gsap, ScrollTrigger, Flip } = libs();
  if (prefersReducedMotion()) return finalizeCounters();
  if (!gsap || !ScrollTrigger) return fallbackReveal();

  gsap.registerPlugin(ScrollTrigger, ...(Flip ? [Flip] : []));
  gsap.defaults({ ease: "power3.out" });

  hero(gsap);
  lineReveals(gsap);
  blockReveals(gsap, ScrollTrigger);
  imageReveals(gsap);
  parallax(gsap);
  floating(gsap);
  counters(gsap);
  processLine(gsap);

  // Images change layout once decoded; refresh trigger positions.
  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
}

/* ------------------------------------------------------------- hero */
function hero(gsap) {
  const title = qs("[data-hero-title]");
  const tl = gsap.timeline({ delay: 0.1 });
  if (title) tl.to(qsa(".line > span", title), { y: 0, yPercent: 0, duration: 1.2, stagger: 0.12, ease: "expo.out" });
  const fades = qsa("[data-hero-fade]");
  if (fades.length) tl.fromTo(fades, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, clearProps: "transform" }, title ? "-=0.8" : 0);
}

/* ---------------------------------------------- headline line reveals */
function lineReveals(gsap) {
  const parents = new Set(
    qsa(".line")
      .map((l) => l.parentElement)
      .filter((p) => p && !p.hasAttribute("data-hero-title"))
  );
  parents.forEach((parent) => {
    gsap.to(qsa(".line > span", parent), {
      y: 0,
      yPercent: 0,
      duration: 1.1,
      stagger: 0.1,
      ease: "expo.out",
      scrollTrigger: { trigger: parent, start: "top 88%", once: true },
    });
  });
}

/* ------------------------------------------------------ block reveals */
function blockReveals(gsap, ScrollTrigger) {
  const items = qsa("[data-reveal]");
  if (!items.length) return;
  ScrollTrigger.batch(items, {
    start: "top 92%",
    once: true,
    onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, stagger: 0.1, overwrite: true }),
  });
}

/* ------------------------------------------------------ image reveals */
function imageReveals(gsap) {
  qsa("[data-img-reveal]").forEach((el) => {
    const img = qs("img", el);
    const isHero = el.hasAttribute("data-hero-image");
    const scrollTrigger = isHero ? undefined : { trigger: el, start: "top 90%", once: true };
    const delay = isHero ? 0.25 : 0;
    gsap.to(el, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "expo.inOut", delay, scrollTrigger });
    if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.9, ease: "expo.out", delay, scrollTrigger });
  });
}

/* ------------------------------------------------------------ parallax */
function parallax(gsap) {
  qsa("[data-parallax]").forEach((el) => {
    const dist = parseFloat(el.dataset.parallax) || 40;
    gsap.fromTo(el, { y: -dist / 2 }, { y: dist / 2, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 } });
  });
  qsa(".frame-parallax").forEach((frame) => {
    const img = qs("img", frame);
    if (!img) return;
    // The reveal tween owns `scale`; parallax only moves Y so the two never conflict.
    gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: 0.6 } });
  });
}

/* --------------------------------------------------- floating shapes */
function floating(gsap) {
  qsa("[data-float]").forEach((el, i) => {
    const d = parseFloat(el.dataset.float) || 14;
    gsap.to(el, { y: d, rotation: d / 6, duration: 3.2 + i * 0.4, ease: "sine.inOut", repeat: -1, yoyo: true });
  });
}

/* ------------------------------------------------------------ counters */
const counterText = (el, n) => `${pad(Math.round(n), Number(el.dataset.pad ?? 0) || 1)}${el.dataset.suffix ?? ""}`;

function counters(gsap) {
  qsa("[data-counter]").forEach((el) => {
    const state = { v: 0 };
    el.textContent = counterText(el, 0);
    gsap.to(state, {
      v: Number(el.dataset.counter),
      duration: 2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 92%", once: true },
      onUpdate: () => (el.textContent = counterText(el, state.v)),
    });
  });
}

function finalizeCounters() {
  qsa("[data-counter]").forEach((el) => (el.textContent = counterText(el, Number(el.dataset.counter))));
}

/* -------------------------------------------------------- process line */
function processLine(gsap) {
  const line = qs("[data-process-line]");
  if (!line) return;
  gsap.fromTo(line, { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: { trigger: line.parentElement, start: "top 75%", end: "bottom 70%", scrub: 0.5 } });
}

/* ------------------------- fallback if GSAP failed to load: simple IntersectionObserver reveal */
function fallbackReveal() {
  qsa(".line > span").forEach((s) => (s.style.transform = "none"));
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        Object.assign(e.target.style, { transition: "opacity .8s, transform .8s", opacity: "1", transform: "none", clipPath: "none" });
        io.unobserve(e.target);
      }),
    { threshold: 0.1 }
  );
  qsa("[data-reveal], [data-img-reveal], [data-hero-fade]").forEach((el) => io.observe(el));
  finalizeCounters();
}
