/** Swiper instances: testimonials (home) and project galleries (detail pages). */
import { qs, qsa, libs, pad, prefersReducedMotion } from "./utils.js";

export function initSliders() {
  const { Swiper } = libs();
  if (!Swiper) return;
  initTestimonials(Swiper);
  initGallery(Swiper);
}

function initTestimonials(Swiper) {
  const el = qs("[data-testimonials]");
  if (!el) return;
  const slides = qsa(".swiper-slide", el);
  const count = qs("[data-slide-count]");

  const sync = (swiper) => {
    // Only the active slide should be reachable by keyboard / screen reader.
    swiper.slides.forEach((s, i) => {
      const active = i === swiper.activeIndex;
      s.setAttribute("aria-hidden", String(!active));
      s.toggleAttribute("inert", !active);
    });
    if (count) count.textContent = `${pad(swiper.activeIndex + 1)} / ${pad(slides.length)}`;
  };

  new Swiper(el, {
    slidesPerView: 1,
    spaceBetween: 64,
    speed: prefersReducedMotion() ? 0 : 800,
    grabCursor: true,
    autoHeight: false,
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: { prevEl: "[data-testi-prev]", nextEl: "[data-testi-next]" },
    a11y: { slideLabelMessage: "Testimonial {{index}} of {{slidesLength}}" },
    on: { init: sync, slideChange: sync },
  });
}

function initGallery(Swiper) {
  const el = qs("[data-gallery]");
  if (!el) return;
  new Swiper(el, {
    slidesPerView: "auto",
    spaceBetween: 24,
    speed: prefersReducedMotion() ? 0 : 700,
    grabCursor: true,
    keyboard: { enabled: true, onlyInViewport: true },
    navigation: { prevEl: "[data-gal-prev]", nextEl: "[data-gal-next]" },
    pagination: { el: qs(".swiper-pagination", el), clickable: true },
    a11y: { slideLabelMessage: "Image {{index}} of {{slidesLength}}" },
  });
}
