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
├── colleges.html           # Institutions dropdown
├── schools.html            # Institutions dropdown
├── styles.css              # Shared design system — used by ALL pages
├── app.js                  # Shared interactions for subpages (nav, fade-in, counters, contact form)
├── assets/
│   ├── back/               # Home page background images (home-corporate, home-institutions, home-social)
│   ├── case-studies/       # 6 card thumbnails (corporate-capability, mahindra-placements, butterfly-project, cyber-readiness, school-transformation, land-water-livelihood)
│   ├── headers/            # 6 interior page header backgrounds (first-chair, technical-training, colleges, schools, social-impact, case-studies)
│   └── people/             # 11 team portraits (lowercase kebab-case)
├── Logo's/                 # ⚠️ Apostrophe in folder name — see path note below
│   ├── Clients/            # 14 logos
│   ├── Hiring Partners/    # 5 logos
│   └── Ecosystem Partners/ # 3 logos
├── Back Images/            # Source folder — NOT committed (raw originals)
├── People Images/          # Source folder — NOT committed (raw originals)
├── Deck/                   # NOT committed — owner excluded intentionally
└── CLAUDE.md               # This file
```

**Navigation dropdown labels** (as of latest):
- Corporates → First Chair, Technical Training
- Institutions → Colleges, Schools *(short labels — full program names stay in footer columns and on-page content)*

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
2. **Hero** — featured India presence map with city markers (see *Hero* section below)
3. **Impact Metrics Strip** — animated number counters (JS), 5 stats, scale-in on entry
4. **Three Pillars** — Corporates / Institutions / Social Impact cards
5. **Capability Areas** — 6-card grid
6. **Featured Programs** — 5 horizontal accent-bar cards
7. **Case Studies** — drag-free carousel with auto-slide, prev/next, dots
8. **Logos Marquee** — 3 infinite-scroll ticker rows (real logos, CSS animation)
9. **Team** — 4 grouped categories with real photos for most members
10. **Final CTA** — dark, email link
11. **Footer** — 4-col grid, social icons

---

## Hero — India Presence Map (`index.html`)

Replaced the original photo card + India watermark with a **featured India outline as the right-side visual**, populated with 12 city markers driven by lat/lng at runtime.

### Markup structure

```
<section class="hero">
  <div class="hero-orb hero-orb-1"></div>        # soft violet glow (top-left, drifts)
  <div class="hero-orb hero-orb-2"></div>        # soft teal glow (bottom-right, drifts reverse)
  <div class="container">
    <div class="hero-inner">
      <div class="hero-content">…headline + buttons</div>
      <div class="hero-visual">
        <div class="hero-india-visual">
          <svg class="india-map-svg" viewBox="0 0 1024 1024">
            <g class="india-outline" transform="translate(0,1024) scale(0.1,-0.1)">
              <path d="..."/>                    # India outline (line-draw animates on load)
            </g>
            <g class="india-markers"></g>        # populated by JS at runtime
          </svg>
          <div class="hero-impact-chip chip-1">75,000+ Livelihood beneficiaries</div>
          <div class="hero-impact-chip chip-2">3,000+ Placements enabled</div>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-waves">…3 layered animated SVG waves at the bottom…</div>
</section>
```

### City markers — driven by JS (not hard-coded)

In the script block at the bottom of `index.html`, the IIFE `Hero India map: place city markers from lat/lng` does:

1. Reads `outline.getBBox()` (path-local coords, before the parent transform)
2. Applies the parent `translate(0,1024) scale(0.1,-0.1)` manually to get viewBox-space bounds
3. Linearly maps each city's lat/lng to viewBox coords using `LAT_MAX=35.0`, `LAT_MIN=8.0`, `LNG_MIN=68.0`, `LNG_MAX=97.0` (mainland India)
4. Creates `<g class="marker [hq] delay-N">` with `<circle class="halo">`, `<circle class="dot">`, `<text class="label">` for each

**To adjust any marker:** edit its entry in the `CITIES` array in `index.html`. Per-city fields:
- `lat`, `lng` — required, drives the position
- `side: 'left'` — flips label to the left of the dot (text-anchor=end)
- `hq: true` — Bengaluru only; larger dot, teal colour, " · HQ" suffix on label

Cities currently listed (in order — index drives `delay-N` cycling): Chandigarh, Gurugram, Assam, Ranchi, Kolkata, Bhubaneswar, Mumbai (left), Nagpur, Pune, Hyderabad, Bengaluru (HQ + left), Chennai.

### Animations on the hero

| Effect | CSS class / mechanism | Tunable via |
|---|---|---|
| Floating violet/teal glow orbs | `.hero-orb-1/2`, `@keyframes hero-orb-float` (22s/28s) | `opacity`, animation duration |
| India outline line-draw on load | `stroke-dashoffset` transition (4.8s), JS sets dasharray on first paint | the 4.8s transition value |
| Marker pulse halos | `@keyframes india-marker-pulse` (2.4s), staggered via `.delay-1` through `.delay-6` | duration, scale range |
| Italic "India's" colour cycle in headline | `@keyframes hero-em-shift` on `.hero-headline em` (7s) | colour stops |
| Wave divider at hero bottom | `.hw-back/.hw-mid/.hw-front` + `@keyframes hero-wave-drift` (26/18/14s, opposite directions) | duration, fill opacities |

All effects are neutralised by the global `prefers-reduced-motion` override.

### Floating impact chips around the India map

Two glass cards anchored to the SVG corners — `chip-1` ("75,000+ Livelihood beneficiaries") and `chip-2` ("3,000+ Placements enabled"). Positions are tuned so they sit **outside** the India outline rather than overlapping city markers:

- `chip-1`: `top: -12px; left: -48px;` — tucks into the upper-left, above the Chandigarh marker (which sits at lat ~30.7 / ~16% from top of viewBox).
- `chip-2`: `bottom: -8px; right: -36px;` — sits in the lower-right empty space (India tapers to a point at Chennai/Kanyakumari, leaving the SE corner free).

If a new city marker is added near these corners and starts overlapping the chip, either nudge the chip further out or move the marker — don't shrink the chip beyond ~140px min-width or it loses presence.

The `.hero` parent has `overflow: hidden`, so chips with negative offsets still render — they just can't escape the hero section's bounds.

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

## Logos Marquee Section

**Class:** `.logos-section`
**Location in index.html:** between Case Studies and Team sections

Three ticker rows:

| Row | Category | Logos | Direction | Duration | Repetitions in HTML |
|-----|----------|-------|-----------|----------|-------------------|
| 1 | Clients | 14 | ← left | 35s | 2 sets of 14 |
| 2 | Hiring Partners | 5 | → right | 22s | 2 sets of 15 (3 reps × 5) |
| 3 | Ecosystem Partners | 3 | ← left slow | 30s | 2 sets of 12 (4 reps × 3) |

**Animation technique:** each track contains Set A + Set B (identical). CSS animates `translateX(0)` → `translateX(-50%)` (left) or reverse (right). The `-50%` trick is seamless because Set B = Set A. Short logo sets are repeated within Set A so Set A width > viewport width, preventing a visible gap before the loop.

**Edge fade masking:** `.marquee-window::before/::after` apply white-to-transparent gradients over the edges so logos dissolve in/out rather than hard-cut at the container edge.

**Logo path encoding:** The folder is committed as `Logo's` (apostrophe). In `src` attributes, use `Logo%27s/` and encode spaces as `%20`:
```html
<img src="Logo%27s/Clients/Bank%20Of%20Baroda.png">
```

**Hover behaviour:** grayscale 50% opacity → full colour on hover per logo. Whole row pauses on `.marquee-window:hover`.

**Logos on disk:**
- `Logo's/Clients/` — Bank Of Baroda, EY Logo, Final-Karle-Infra, GPL_Logo, Jai Hind Logo, Libratherm Logo, logo-ibs, Monster-Jobs-Logo-Vector, NTPC Logo, Perfetti_Van_Melle_logo, RIIM Pune, Trti logo, Tyson_Foods_logo, Voya_Financial_logo
- `Logo's/Hiring Partners/` — blue-dart-logo, comett-logo, Delhivery_Logo, Nippon Express Logo, Swiggy_logo (webp)
- `Logo's/Ecosystem Partners/` — Career Graph, Grow Wings, Megathil

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

### Group 3 — On-Ground Execution Partners (auto-fit minimal grid, name only — all photos ✓)
| Name | Image | Notes |
|------|-------|-------|
| Subhashini Tripathi | `subhashini-tripathi.png` | |
| Thendral Rajendran | `thendral-rajendran.png` | |
| Sharanya Ojha | `sharanya-ojha.png` | Ace Your Placements |
| Malavika Sharma | `malavika-sharma.png` | *(file: `malavika-sharma.png`, sourced from `Malvika Sharma.png` — kept the name spelling Malavika Sharma per owner)* |
| Srikanth Vavilla | `srikanth-vavilla.png` | |
| Shreny Mutha | `shreny-mutha.png` | Ace Your Placements |
| Kritika Singh | `kritika-singh.png` | Ace Your Placements |

`.execution-grid` switched from fixed `repeat(5, 1fr)` to `repeat(auto-fit, minmax(150px, 1fr))` so the row wraps cleanly with 7 cards instead of leaving an orphaned card in a half-filled second row.

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
