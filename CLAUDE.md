# Aquila — Project Context for Agents

## What Aquila Is

Aquila is an Indian **workforce capability-building platform** operating across three sectors:

1. **Corporates** — technical training (cybersecurity, GenAI) + leadership (First Chair program)
2. **Institutions** — college placement readiness (Ace Your Placements) + school hackathons (IndiSight)
3. **Social Impact** — rural livelihood, women-led entrepreneurship, Butterfly Project, Hire Train Deploy

Brand positioning: *"India's Capability Infrastructure Platform"* — premium, institutional, human-led, rural-impact focused. Not a coaching centre or generic training company.

---

## Repository

**GitHub:** `https://github.com/Arboreallabs-Founder/Aquila`
**Branch:** `main`
**Deployed:** Vercel (auto-deploys from `main`)
**Contact email routing:** primary `rewa@aquilalearning.in`, CC `jayati@aquilalearning.in` (via FormSubmit.co — see *Contact Form* below)

---

## File Structure

```
Aquila/
├── index.html              # Main landing page (primary file — most work here)
├── about.html
├── social-impact.html
├── case-studies.html
├── contact.html
├── first-chair.html        # Corporates dropdown
├── technical-training.html # Corporates dropdown
├── colleges.html           # Institutions dropdown (only live institutions page)
├── schools.html            # ⚠️ DISABLED — no nav/footer/in-content links point here; file kept as legacy
├── styles.css              # Shared design system — used by ALL pages
├── app.js                  # Shared interactions for subpages (nav, fade-in, counters, contact form)
├── assets/
│   ├── back/               # Home page background images (home-corporate, home-institutions, home-social)
│   ├── case-studies/       # 6 card thumbnails (corporate-capability, mahindra-placements, butterfly-project, cyber-readiness, school-transformation, land-water-livelihood)
│   ├── headers/            # 6 interior page header backgrounds (first-chair, technical-training, colleges, schools, social-impact, case-studies)
│   ├── people/             # team portraits (lowercase kebab-case)
│   └── partners/           # partner-company logos (grow-wings, career-graph) for the Team Partner Companies group
├── Logo's/                 # ⚠️ Apostrophe in folder name — see path note below
│   ├── Clients/            # 14 logos
│   ├── Hiring Partners/    # 5 logos
│   └── Ecosystem Partners/ # 3 logos (no longer shown in the logos section)
├── Back Images/            # Source folder — NOT committed (raw originals)
├── People Images/          # Source folder — NOT committed (raw originals)
├── Deck/                   # NOT committed — owner excluded intentionally
└── CLAUDE.md               # This file
```

**Navigation dropdown labels** (as of latest):
- Corporates → First Chair, Technical Training
- Institutions → **Colleges only** *(Schools temporarily disabled — see below)*

### Schools page — temporarily disabled (site-wide)

The Schools / "Hackathons by IndiSight" page is hidden while the team works on it internally. `schools.html` still exists but **nothing links to it**:
- Removed the `Schools` `<li>` from every Institutions **nav dropdown** and **mobile menu** (8 pages), so Institutions now shows only Colleges.
- Removed the `Hackathons by IndiSight` link from every **footer** Programs column (8 pages).
- `index.html`: removed the "Indisight Hackathons" Featured-Programs card (and its carousel dot, renumbered Butterfly to `data-index="3"`); dropped the `Hackathons by Indisight` pillar tag and changed the Institutions pillar subtitle to "…Future-Ready Campuses".
- `colleges.html`: the CTA-band "View School Programs" button now points to `case-studies.html` ("See Case Studies").
- `case-studies.html`: the **School Transformation** case card is wrapped in an HTML comment (legacy).

To re-enable: re-add the dropdown/mobile/footer `<li>`s, uncomment the case card, restore the program card + its dot, and the pillar tag.

---

## Design System (`styles.css`)

### CSS Custom Properties

```css
--teal:      #386982   /* primary trust color */
--purple:    #9B5CB8   /* secondary brand */
--violet:    #7B45E6   /* CTAs, highlights, accent */
--ivory:     #F8F5EC   /* main page background */
--space:     #243449   /* dark contrast / headings */
--lavender:  #EFE7FF   /* soft violet bg for tags */
--slate:     #6B7280   /* body text / muted */
--white:     #FFFFFF
--green:     #2A9D72

--gradient-cta:  linear-gradient(135deg, #386982, #9B5CB8, #7B45E6)
--gradient-hero: linear-gradient(135deg, #EBF3F7, #F3EDFF, #F8F5EC)
--shadow-sm / --shadow-md / --shadow-lg
--radius-sm: 12px / --radius-md: 20px / --radius-lg: 28px
--font-head: 'Playfair Display', Georgia, serif
--font-body: 'Public Sans', system-ui, sans-serif
--nav-h:     72px (64px on mobile)
```

### Key Shared Classes

| Class | Purpose |
|-------|---------|
| `.container` | `max-width: 1200px; margin: 0 auto; padding: 0 24px` |
| `.section-label` | Small uppercase violet eyebrow label |
| `.section-heading` | Large Playfair Display heading |
| `.section-subheading` | Body text under heading |
| `.section-header` | Wrapper — add `.center` to centre-align |
| `.btn-primary` | Violet pill button with glow shadow. Arrow SVG slides right on hover. |
| `.btn-outline` | Transparent bordered button (arrow also slides on hover) |
| `.btn-sm` | Smaller button variant |
| `.fade-in` | Scroll-triggered fade-up — **auto-staggered** by sibling index (90ms each, capped at 6). Manual `delay-1/2/3/4` classes still exist but inline JS overrides them. |
| `.u-card` | Reusable white card with hover lift |
| `.tag` | Lavender pill tag |
| `.page-header` | Standard interior page hero block — now layered with cinematic background image |
| `.ph-icon` | Page-header icon badge — `display: flex` (block-level) so eyebrow stacks below, not beside |
| `.cta-band` | Dark space-blue CTA strip (shared across pages) |
| `.scroll-progress` | Thin gradient bar at top of viewport that fills as you scroll (driven by JS) |

### Other shared rules added recently

- `:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }` — keyboard-only focus ring, no outline on mouse clicks
- `.metrics .fade-in` adds subtle `scale(0.96 → 1)` on entry (overridden under `prefers-reduced-motion`)
- `.btn svg` has `transition: transform 0.25s ease`; `:hover svg` translates right 3px

### Section background alternation pattern

`var(--ivory)` → `var(--white)` → `var(--ivory)` — sections alternate. The dark case-studies section (`var(--space)`) breaks the pattern intentionally.

---

## `index.html` — Section Order

1. **Nav** — sticky, scrolled shadow, hamburger mobile, dropdowns on hover
2. **Hero** — two-column: headline/buttons left, the 3-sector **orbit** visual right (nodes circle the Aquila-logo core), over a **subtle** full-bleed photo backdrop. See *Hero* section below.
3. ~~**Impact Metrics Strip**~~ — **removed** (commented out as legacy in `index.html`, just above the *How Aquila Works* section). Restore by uncommenting the `<div class="metrics">` block. The metric-counter JS safely no-ops when the markup is absent.
4. **The Aquila Model — Three Pillars** — Corporates / Institutions / Social Impact cards *(moved ABOVE How Aquila Works)*
5. **How Aquila Works** (`.income-model`) — Assess → Train → Practice → Place/Earn *(moved BELOW the pillars; the two were swapped)*
6. **Capability Areas** — 6-card grid
7. **Featured Programs** — horizontal accent-bar cards (**4 now** — Indisight Hackathons card removed while Schools is disabled)
8. **Case Studies** — drag-free carousel with auto-slide, prev/next, dots
9. **Logos** — **static grid**, 2 rows (Clients, Hiring Partners). Ecosystem Partners row removed.
10. **Team** — grouped categories with real photos. Execution Partners hidden (legacy comment); Partner Companies group added.
11. **Final CTA** — dark, email link
12. **Footer** — 4-col grid, social icons

*Section order note:* the Three Pillars ("The Aquila Model") and the income-model ("How Aquila Works") were **swapped** so the model is presented before the how-it-works flow.

---

## Hero — 3-Sector Convergence Visual over a subtle photo (`index.html`)

The old India presence map was fully removed earlier. The hero is a **two-column** layout: headline + buttons on the left, a **CSS/SVG orbit visual** on the right, sitting over a **subtle full-bleed photo backdrop**.

### Background photo (subtle)

`.hero` uses a **three-layer** background (top layer first) so the photo stays crisp while the headline (left) and orbit (right) both stay readable:
```css
background:
  /* 1. soft light pocket behind the orbit — calms the busy photo so nodes read cleanly */
  radial-gradient(circle at 70% 52%, rgba(250,250,253,0.82) 0%, rgba(249,249,253,0.42) 24%, transparent 48%),
  /* 2. left readability veil — neutral (no purple tint = no haze), fades out by ~60% so the right of the photo is crisp */
  linear-gradient(100deg, rgba(238,244,248,0.94) 0%, rgba(240,244,249,0.60) 33%, rgba(245,246,250,0.12) 60%, rgba(255,255,255,0) 80%),
  url('assets/headers/home.jpg') center/cover no-repeat;
```
`assets/headers/home.jpg` is the **"Hero Image v2"** triptych (corporate / students / women-artisans) from `Back Images/Home Page/`, compressed to ~190 KB. Light theme = dark headline text.
- The veil was deliberately made **neutral** (was a lavender wash that looked hazy) — keep it neutral to avoid the washed look.
- The **radial pocket** is centred on the orbit (~70% 52%); if the orbit moves, move the pocket's `circle at` to match.
- Keep the veil's **left** stop (0%) ≥0.90 or the headline loses contrast.

### Orbit concept

A central **Aquila-logo core** (white circle holding `assets/aquila-logo.png` — the circular "rj" brand mark, copied from `Logo's/Aquila .png`) with **three sector nodes** — **Corporates** (teal), **Universities** (violet), **Social Impact** (green) — that **orbit the core** along a faint dashed ring. The nodes live in one rotating layer (`.converge-system`); each node's content (`.cn-inner`) counter-rotates so icons and labels stay upright. No connector spoke lines.

### Markup structure

```
<div class="hero-visual">
  <div class="hero-converge" role="img" aria-label="...">
    <span class="converge-ring"></span>                 # static dashed orbit path (74% dia)
    <div class="converge-system">                       # ROTATES — @keyframes cv-orbit 36s
      <div class="converge-node n1"><div class="cn-inner">icon + label</div></div>  # Corporates   (top)
      <div class="converge-node n2"><div class="cn-inner">…</div></div>             # Universities (BL)
      <div class="converge-node n3"><div class="cn-inner">…</div></div>             # Social Impact (BR)
    </div>
    <div class="converge-core"><img class="cc-logo" src="assets/aquila-logo.png"></div>   # static, centred, z-index 3
  </div>
</div>
```

### Geometry — node positions

Nodes are pinned to fixed triangle points **inside** `.converge-system`; the whole system rotates, carrying the nodes around the centred core. Node CSS `top`/`left` % (orbit radius R≈162 of the old 440 grid, i.e. ring dia ≈74%):
- `.n1` (Corporates): top 13.2%, left 50%
- `.n2` (Universities): top 68.4%, left 18.2%
- `.n3` (Social Impact): top 68.4%, left 81.8%
- core: dead centre (50%,50%)

The core (`z-index:3`) is a sibling of `.converge-system` and stays put while the nodes revolve around it.

### Orbit mechanics (important)

- `.converge-system` spins with `@keyframes cv-orbit` (36s linear, 0→360°).
- `.cn-inner` runs the **same** animation `reverse` (also 36s linear) so each node's icon+label cancels the parent rotation and stays upright. **Both must keep identical duration/timing or labels will wobble.**
- Labels (`.cn-text`) are absolutely positioned below the icon inside `.cn-inner`, so they follow each icon around the orbit.

### Animations

| Effect | Mechanism | Tunable via |
|---|---|---|
| Glow orbs (kept) | `.hero-orb-1/2`, `@keyframes hero-orb-float` | opacity, duration |
| **Node orbit** | `.converge-system` `@keyframes cv-orbit` (36s) + `.cn-inner` reverse counter-rotation | orbit speed (change **both** durations together) |
| Static dashed orbit ring | `.converge-ring` (74% dia, no animation) | dash style / opacity |
| Core halo pulse | `.converge-core::before` + `@keyframes cv-pulse` (2.8s) | scale range |
| Headline italic colour cycle | `@keyframes hero-em-shift` on `.hero-headline em` | colour stops |
| Wave divider at hero bottom | `.hw-back/.hw-mid/.hw-front` + `hero-wave-drift` | duration, opacities |

All neutralised by the global `prefers-reduced-motion` override; with motion off the system rests at 0° → nodes sit top / bottom-left / bottom-right (the static composition reads fine).

---

## Interior Page Headers

Pages: `first-chair`, `technical-training`, `colleges`, `schools`, `social-impact`, `case-studies`.

Each page header now layers a **cinematic background image** behind a semi-transparent brand-tinted gradient for text contrast. Pattern in the per-page `<style>` block:

```css
.page-header {
  background:
    linear-gradient(135deg, rgba(... ,0.92) 0%, rgba(...,0.78) 50%, rgba(...,0.5) 100%),
    url('assets/headers/<slug>.jpg') center/cover no-repeat;
}
```

Heavy opacity (~88–92%) on the top-left where the headline sits; light opacity (~45–50%) on the bottom-right so the photo shows through. Each page keeps its category-specific gradient colours.

Header images live at `assets/headers/<slug>.jpg`, ~100–150 KB each (compressed from ~1.5 MB PNGs via PowerShell + System.Drawing, quality 80, max 1920 px wide).

### Shared `.ph-icon` / `.ph-eyebrow` stacking

Earlier the eyebrow text sat next to the icon (inline-flex). Now `.ph-icon` is `display: flex` (block-level) and `margin-bottom: 24px` so the eyebrow drops below the icon as the visual hierarchy intended. Applies to all 6 interior pages.

Stats bars below the hero buttons (`.prog-stats` on first-chair, `.hero-stats` on colleges/schools/social-impact) use `margin-top: 44px` (was 32px) for breathing room.

---

## Case Studies (`case-studies.html`)

Six cards in a 3-col grid, three categories (corporate / institution / social) — each with its own brand tint.

### Card structure

```
.cs-card[data-cat="corporate|institution|social"]
  .cs-top          # 150px tall image header with category-tinted overlay
    <img>          # absolute, fills the area
  .cs-body
    .cs-cat        # uppercase category label
    .cs-client     # case study title
    .cs-problem    # short problem statement
    .cs-impact     # tinted callout
    .cs-link       # arrow CTA
```

The previous category icon (briefcase, grad cap, etc.) was **removed** because the text category label below the image already signals the category. Card-top images live at `assets/case-studies/<slug>.jpg`.

Per-category tints (lightened — image carries the story, gradient is just brand-colour continuity):

| Category | Files | Tint gradient |
|---|---|---|
| corporate | `corporate-capability.jpg`, `cyber-readiness.jpg` | rgba(36,52,73,0.32) → rgba(56,105,130,0.18) |
| institution | `mahindra-placements.jpg`, `school-transformation.jpg` | rgba(45,27,78,0.32) → rgba(155,92,184,0.18) |
| social | `butterfly-project.jpg`, `land-water-livelihood.jpg` | rgba(26,58,74,0.32) → rgba(42,157,114,0.18) |

CSS layering: `.cs-top` is `position: relative` with `overflow: hidden`. `.cs-top img` is `position: absolute; inset: 0` (z 0). `.cs-top::after` applies the category tint (z 1). The text content sits in `.cs-body` below.

---

## Logos Section — Static Grid

**Class:** `.logos-section`
**Location in index.html:** between Case Studies and Team sections

**No longer a marquee.** The 3 infinite-scroll ticker rows were replaced by a **static centred grid** (`.logo-grid` = `flex-wrap`). The Set A + Set B clones, `.marquee-window`/`.marquee-track`, scroll keyframes, and edge-fade masks are all gone. Two rows remain:

| Row | Category | Logos |
|-----|----------|-------|
| 1 | Clients | 14 |
| 2 | Hiring Partners | 5 |

The **Ecosystem Partners** row was removed entirely (those companies now live in the Team → *Partner Companies* group instead — see Team section).

**Hover behaviour:** each `.logo-item` is a white rounded card; logos sit grayscale at 55% opacity and, on hover, **colorize to full and scale up 1.08** with a shadow lift. Selecting/hovering enlarges + colorizes (no scrolling to pause anymore).

**Logo path encoding:** the marquee logos still use the apostrophe folder — `Logo%27s/` with spaces as `%20`:
```html
<img src="Logo%27s/Clients/Bank%20Of%20Baroda.png">
```

**Logos on disk:**
- `Logo's/Clients/` — Bank Of Baroda, EY Logo, Final-Karle-Infra, GPL_Logo, Jai Hind Logo, Libratherm Logo, logo-ibs, Monster-Jobs-Logo-Vector, NTPC Logo, Perfetti_Van_Melle_logo, RIIM Pune, Trti logo, Tyson_Foods_logo, Voya_Financial_logo
- `Logo's/Hiring Partners/` — blue-dart-logo, comett-logo, Delhivery_Logo, Nippon Express Logo, Swiggy_logo (webp)
- `Logo's/Ecosystem Partners/` — Career Graph, Grow Wings, Megathil *(no longer shown in the logos section; Career Graph + Grow Wings copied to `assets/partners/` for the Team Partner Companies group)*

⚠️ **Deployment caveat:** Some HTTP servers reject `%27` in paths. If logos break on Vercel, rename `Logo's/` → `logos/` and update all `src` attributes accordingly. (The folder name is `OneDrive-locked` on Windows — renaming locally may require pausing OneDrive sync first.)

---

## Team Section (`index.html`)

**Class:** `.team` — after Logos Marquee, before Final CTA. Four groups, each with a header line.

### Group 1 — Founders (2-col grid, 96px avatars — photos ✓)
| Name | Image |
|------|-------|
| Rewa Singh Deo | `assets/people/rewa-singh-deo.png` |
| Jayati Pardhy | `assets/people/jayati-pardhy.jpg` |

### Group 2 — Mentors & Advisors (3-col grid, 76px avatars — all photos ✓)
| Name | Image |
|------|-------|
| Dr. Abhay Bhave | `dr-abhay-bhave.png` |
| Anurag Kumar | `anurag-kumar.png` |
| Sonali Jha | `sonali-jha.jpg` |
| Rohit Malhotra | `rohit-malhotra.png` |
| Anita Sharma | `anita-sharma.png` |
| Dr. Poonam Ojha | `dr-poonam-ojha.png` *(advisor for Ace Your Placements)* |

### Group 3 — Partner Companies (3-up logo cards) — **replaced Execution Partners**
| Name | Asset | Notes |
|------|-------|-------|
| GrowWings | `assets/partners/grow-wings.png` | logo (copied from `Logo's/Ecosystem Partners/Grow Wings.png`) |
| Career Graph | `assets/partners/career-graph.png` | logo (copied from `Logo's/Ecosystem Partners/Career Graph.png`) |
| Cunominal | `assets/partners/cunominal.png` | logo (copied from `Logo's/Ecosystem Partners/Cunomial-Logo-e1650640594588.png`; file spelled "Cunomial", display name kept "Cunominal" per owner) |

Markup uses `.partners-co-grid` (3-col → 1-col at 768px) with `.partner-co-card` items (white card, hover lift; `.partner-co-logo` wraps the logo image). CSS lives in the index team CSS block right after `.person-card.person-minimal`.

**Execution Partners group is kept as a legacy HTML comment** (`<!-- -- ON-GROUND EXECUTION PARTNERS (legacy — hidden for now) -- … -- end legacy Execution Partners -->`) directly below the Partner Companies group — Subhashini Tripathi, Thendral Rajendran, Sharanya Ojha, Malavika Sharma, Srikanth Vavilla, Shreny Mutha, Kritika Singh. Uncomment to restore. The `.execution-grid` CSS (`repeat(auto-fit, minmax(150px,1fr))`) is left in place for when it returns.

### Ace Your Placements team on `colleges.html`

A separate `Program Team` section sits between the RIIM case study and the Partner Institutions section. It surfaces the four people specifically associated with the Ace Your Placements program:

- Sharanya Ojha — Program Lead
- Shreny Mutha — Program Lead
- Kritika Singh — Program Lead
- Dr. Poonam Ojha — Advisor

Markup uses a `.program-team-grid` (4-col → 2-col at 1024px → 1-col at 480px) with `.pt-card` items. Styles live inline in the `colleges.html` `<style>` block under `/* ════ PROGRAM TEAM ════ */`. The section sits on `var(--white)` to alternate cleanly between the (ivory) case-study section above and the (ivory) Partner Institutions section below.

### Group 4 — Sector Experts (2-col horizontal cards — photos ✓)
| Name | Image |
|------|-------|
| Dr. Dilip Kumar | `assets/people/dr-dilip-kumar.png` |
| Dr. S. N. Ojha | `assets/people/dr-sn-ojha.png` |

### Avatar CSS

`.person-avatar` (index.html) has `overflow: hidden` and `.person-avatar img` uses `width: 100%; height: 100%; object-fit: cover`. Members without photos still render the gradient circle with their initial letter. Same pattern applied to `.favatar` on `about.html` (7 people there — all founders + advisors + 2 sector experts have photos).

---

## Contact Form (`contact.html` + `app.js`)

Form submissions deliver real emails via **FormSubmit.co** (no signup or API key needed).

```html
<form id="contactForm"
      action="https://formsubmit.co/ajax/rewa@aquilalearning.in"
      method="POST">
  <input type="hidden" name="_cc"       value="jayati@aquilalearning.in">
  <input type="hidden" name="_subject"  value="New inquiry from the Aquila website">
  <input type="hidden" name="_template" value="table">
  <input type="text"   name="_honey" tabindex="-1" autocomplete="off"  <!-- honeypot --> ...>
  ...
</form>
```

The handler in `app.js` (`Contact form — posts to FormSubmit.co (AJAX endpoint)`) does a JSON POST to the action URL, shows the existing inline confirmation on success, or a friendly error + fallback email on failure. Honeypot field traps automated spam.

### ⚠️ One-time activation gotcha

The **first submission** triggers an "Activate your form" email from FormSubmit to `rewa@aquilalearning.in`. **Until that activation link is clicked, no submissions deliver.** Test with a placeholder submission once and confirm Rewa clicks the activate link (check spam folder if needed).

### Optional spam-protection follow-up

After activation, FormSubmit gives a hashed URL like `https://formsubmit.co/abc123def456`. Replacing the email in the `action=` with that hash hides the email address from page-source scrapers. Swap when convenient.

---

## CSS Architecture Notes

- **Page-specific styles** live inside a `<style>` block in each HTML file's `<head>`
- **Shared styles** live in `styles.css` and are linked from every page
- The `<style>` block in `index.html` is large — organised with `/* ════ SECTION NAME ════ */` comments
- Responsive breakpoints: 1024px (tablet), 768px (mobile), 480px (small mobile)
- `prefers-reduced-motion` is handled in `styles.css` globally and per-section where needed

---

## JavaScript

### `index.html` (inline at bottom)

1. **Nav scroll shadow + scroll progress bar** — both driven by the same passive `scroll` handler; `.nav.scrolled` toggles at scrollY > 20, `.scroll-progress` updates its `transform: scaleX(...)`
2. **Hamburger / mobile menu** — toggle `.open`, close on `Escape` or outside click
3. **Fade-in observer** — `IntersectionObserver` adds `.visible` to `.fade-in` elements. **Auto-stagger:** each element's `transition-delay` is computed from its index among fade-in siblings (90ms × index, capped at 6). Elements unobserve after revealing so the cascade doesn't replay.
4. **Number counter** — animates metrics strip on scroll into view, eased cubic
5. **Carousel** — case studies; auto-slides every 5s, pauses on hover, responsive per-view count, prev/next/dots
6. **Hero India wireframe line-draw** — sets `stroke-dasharray = path.getTotalLength()` then animates `stroke-dashoffset` from `len` to `0` over 4.8s (CSS transition). Targets `.india-outline path`.
7. **Hero India map marker placement** — see *Hero* section above. Reads path bbox, applies parent transform, maps `CITIES[].lat/lng` to viewBox coords, builds the `<g class="marker">` children.

### `app.js` (subpages only — linked from about/social-impact/contact/case-studies/first-chair/technical-training/colleges/schools)

Guards every block with a presence check so it's safe on any page:
- Nav shadow on scroll
- Mobile hamburger (with Escape + outside-click close)
- Fade-in observer (simple version — no auto-stagger yet on subpages)
- Number counter for any `[data-target]` element
- Contact form (FormSubmit AJAX, see above)

---

## What Still Needs Doing (Known Gaps)

- [ ] **FormSubmit activation** — must be confirmed once before contact emails deliver. Owner action.
- [x] ~~Photos for Anita Sharma, Thendral Rajendran, Malavika Sharma~~ — all now present in `assets/people/`. Dr. Poonam Ojha (new advisor) + Shreny Mutha + Kritika Singh (new execution partners on Ace Your Placements) also added with photos.
- [ ] **City marker accuracy** — positions are derived from lat/lng at runtime, but the underlying India SVG may not be perfectly equirectangular. If a specific marker looks off, adjust its `lat`/`lng` in the `CITIES` array in `index.html` (search for `Hero India map: place city markers`). Bounds (`LAT_MAX/MIN`, `LNG_MAX/MIN`) can be tightened if many markers drift uniformly.
- [ ] **`Logo's/` rename to `logos/`** — if Vercel ever rejects `%27` in paths, the workflow is: pause OneDrive sync, rename the folder, replace `Logo%27s/` with `logos/` in `index.html`. Tried once mid-session and OS blocked the rename due to OneDrive locking.
- [ ] **Footer placeholders** — `hello@aquilaindia.com` and `+91 XXXXX` are still stale.
- [ ] **Favicon** — there's a `favicon.svg` referenced but the file isn't in repo.
- [ ] **`Back Images/`, `People Images/`** — uncommitted source folders. Not referenced by HTML; keep as working backups or delete after final asset selection.
- [ ] **Optional: Spam-harden contact form** — swap FormSubmit email-URL action for the hashed-URL action FormSubmit gives you after activation.
