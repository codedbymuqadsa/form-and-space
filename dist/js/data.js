/**
 * FORM & SPACE — single source of truth for all site content.
 * Imported by the static page generator (build/) and by browser modules.
 */
import { PHOTOS as P, PORTRAITS } from "./images.js";

export const SITE = {
  name: "FORM & SPACE",
  tagline: "Spaces That Speak. Forms That Inspire.",
  email: "hello@formandspace.studio",
  phone: "+1 (415) 555-0142",
  address: "214 Mercer Lane, Studio 4B",
  city: "San Francisco, California",
  hours: "Mon – Fri, 9:00 – 18:00 PST",
  social: [
    { label: "Instagram", href: "https://www.instagram.com/", icon: "instagram" },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "linkedin" },
    { label: "Pinterest", href: "https://www.pinterest.com/", icon: "pin" },
    { label: "YouTube", href: "https://www.youtube.com/", icon: "youtube" },
  ],
};

export const NAV = [
  { key: "home", label: "Home", href: "index.html" },
  { key: "studio", label: "Studio", href: "pages/studio.html" },
  { key: "projects", label: "Projects", href: "pages/projects.html" },
  { key: "services", label: "Services", href: "pages/services.html" },
  { key: "journal", label: "Journal", href: "pages/journal.html" },
  { key: "contact", label: "Contact", href: "pages/contact.html" },
];

export const PROJECT_CATEGORIES = ["Residential", "Commercial", "Interior Design", "Hospitality"];
export const ARTICLE_CATEGORIES = ["Architecture", "Interiors", "Materials", "Design Thinking", "Studio Life"];

/* ------------------------------------------------------------------ */
/* PROJECTS                                                            */
/* ------------------------------------------------------------------ */
export const PROJECTS = [
  {
    slug: "the-sun-house",
    title: "The Sun House",
    kind: "Residential Architecture",
    category: "Residential",
    location: "Palm Springs, California",
    year: 2024,
    color: "lime",
    image: P.sunHouse,
    alt: "Dark timber-clad modern house glowing at dusk behind a mature tree",
    summary:
      "A courtyard home that follows the sun through the day, with every room tuned to a different hour of light.",
    detail: {
      lead: "A family home built around the movement of light across a single, generous courtyard.",
      overview:
        "The Sun House sits on a long, narrow lot at the edge of the desert. The clients, a family of five, asked for a house that felt open without feeling exposed. We answered with a compact timber-and-steel volume wrapped around a planted courtyard, so every room borrows daylight from two directions.",
      concept:
        "We mapped the sun's path across the site over a full year, then placed each program where its light belongs: breakfast in the east, quiet reading in the filtered north, long dinners in the amber west. The plan reads like a sundial.",
      challenge:
        "Desert heat and glare could easily have turned a glass-rich house into an oven. The challenge was to keep generous openings, framed views and indoor-outdoor living while staying thermally calm without relying on mechanical cooling.",
      approach:
        "Deep eaves, charred-timber screens and a cross-ventilated courtyard form a passive climate system. Thick, shaded walls absorb the day's heat; operable glazing releases it at night. Daylight is layered, never harsh.",
      materials: [
        { name: "Charred cedar", note: "Shou sugi ban cladding, naturally weather- and insect-resistant." },
        { name: "Blackened steel", note: "Slim frames that let glass disappear into the landscape." },
        { name: "Honed concrete", note: "Thermal mass floors that store and slowly release warmth." },
        { name: "Native planting", note: "Low-water desert species that cool the courtyard microclimate." },
      ],
      specs: { Client: "Private family", Area: "320 m²", Status: "Completed 2024", Team: "7 designers", Program: "5 bedrooms · courtyard · studio" },
      gallery: [P.sunHouse2, P.sunHouse3, P.sunHouse4, P.sunHouse5, P.sunHouse6],
      galleryAlts: [
        "Rear garden and pavilion of the Sun House under a large tree",
        "Open-plan living room with warm timber and wide glazing",
        "Bright living space with herringbone floor and sunlit window",
        "Perforated screen and timber facade filtering afternoon light",
        "Sunlit living room with pictures wall and layered textiles",
      ],
    },
  },
  {
    slug: "casa-verde",
    title: "Casa Verde",
    kind: "Interior Design",
    category: "Interior Design",
    location: "Lisbon, Portugal",
    year: 2023,
    color: "lilac",
    image: P.casaVerde,
    alt: "Living room with deep green wall, framed prints and a tan leather sofa",
    summary:
      "A restored townhouse apartment saturated with botanical green, brass details and handmade ceramics.",
    detail: {
      lead: "An apartment that lets plants, pigment and craft do the talking.",
      overview:
        "Casa Verde is the interior of a nineteenth-century townhouse apartment in Lisbon. The owners, a ceramicist and a chef, wanted a home that felt collected rather than decorated, with colour that could live comfortably next to their work.",
      concept:
        "We treated green as a neutral. A deep forest tone on the living wall anchors everything else: leather, brass, linen and raw clay. Rooms are layered like a still life, with each object chosen for texture first and colour second.",
      challenge:
        "The apartment is long and dark, with windows at only one end. We needed to carry light deep into the plan without erasing the character of the original tiles, mouldings and timber floors.",
      approach:
        "Pale lime-washed ceilings and mirrored alcoves bounce daylight inward, while saturated walls keep the rooms intimate. Furniture is low and sculptural so sight lines stay open from front door to terrace.",
      materials: [
        { name: "Lime wash", note: "Mineral paint with a soft, cloudy depth that changes through the day." },
        { name: "Tan leather", note: "Hand-stitched seating that develops patina with use." },
        { name: "Brushed brass", note: "Lighting and hardware with a warm, low-sheen finish." },
        { name: "Portuguese clay", note: "Handmade tiles and vessels sourced from local workshops." },
      ],
      specs: { Client: "Private couple", Area: "148 m²", Status: "Completed 2023", Team: "4 designers", Program: "2 bedrooms · kitchen studio · terrace" },
      gallery: [P.casaVerde2, P.casaVerde3, P.casaVerde4, P.casaVerde5, P.casaVerde6],
      galleryAlts: [
        "Open living area with caramel leather sofa and teal wall",
        "Tropical-print wall and rounded timber coffee tables",
        "Entry console beneath a round mirror and woven pendant",
        "Black sofa beside dried pampas grass and a tall plant",
        "Reading corner with plants, shelving and warm light",
      ],
    },
  },
  {
    slug: "the-collective",
    title: "The Collective",
    kind: "Commercial Architecture",
    category: "Commercial",
    location: "Rotterdam, Netherlands",
    year: 2024,
    color: "sky",
    image: P.collective,
    alt: "White stacked-box building rising against a pale blue sky",
    summary:
      "A stacked workspace for 300 makers, designed like a vertical village of shared terraces and studios.",
    detail: {
      lead: "A workplace shaped like a neighbourhood, not a tower.",
      overview:
        "The Collective houses studios, workshops and a public ground floor for a community of designers, engineers and artists. Instead of a monolithic block, we stacked offset volumes so each cluster of studios has its own terrace and sky.",
      concept:
        "We wanted people to bump into one another. Shared stairs act as streets, terraces as squares, and every floor opens onto a double-height commons. The facade is a quiet white grid that lets the activity inside become the ornament.",
      challenge:
        "The brief demanded flexible plans for tenants that change every few years, on a tight urban site with strict height limits and a high-performance energy target.",
      approach:
        "A repeating structural module keeps floors column-light and endlessly reconfigurable. Deep reveals shade glazing, while a rooftop array and heat-recovery ventilation bring the building close to net-zero operation.",
      materials: [
        { name: "Precast white concrete", note: "A crisp, durable skin with a fine sandblasted finish." },
        { name: "Low-iron glass", note: "Maximum daylight with minimal green tint." },
        { name: "Pale oak", note: "Warm interior joinery that softens the structural grid." },
        { name: "Polished screed", note: "Hard-wearing floors with an integrated radiant system." },
      ],
      specs: { Client: "Collective Works BV", Area: "9,400 m²", Status: "Completed 2024", Team: "12 designers", Program: "Studios · workshops · café · rooftop" },
      gallery: [P.collective2, P.collective3, P.collective4, P.collective5, P.collective6],
      galleryAlts: [
        "Glass-walled open workspace with long dining-style tables",
        "Bright co-working lounge with white chairs and lamps",
        "Sharp angular building geometry against the sky",
        "Mirrored towers reflecting sunlit city facades",
        "Contemporary office facade with strong rhythm",
      ],
    },
  },
  {
    slug: "horizon-villa",
    title: "Horizon Villa",
    kind: "Luxury Residential",
    category: "Residential",
    location: "Mallorca, Spain",
    year: 2025,
    color: "orange",
    image: P.horizon,
    alt: "Contemporary villa with a long terrace and infinity pool at golden hour",
    summary:
      "A low, horizontal villa that dissolves into the Mediterranean horizon through terraces, water and shade.",
    detail: {
      lead: "A villa that behaves like a landscape, layered, horizontal and quietly dramatic.",
      overview:
        "Horizon Villa occupies a terraced hillside above the sea. Its three stacked volumes step down the slope, each opening onto a deep terrace and a ribbon of water that continues the line of the horizon.",
      concept:
        "The house is designed as a sequence of thresholds: arrival court, shaded loggia, living terrace, pool edge, sea. Every room is angled for the view, but sheltered from the wind and sun by generous overhangs.",
      challenge:
        "A steep, rocky site and a strict maximum building height forced the architecture to hug the terrain, while the clients wanted uninterrupted sea views from every principal space.",
      approach:
        "We cut the villa into the slope and used green roofs to stitch the building back into the hillside. Structural cantilevers extend terraces over the drop, and local limestone ties the interior to the island.",
      materials: [
        { name: "Mallorcan limestone", note: "Quarried within 40 km and left honed, never polished." },
        { name: "Bronze-anodised aluminium", note: "Slim glazing frames that glow at sunset." },
        { name: "Smoked oak", note: "Interior panelling with a deep, quiet grain." },
        { name: "Black pool tile", note: "A reflective surface that mirrors the sky." },
      ],
      specs: { Client: "Private owner", Area: "610 m²", Status: "Completed 2025", Team: "9 designers", Program: "6 suites · pool · guest house · gym" },
      gallery: [P.horizon2, P.horizon3, P.horizon4, P.horizon5, P.horizon6],
      galleryAlts: [
        "Glass-walled villa with a long swimming pool at dusk",
        "White cantilevered villa above an azure pool",
        "Staircase descending to a glass-balustraded pool terrace",
        "Spacious living room with black armchairs and sea views",
        "Primary bedroom with tufted headboard and soft lighting",
      ],
    },
  },
  {
    slug: "the-light-house",
    title: "The Light House",
    kind: "Hospitality Design",
    category: "Hospitality",
    location: "Tulum, Mexico",
    year: 2023,
    color: "sky",
    image: P.lightHouse,
    alt: "Boutique resort with reflective pool at blue hour",
    summary: "A 24-key boutique retreat where pools, pavilions and light are the main attractions.",
  },
  {
    slug: "studio-08",
    title: "Studio 08",
    kind: "Commercial Interiors",
    category: "Commercial",
    location: "Berlin, Germany",
    year: 2022,
    color: "lilac",
    image: P.studio08,
    alt: "Long glass-partitioned office corridor with polished concrete floor",
    summary: "A creative agency workspace built from polished concrete, glass and one bold colour.",
  },
  {
    slug: "urban-nest",
    title: "Urban Nest",
    kind: "Interior Design",
    category: "Interior Design",
    location: "Copenhagen, Denmark",
    year: 2024,
    color: "orange",
    image: P.urbanNest,
    alt: "Warm Scandinavian living room with a tan sofa and gold pendant lights",
    summary: "A compact 62 m² apartment redesigned with built-in joinery, soft textures and hidden storage.",
  },
  {
    slug: "the-courtyard",
    title: "The Courtyard",
    kind: "Hospitality Design",
    category: "Hospitality",
    location: "Marrakech, Morocco",
    year: 2025,
    color: "lime",
    image: P.courtyard,
    alt: "White riad courtyard with palm trees under a pink sunset sky",
    summary: "A contemporary riad hotel arranged around a quiet palm courtyard and reflecting pool.",
  },
  {
    slug: "forma-residence",
    title: "Forma Residence",
    kind: "Residential Architecture",
    category: "Residential",
    location: "Ibiza, Spain",
    year: 2022,
    color: "lime",
    image: P.forma,
    alt: "White cubist house with stepped terraces and a mature pine tree",
    summary: "A sculptural white house of stacked cubes, terraces and shadow lines.",
  },
];

/** Projects that have dedicated detail pages (order = previous/next order). */
export const FEATURED_SLUGS = ["the-sun-house", "casa-verde", "the-collective", "horizon-villa"];

/* ------------------------------------------------------------------ */
/* JOURNAL                                                             */
/* ------------------------------------------------------------------ */
export const ARTICLES = [
  {
    slug: "the-art-of-creating-space",
    title: "The Art of Creating Space",
    category: "Architecture",
    date: "2026-10-28",
    readTime: "7 min",
    image: P.jArt,
    alt: "Empty bright room with tall white doors and pale wood floor",
    featured: true,
    excerpt: "Before walls and windows, there is a feeling. How we begin every project with what a space should make you feel.",
    author: "Amara Okafor",
    body: [
      { t: "p", v: "Every project we take on begins in the same quiet way: with an empty room, a pencil and a question. Not “what should this look like?” but “what should it feel like to walk in here on an ordinary Tuesday?”" },
      { t: "h2", v: "Start with the pause" },
      { t: "p", v: "Architecture is the art of arranging pauses. A doorway is a pause. A change in ceiling height is a pause. The place where afternoon light lands on a wall is a pause. These small moments are what people remember long after they have forgotten the floor plan." },
      { t: "quote", v: "A good room doesn't ask for attention. It gives you some back.", cite: "Amara Okafor, Creative Director" },
      { t: "img", id: P.x1, alt: "Light-filled interior with a pale sofa and soft shadows", cap: "Proportion and light do most of the work before furniture arrives." },
      { t: "h2", v: "Subtract until it sings" },
      { t: "p", v: "Our best decisions are often removals. A wall that was never needed, a corridor folded into a living area, a cabinet replaced by a niche. Space is the material we are most careful with, so we try to spend it generously and only where it matters." },
      { t: "p", v: "That is the craft behind every home, studio and hotel we design: shaping emptiness so that people, light and life can fill it." },
    ],
  },
  {
    slug: "why-natural-light-changes-everything",
    title: "Why Natural Light Changes Everything",
    category: "Design Thinking",
    date: "2026-10-12",
    readTime: "6 min",
    image: P.jLight,
    alt: "Window seat with green cushion looking out onto a sunlit garden",
    excerpt: "Daylight is the cheapest, kindest material in architecture. A guide to designing rooms that move with the sun.",
    author: "Clara Whitfield",
    body: [
      { t: "p", v: "If we could only specify one material in a building, it would be daylight. It costs nothing, it changes colour through the day, and it makes every other material look better." },
      { t: "h2", v: "Design for the whole day" },
      { t: "p", v: "Morning light is cool and clarifying, ideal for kitchens and studios. Midday light is bright and flat, best filtered. Evening light is amber and forgiving, perfect for places to gather. We plan rooms around these moods rather than treating all windows as equal." },
      { t: "quote", v: "The best window is rarely the biggest one. It is the one placed exactly where the light wants to land.", cite: "Clara Whitfield, Interior Designer" },
      { t: "img", id: P.x4, alt: "Living room with large windows and a warm, bright atmosphere", cap: "Layered openings give soft, even light without glare." },
      { t: "h2", v: "Borrow, bounce, filter" },
      { t: "p", v: "Light can be borrowed through glazed partitions, bounced off pale ceilings and filtered through screens, slats or plants. These tactics let a deep plan feel airy and keep glare and heat under control." },
    ],
  },
  {
    slug: "designing-for-the-way-we-live",
    title: "Designing for the Way We Live",
    category: "Interiors",
    date: "2026-09-30",
    readTime: "5 min",
    image: P.jLiving,
    alt: "Lived-in apartment with a red armchair, wooden table and a window onto the street",
    excerpt: "Homes are not showrooms. Why we design around routines, clutter and real life before we design around style.",
    author: "Mateo Alvarez",
    body: [
      { t: "p", v: "Open any magazine and you will find rooms without a single cable, coat or half-read book. Real homes are not like that, and good design should not pretend they are." },
      { t: "h2", v: "Observe first" },
      { t: "p", v: "We begin by shadowing the daily routine: where keys land, where children do homework, where the coffee actually gets made. Then we design generous, honest places for those moments to happen." },
      { t: "quote", v: "Storage is the quiet luxury. It is what lets a room look calm while a family lives in it.", cite: "Mateo Alvarez, Principal Architect" },
      { t: "img", id: P.x2, alt: "Furnished bedroom with orange stools and a bold artwork", cap: "One strong colour, chosen with the client, gives a bedroom its character." },
      { t: "p", v: "When a home is designed around life instead of photography, it ends up looking better in photographs too." },
    ],
  },
  {
    slug: "materials-that-tell-a-story",
    title: "Materials That Tell a Story",
    category: "Materials",
    date: "2026-09-14",
    readTime: "8 min",
    image: P.jMaterials,
    alt: "Exposed brick wall and timber beams in a building under renovation",
    excerpt: "From reclaimed brick to charred cedar, the surfaces we choose carry history, climate and craft.",
    author: "Yuki Tanaka",
    body: [
      { t: "p", v: "A material is never just a finish. It is a memory of where it came from, how it was made and who handled it. The most memorable buildings are those where the materials have something to say." },
      { t: "h2", v: "Honesty and patina" },
      { t: "p", v: "We favour materials that age well: lime plaster that softens, bronze that darkens, timber that silvers. When a surface improves with use, a building grows into itself rather than away from itself." },
      { t: "quote", v: "A wall should look better after ten years of being touched than it did on the day it was finished.", cite: "Yuki Tanaka, Senior Architect" },
      { t: "img", id: P.x7, alt: "Sunlit interior with yellow armchair and graphic art on the wall", cap: "A single object in a saturated colour becomes the focal point of a calm palette." },
      { t: "h2", v: "Local first" },
      { t: "p", v: "Sourcing stone, clay and timber within a short radius lowers a project's footprint and roots it in its place. It also leads us to craftspeople who know the material better than any catalogue." },
    ],
  },
  {
    slug: "the-future-of-urban-living",
    title: "The Future of Urban Living",
    category: "Architecture",
    date: "2026-08-22",
    readTime: "9 min",
    image: P.jUrban,
    alt: "Contemporary apartment building with dark cladding and coloured balcony accents",
    excerpt: "Smaller footprints, shared spaces and softer streets: five ideas shaping how cities will feel in the next decade.",
    author: "Mateo Alvarez",
    body: [
      { t: "p", v: "Cities are getting denser, but density does not have to mean discomfort. The best new urban housing feels more like a village stacked vertically than a filing cabinet for people." },
      { t: "h2", v: "Shared is the new private" },
      { t: "p", v: "Roof gardens, workshops, laundries that double as cafés: generous shared rooms let apartments stay compact without life feeling small. Neighbours become a feature, not a side effect." },
      { t: "quote", v: "The city's most valuable amenity is not a gym. It is a place to run into someone you like.", cite: "Mateo Alvarez, Principal Architect" },
      { t: "img", id: P.x15, alt: "Modern townhouse with warm lit entry at dusk", cap: "Lit thresholds make dense streets feel welcoming after dark." },
      { t: "h2", v: "Adapt, don't demolish" },
      { t: "p", v: "The greenest building is the one that already exists. Retrofitting, repurposing and adding lightly to existing structures will define the next generation of urban architecture." },
    ],
  },
  {
    slug: "finding-beauty-in-simplicity",
    title: "Finding Beauty in Simplicity",
    category: "Studio Life",
    date: "2026-08-05",
    readTime: "4 min",
    image: P.jSimplicity,
    alt: "Minimal white desk with a wooden clock and a small plant",
    excerpt: "Notes from the studio on restraint, and why our desks, our drawings and our buildings keep getting quieter.",
    author: "Amara Okafor",
    body: [
      { t: "p", v: "Walk through our studio and you will notice the desks are nearly empty. A pencil, a plant, a clock. It is not minimalism for its own sake. It is a habit that keeps the work honest." },
      { t: "h2", v: "Restraint is a decision" },
      { t: "p", v: "Simplicity is not what is left when you run out of ideas. It is what is left when you have made every decision on purpose. Each line on a drawing has to earn its place." },
      { t: "quote", v: "We don't design to be noticed. We design to be felt.", cite: "Amara Okafor, Creative Director" },
      { t: "img", id: P.x14, alt: "Bright living space with a white sofa and soft daylight", cap: "A calm room built from three materials and one colour." },
      { t: "p", v: "On Fridays the whole studio pins up work-in-progress and removes one thing from each model. The buildings are better for it, and so are we." },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* SERVICES                                                            */
/* ------------------------------------------------------------------ */
export const SERVICES = [
  {
    key: "architecture",
    title: "Architecture Design",
    short: "Concept to construction for homes, villas and cultural buildings.",
    icon: "building-2",
    color: "lime",
    image: P.svcArch,
    alt: "Modern house with colourful timber and render volumes",
    what: "Full architectural design from first sketch to site supervision, shaped by light, climate and the people who will use the building.",
    approach: "We prototype in models and sketches first, test daylight and airflow early, and keep construction details simple, honest and buildable.",
    deliverables: ["Concept & massing studies", "Planning applications", "Technical drawing sets", "3D visualisation & models", "Site supervision"],
  },
  {
    key: "interior",
    title: "Interior Design",
    short: "Rooms composed with colour, craft and a point of view.",
    icon: "armchair",
    color: "lilac",
    image: P.svcInterior,
    alt: "Layered living room with textured sofa, mirrors and soft lighting",
    what: "Interior architecture, furniture, lighting and styling developed as a single story, so every object belongs.",
    approach: "We start with how you live, build a palette of materials and colour, and curate furniture from makers we trust.",
    deliverables: ["Space planning", "Material & colour boards", "Bespoke joinery design", "Furniture & lighting schedule", "Styling & installation"],
  },
  {
    key: "residential",
    title: "Residential Planning",
    short: "Masterplans and layouts that make homes feel generous.",
    icon: "map",
    color: "sky",
    image: P.svcResidential,
    alt: "Aerial view of a neighbourhood of houses and gardens",
    what: "Site analysis, house layouts and neighbourhood planning for private clients and small developers.",
    approach: "We study sun paths, views and neighbours before drawing a single wall, so the plan follows the land.",
    deliverables: ["Site & feasibility analysis", "Housing layouts", "Landscape strategy", "Phasing plans", "Cost planning support"],
  },
  {
    key: "commercial",
    title: "Commercial Architecture",
    short: "Workplaces and retail spaces that people choose to be in.",
    icon: "store",
    color: "orange",
    image: P.svcCommercial,
    alt: "Looking up at the glass towers of a commercial district",
    what: "Offices, retail and mixed-use buildings designed for flexibility, identity and long-term value.",
    approach: "Adaptable structural grids, honest materials and generous shared spaces help buildings outlast the businesses inside them.",
    deliverables: ["Brief development", "Workplace strategy", "Facade & core design", "Fit-out design", "Sustainability targets"],
  },
  {
    key: "hospitality",
    title: "Hospitality Design",
    short: "Hotels, restaurants and retreats built around atmosphere.",
    icon: "wine",
    color: "sky",
    image: P.svcHospitality,
    alt: "Boutique hotel with a glowing pool and lounge at night",
    what: "Complete design for boutique hotels, restaurants and wellness retreats, from arrival experience to the last light switch.",
    approach: "We design the guest journey as a sequence of scenes, then test the operations behind it with the people who will run it.",
    deliverables: ["Concept & brand alignment", "Guest journey mapping", "Architecture & interiors", "FF&E specification", "Operational planning"],
  },
  {
    key: "consulting",
    title: "Spatial Consulting",
    short: "Strategic advice before you build, buy or renovate.",
    icon: "compass",
    color: "lime",
    image: P.svcConsulting,
    alt: "Architect sketching a floor plan on paper",
    what: "Independent guidance on feasibility, layout, budget and design direction for owners, investors and teams.",
    approach: "A short, focused engagement of workshops, site visits and sketches that turns a vague idea into a clear plan.",
    deliverables: ["Feasibility report", "Design direction deck", "Budget guidance", "Space-planning options", "Roadmap & next steps"],
  },
];

export const PROCESS = [
  { n: "01", title: "Discover", text: "We listen, visit the site and study how you live or work, then define a clear brief and vision.", icon: "search" },
  { n: "02", title: "Imagine", text: "Sketches, models and mood studies explore bold directions before we commit to one.", icon: "lightbulb" },
  { n: "03", title: "Design", text: "We refine the winning idea into precise plans, materials and details you can see and touch.", icon: "pencil-ruler" },
  { n: "04", title: "Create", text: "We stay on site through construction so the finished space matches the idea, down to the last joint.", icon: "hammer" },
];

export const STATS = [
  { value: 12, suffix: "+", label: "Years of Creative Practice" },
  { value: 48, suffix: "+", label: "Projects Completed" },
  { value: 16, suffix: "", label: "Cities Explored" },
  { value: 9, suffix: "", label: "Design Awards", pad: 2 },
];

export const PHILOSOPHY = [
  { n: "01", title: "People First", text: "Every decision starts with the people who will live, work and gather in the space.", color: "lime" },
  { n: "02", title: "Purposeful Design", text: "Nothing is decorative by default. Each line, material and opening has a reason to exist.", color: "sky" },
  { n: "03", title: "Creative Exploration", text: "We prototype wildly, test bravely and keep the ideas that surprise us.", color: "lilac" },
  { n: "04", title: "Timeless Thinking", text: "We design for decades, not seasons, with materials that age with grace.", color: "orange" },
];

export const TESTIMONIALS = [
  {
    quote: "They didn't give us a house. They gave us a way of living. Every morning the light moves across the courtyard exactly as they promised.",
    name: "Elena & Marcus Hale",
    role: "Owners, The Sun House",
    project: "the-sun-house",
    color: "lime",
  },
  {
    quote: "Working with FORM & SPACE felt like collaborating with artists who also happen to understand building regulations. The result is joyful and precise.",
    name: "Tomás Ribeiro",
    role: "Owner, Casa Verde",
    project: "casa-verde",
    color: "lilac",
  },
  {
    quote: "Our tenants say walking into the building makes them want to work. That is the best review a workplace can get, and it's entirely down to the design.",
    name: "Sanne de Vries",
    role: "Director, Collective Works",
    project: "the-collective",
    color: "sky",
  },
];

/* ------------------------------------------------------------------ */
/* TEAM                                                                */
/* ------------------------------------------------------------------ */
export const TEAM = [
  { name: "Amara Okafor", role: "Creative Director", image: PORTRAITS.amara, color: "lime", bio: "Amara leads the studio's design vision. Trained in Lagos and London, she brings a love of colour, craft and storytelling to every project.", link: "https://www.linkedin.com/" },
  { name: "Mateo Alvarez", role: "Principal Architect", image: PORTRAITS.mateo, color: "sky", bio: "With 18 years in practice, Mateo shapes the structural and spatial thinking of our largest projects, from villas to workplaces.", link: "https://www.linkedin.com/" },
  { name: "Yuki Tanaka", role: "Senior Architect", image: PORTRAITS.yuki, color: "lilac", bio: "Yuki is a detail obsessive who turns bold concepts into elegant, buildable drawings and obsesses over how materials meet.", link: "https://www.linkedin.com/" },
  { name: "Clara Whitfield", role: "Interior Designer", image: PORTRAITS.clara, color: "orange", bio: "Clara composes rooms with colour, texture and light. Her interiors are known for their warmth and unexpected pairings.", link: "https://www.instagram.com/" },
  { name: "Rafael Santos", role: "Design Strategist", image: PORTRAITS.rafael, color: "lime", bio: "Rafael connects client goals with design decisions, running workshops that turn vague ideas into clear, ambitious briefs.", link: "https://www.linkedin.com/" },
  { name: "Daniel Hart", role: "Project Coordinator", image: PORTRAITS.daniel, color: "sky", bio: "Daniel keeps every project calm, on schedule and on budget, a quiet superpower that clients remember long after handover.", link: "https://www.linkedin.com/" },
];

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */
export const getProject = (slug) => PROJECTS.find((p) => p.slug === slug);
export const getArticle = (slug) => ARTICLES.find((a) => a.slug === slug);

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

export const related = (list, current, n = 3) => {
  const others = list.filter((x) => x.slug !== current.slug);
  const same = others.filter((x) => x.category === current.category);
  return [...same, ...others.filter((x) => !same.includes(x))].slice(0, n);
};

/* ------------------------------------------------------------------ */
/* Detail content for the remaining portfolio projects                 */
/* ------------------------------------------------------------------ */
const MORE = {
  "the-light-house": {
    lead: "A retreat where the pools, pavilions and the light itself are the main attractions.",
    overview: "The Light House is a 24-key boutique retreat on the Caribbean coast. Low timber pavilions drift around a long reflecting pool, so guests move between water, shade and sky rather than corridors and lobbies.",
    concept: "We designed the property as a day in light: sunrise yoga deck, shaded noon loggia, golden-hour bar, lantern-lit dinners. Every pavilion faces the pool so the whole resort glows after dark.",
    challenge: "The coastal site faces salt, humidity and hurricane-force winds, and the owners wanted an airy, open feel with minimal air-conditioning.",
    approach: "Elevated structures, raised decks and deep thatched roofs ensure cross-breezes. Materials are marine-grade and locally sourced, and lighting is low, warm and shielded to protect the night sky.",
    materials: [
      { name: "Reclaimed hardwood", note: "Decks and screens salvaged from regional piers." },
      { name: "Palm thatch", note: "Deep, insulating roofs by local artisans." },
      { name: "Lime render", note: "Breathable walls that stay cool in the sun." },
    ],
    specs: { Client: "Light House Hospitality", Area: "3,200 m²", Status: "Completed 2023", Team: "8 designers", Program: "24 keys · pool · restaurant · spa" },
    gallery: [P.x12, P.x13, P.x14],
    galleryAlts: ["Thatched lounge pavilion beside a turquoise pool", "Guest suite with a timber bed and open views", "Resort pool surrounded by tropical planting"],
  },
  "studio-08": {
    lead: "A creative agency workspace built from polished concrete, glass and one bold colour.",
    overview: "Studio 08 is a 1,800 m² workspace for a Berlin design agency, carved from a former printing hall. The brief was simple: keep the volume, add warmth, and let the teams see each other work.",
    concept: "A single spine of glass-walled rooms runs the length of the hall, so daylight flows through from both ends. Colour is rationed: one saturated accent per zone, with everything else left raw and honest.",
    challenge: "The hall was acoustically harsh and thermally leaky, yet the clients wanted to keep the raw industrial character.",
    approach: "We inserted free-standing glass rooms with acoustic felt linings, a perimeter of insulated secondary glazing, and a soft carpet landscape for collaborative zones.",
    materials: [
      { name: "Polished concrete", note: "The original slab, ground and sealed." },
      { name: "Acoustic felt", note: "Recycled wool panels in the signature colour." },
      { name: "Black steel", note: "Slender frames for partitions and shelving." },
    ],
    specs: { Client: "Agency 08 GmbH", Area: "1,800 m²", Status: "Completed 2022", Team: "5 designers", Program: "Open studio · meeting rooms · library · café" },
    gallery: [P.x3, P.x5, P.x8],
    galleryAlts: ["Bright meeting area with bold artwork", "Modern lounge for informal meetings", "Wood-lined lounge with warm daylight"],
  },
  "urban-nest": {
    lead: "A compact 62 m² apartment redesigned with built-in joinery, soft textures and hidden storage.",
    overview: "Urban Nest transforms a compact city apartment into a calm, flexible home for a young couple who work from home. Every centimetre was drawn to serve two or three purposes.",
    concept: "We treated the plan as a piece of furniture. A continuous oak wall conceals storage, a fold-down desk and a hidden bed, so rooms can change character between day and night.",
    challenge: "Low ceilings, a narrow plan and limited daylight made the space feel cramped, and the clients refused to give up generous seating or a proper dining table.",
    approach: "Warm, pale finishes, mirrored niches and brass pendant lights lift the space, while rounded corners and a lowered seating zone create cosy intimacy.",
    materials: [
      { name: "Natural oak", note: "Joinery with a light, matte oil finish." },
      { name: "Bouclé wool", note: "Soft, tactile upholstery in warm neutrals." },
      { name: "Brass", note: "Pendants and details that add a gentle glow." },
    ],
    specs: { Client: "Private couple", Area: "62 m²", Status: "Completed 2024", Team: "3 designers", Program: "Living · work nook · bedroom" },
    gallery: [P.x6, P.x10, P.x11],
    galleryAlts: ["Deep green sofa on pale floors", "Bedroom with tall sliding glass doors", "Tufted sofa with teal cushions in daylight"],
  },
  "the-courtyard": {
    lead: "A contemporary riad hotel arranged around a quiet palm courtyard and a still, reflecting pool.",
    overview: "The Courtyard reimagines the Moroccan riad for the twenty-first century. Fourteen suites open onto a shared palm-lined court where the sound of water replaces the noise of the medina outside.",
    concept: "Thick walls, shaded arcades and a central pool create a calm microclimate. White plaster and shadow replace ornament, and the sky itself becomes the ceiling of the main room.",
    challenge: "The plot sits inside a dense historic quarter with tight access and strict heritage rules, so every design move had to be sensitive and carefully constructed.",
    approach: "Local artisans built the tadelakt walls and zellige details by hand; contemporary lighting and furniture keep the look fresh and uncluttered.",
    materials: [
      { name: "Tadelakt plaster", note: "Polished lime walls, waterproof and silky." },
      { name: "Zellige tile", note: "Hand-cut glazed clay in soft, tonal whites." },
      { name: "Cedar", note: "Carved screens and doors from the Atlas mountains." },
    ],
    specs: { Client: "Riad Collective", Area: "1,150 m²", Status: "Completed 2025", Team: "6 designers", Program: "14 suites · courtyard pool · hammam" },
    gallery: [P.x9, P.x16, P.studioD],
    galleryAlts: ["Bathroom with freestanding tub and long window", "White pavilion beside a calm blue pool", "Hotel facade reflected in the courtyard pool"],
  },
  "forma-residence": {
    lead: "A sculptural white house of stacked cubes, terraces and shadow lines.",
    overview: "Forma Residence sits on a pine-covered ridge in Ibiza. The house is composed of stacked white cubes, each a different height, linked by terraces that frame the sky and sea.",
    concept: "We wanted the house to feel like a sculpture that changes with the sun. Shadows become the decoration: crisp at noon, long and blue at dusk.",
    challenge: "Local rules protect the existing pines, so the footprint had to wrap around mature trees without disturbing their roots.",
    approach: "The cubes are lifted on slim piers, leaving the roots untouched. Cut-out terraces and deep window reveals provide shade and privacy without curtains.",
    materials: [
      { name: "White lime render", note: "Hand-troweled, slightly irregular surfaces." },
      { name: "Stone floors", note: "Continuous from terrace to living room." },
      { name: "Pine joinery", note: "From trees felled by storm on the same ridge." },
    ],
    specs: { Client: "Private owner", Area: "280 m²", Status: "Completed 2022", Team: "6 designers", Program: "4 bedrooms · roof terrace · pool" },
    gallery: [P.culture, P.x17, P.studioA],
    galleryAlts: ["White villa with an infinity pool and loungers", "Bright, modern kitchen with a breakfast island", "Terraced white villa with palm trees"],
  },
};
for (const p of PROJECTS) p.detail ??= MORE[p.slug];
