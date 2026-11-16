import { ARTICLES, related, formatDate } from "../../js/data.js";
import { photoUrl } from "../../js/images.js";
import { esc, img, icon, lines, btn } from "../lib.mjs";
import { articleCard, articleUrl, ctaBand } from "../components.mjs";

export default function articlePages() {
  return ARTICLES.map((a, idx) => {
    const prev = ARTICLES[(idx - 1 + ARTICLES.length) % ARTICLES.length];
    const next = ARTICLES[(idx + 1) % ARTICLES.length];
    const rel = related(ARTICLES, a, 3);

    return {
      file: `pages/articles/${a.slug}.html`,
      key: "journal",
      title: a.title,
      desc: a.excerpt,
      ogImage: photoUrl(a.image, 1200),
      body: (root) => {
        const body = a.body
          .map((b) => {
            if (b.t === "p") return `<p>${esc(b.v)}</p>`;
            if (b.t === "h2") return `<h2>${esc(b.v)}</h2>`;
            if (b.t === "quote")
              return `</div><blockquote class="my-14 md:my-20 bg-lilac text-ink p-8 md:p-12" data-reveal>
                <div>${icon("quote", "w-12 h-12 mb-6", 1.5)}<p class="font-display font-bold tracking-[-0.035em] leading-[1.04] text-[clamp(1.6rem,3vw,2.8rem)]">${esc(b.v)}</p><footer class="meta mt-8">— ${esc(b.cite)}</footer></div></blockquote><div class="prose-fs">`;
            if (b.t === "img")
              return `</div><figure class="my-14 md:my-20" data-reveal><div class="frame" style="--ar:16/9;--frame-bg:var(--color-sky)">${img({ id: b.id, alt: b.alt, sizes: "(min-width:1024px) 70vw, 100vw" })}</div><figcaption class="meta mt-3">${esc(b.cap)}</figcaption></figure><div class="prose-fs">`;
            return "";
          })
          .join("\n");

        const nav = (ar, dir) => `
          <a href="${articleUrl(root, ar.slug)}" class="group block p-8 md:p-14 ${dir === "next" ? "bg-ink text-ivory on-dark text-right" : "bg-lime text-ink"}" aria-label="${dir === "next" ? "Next" : "Previous"} article: ${esc(ar.title)}">
            <p class="meta flex items-center gap-3 ${dir === "next" ? "justify-end" : ""}">${dir === "prev" ? icon("arrow-left", "w-4 h-4 transition-transform group-hover:-translate-x-2", 2.5) : ""}${dir === "next" ? "Next article" : "Previous article"}${dir === "next" ? icon("arrow-right", "w-4 h-4 transition-transform group-hover:translate-x-2", 2.5) : ""}</p>
            <p class="font-display font-bold tracking-[-0.03em] leading-[1.02] text-3xl md:text-5xl mt-6">${esc(ar.title)}</p>
            <p class="meta mt-4 opacity-80">${esc(ar.category)} · ${ar.readTime} read</p>
          </a>`;

        return `
<article>
  <header class="pt-8 md:pt-12" >
    <div class="wrap">
      <nav aria-label="Breadcrumb" class="meta flex items-center gap-2 mb-10" data-hero-fade><a href="${root}pages/journal.html" class="hover:underline">Journal</a>${icon("chevron-right", "w-3 h-3", 3)}<span class="opacity-70">${esc(a.category)}</span></nav>
      <div class="flex flex-wrap items-center gap-x-5 gap-y-2 meta mb-8" data-hero-fade>
        <span class="bg-lime px-3 py-1.5">${esc(a.category)}</span><time datetime="${a.date}">${formatDate(a.date)}</time><span class="opacity-70">${a.readTime} read</span><span class="opacity-70">By ${esc(a.author)}</span>
      </div>
      <h1 class="t-xl !normal-case !tracking-[-0.04em] !leading-[0.98] max-w-6xl !text-[clamp(2.4rem,6.6vw,6.5rem)]" data-hero-title>${lines(a.title)}</h1>
      <p class="lead mt-10 max-w-2xl" data-hero-fade>${esc(a.excerpt)}</p>
    </div>
    <div class="wrap mt-12 md:mt-16">
      <figure><div class="frame frame-parallax" style="--ar:21/9;--frame-bg:var(--color-lilac)" data-img-reveal>${img({ id: a.image, alt: a.alt, sizes: "100vw", eager: true, w: 1800 })}</div></figure>
    </div>
  </header>

  <div class="wrap py-16 md:py-28 grid gap-12 lg:grid-cols-12">
    <aside class="lg:col-span-3 lg:sticky lg:top-28 self-start grid gap-6 content-start" aria-label="Article info">
      <div><p class="meta opacity-70">Written by</p><p class="font-display font-bold text-xl mt-1">${esc(a.author)}</p></div>
      <div><p class="meta opacity-70">Published</p><p class="mt-1">${formatDate(a.date)}</p></div>
      <button type="button" class="btn btn-outline self-start !py-3" data-copy-link>${icon("link", "w-4 h-4", 2.5)}<span data-copy-label>Copy link</span></button>
    </aside>
    <div class="lg:col-span-8 lg:col-start-5"><div class="prose-fs is-first">${body}</div></div>
  </div>
</article>

<section class="pb-24 md:pb-36" aria-labelledby="related-title">
  <div class="wrap">
    <div class="flex flex-wrap items-end justify-between gap-6 mb-12"><div><p class="eyebrow" data-reveal><b>↗</b>Keep reading</p><h2 id="related-title" class="t-lg mt-4">Related articles</h2></div>
    <a class="link-arrow" href="${root}pages/journal.html">All Articles${icon("arrow-up-right", "w-4 h-4", 2.5)}</a></div>
    <div class="grid gap-12 md:grid-cols-3 md:gap-8">${rel.map((r) => articleCard(r, root, { slot: 0, sizes: "(min-width:768px) 33vw, 100vw", showFeatured: false }).replace("<article ", "<article data-reveal ")).join("")}</div>
  </div>
</section>

<nav class="grid md:grid-cols-2" aria-label="Article navigation">${nav(prev, "prev")}${nav(next, "next")}</nav>

${ctaBand({ root, n: "↗", label: "Work with us", bg: "sky", title: `<span class="line"><span>HAVE A SPACE</span></span><span class="line"><span>IN <span class="mark">MIND?</span></span></span>`, btnLabel: "Start a Conversation", href: `${root}pages/contact.html?type=new-project` })}`;
      },
    };
  });
}
