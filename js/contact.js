/** Contact form: native constraint validation + custom inline messages, loading and success states. */
import { qs, qsa, storage, debounce } from "./utils.js";

const DRAFT_KEY = "fs:contactDraft";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const MESSAGES = {
  name: { valueMissing: "Please enter your full name.", tooShort: "Your name needs at least 2 characters." },
  email: { valueMissing: "Please enter your email address.", typeMismatch: "Enter a valid email, like name@example.com.", pattern: "Enter a valid email, like name@example.com." },
  type: { valueMissing: "Please choose a project type." },
  budget: { valueMissing: "Please choose an estimated budget." },
  message: { valueMissing: "Please tell us a little about your project.", tooShort: "Please add a bit more detail (at least 20 characters)." },
};

export function initContact() {
  const form = qs("[data-contact-form]");
  if (!form) return;

  const wrap = qs("[data-form-wrap]");
  const success = qs("[data-success]");
  const submit = qs("[data-submit]", form);
  const submitLabel = qs("[data-submit-label]", form);
  const statusEl = qs("[data-form-status]", form);
  const counter = qs("[data-count]", form);
  const fields = qsa("input[name], select[name], textarea[name]", form);
  const touched = new WeakSet();

  /* ----- validation ----- */
  const errorFor = (field) => {
    // Extra check beyond the browser's type=email (requires a real TLD).
    if (field.name === "email" && field.value && !EMAIL_RE.test(field.value.trim())) return MESSAGES.email.pattern;
    if (field.validity.valid) return "";
    const key = Object.keys(MESSAGES[field.name] ?? {}).find((k) => field.validity[k]);
    return MESSAGES[field.name]?.[key] ?? field.validationMessage;
  };

  const showError = (field) => {
    const msg = errorFor(field);
    const out = qs(`#${field.id}-err`, form);
    field.setAttribute("aria-invalid", msg ? "true" : "false");
    if (msg) field.setAttribute("aria-describedby", `${field.id}-err`);
    else field.removeAttribute("aria-describedby");
    if (out) {
      out.textContent = msg;
      out.classList.toggle("show", Boolean(msg));
    }
    return !msg;
  };

  fields.forEach((f) => {
    f.addEventListener("blur", () => {
      touched.add(f);
      showError(f);
    });
    f.addEventListener("input", () => {
      if (touched.has(f) || f.getAttribute("aria-invalid") === "true") showError(f);
      if (f.name === "message") updateCount();
      saveDraft();
    });
    f.addEventListener("change", () => {
      touched.add(f);
      showError(f);
      saveDraft();
    });
  });

  function updateCount() {
    const m = form.elements.message;
    if (counter) counter.textContent = `${m.value.trim().length} / 20 min`;
  }

  /* ----- draft persistence (localStorage) ----- */
  const saveDraft = debounce(() => {
    storage.set(DRAFT_KEY, Object.fromEntries(fields.map((f) => [f.name, f.value])));
  }, 300);

  const draft = storage.get(DRAFT_KEY, null);
  if (draft) fields.forEach((f) => draft[f.name] && (f.value = draft[f.name]));

  // ?type=new-project / ?type=careers pre-selects the project type.
  const typeParam = new URLSearchParams(location.search).get("type");
  const typeField = form.elements.type;
  if (typeParam && [...typeField.options].some((o) => o.value === typeParam)) typeField.value = typeParam;
  updateCount();

  /* ----- submit ----- */
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const results = fields.map((f) => {
      touched.add(f);
      return [f, showError(f)];
    });
    const firstInvalid = results.find(([, ok]) => !ok)?.[0];
    if (firstInvalid) {
      statusEl.textContent = "Please fix the highlighted fields.";
      firstInvalid.focus();
      return;
    }

    statusEl.textContent = "";
    submit.disabled = true;
    submit.setAttribute("aria-busy", "true");
    const original = submitLabel.textContent;
    submitLabel.textContent = "Sending…";

    await new Promise((r) => setTimeout(r, 1600)); // simulated network latency (frontend demo)

    const firstName = form.elements.name.value.trim().split(/\s+/)[0];
    storage.remove(DRAFT_KEY);
    form.reset();
    fields.forEach((f) => {
      f.removeAttribute("aria-invalid");
      touched.delete(f);
    });
    qsa(".err", form).forEach((el) => el.classList.remove("show"));
    updateCount();
    submit.disabled = false;
    submit.removeAttribute("aria-busy");
    submitLabel.textContent = original;

    wrap.classList.add("hidden");
    success.classList.remove("hidden");
    qs("[data-success-name]", success).textContent = firstName ? `, ${firstName}` : "";
    success.focus({ preventScroll: false });
  });

  qs("[data-again]")?.addEventListener("click", () => {
    success.classList.add("hidden");
    wrap.classList.remove("hidden");
    form.elements.name.focus();
  });
}
