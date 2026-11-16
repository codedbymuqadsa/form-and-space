/**
 * FORM & SPACE — entry point.
 * Each module guards against missing DOM, so every page can safely load the same entry.
 */
import { onReady, qs, qsa } from "./utils.js";
import { initScroll } from "./scroll.js";
import { initNavigation } from "./navigation.js";
import { initAnimations } from "./animations.js";
import { initProjects } from "./projects.js";
import { initJournal } from "./journal.js";
import { initContact } from "./contact.js";
import { initSliders } from "./sliders.js";

const safely = (name, fn) => {
  try {
    fn();
  } catch (err) {
    console.error(`[FORM & SPACE] ${name} failed:`, err);
  }
};

onReady(() => {
  // Deferred vendor scripts run before this module's DOMContentLoaded handler.
  safely("scroll", initScroll);
  safely("navigation", initNavigation);
  safely("sliders", initSliders);
  safely("projects", initProjects);
  safely("journal", initJournal);
  safely("contact", initContact);
  safely("animations", initAnimations);

  qsa("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
  window.__fsReady = true;
});
