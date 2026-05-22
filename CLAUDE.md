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
**Deployed:** not yet (as of last session)

---

## File Structure

```
Aquila/
├── index.html              # Main landing page (primary file — most work here)
├── styles.css              # Shared design system — used by ALL pages
├── about.html
├── social-impact.html
├── case-studies.html
├── contact.html
├── first-chair.html        # New page (Corporates dropdown)
├── technical-training.html # New page (Corporates dropdown)
├── colleges.html           # New page (Institutions dropdown)
├── schools.html            # New page (Institutions dropdown)
├── Logo's/                 # ⚠️ Apostrophe in folder name — see path note below
│   ├── Clients/            # 14 logos
│   ├── Hiring Partners/    # 5 logos
│   └── Ecosystem Partners/ # 3 logos
├── Deck/                   # NOT committed — user excluded this intentionally
└── CLAUDE.md               # This file
```

**Navigation dropdown structure:**
- Corporates → First Chair, Technical Training
- Institutions → Colleges (Ace Your Placements), Schools (Hackathons by IndiSight)

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
| `.btn-primary` | Violet pill button with glow shadow |
| `.btn-outline` | Transparent bordered button |
| `.btn-sm` | Smaller button variant |
| `.fade-in` | Scroll-triggered fade-up (JS observer in each page) |
| `.fade-in.delay-1/2/3/4` | Staggered animation delays |
| `.u-card` | Reusable white card with hover lift |
| `.tag` | Lavender pill tag |
| `.page-header` | Standard interior page hero block |
| `.cta-band` | Dark space-blue CTA strip (shared across pages) |

### Section background alternation pattern

`var(--ivory)` → `var(--white)` → `var(--ivory)` — sections alternate. The dark case-studies section (`var(--space)`) breaks the pattern intentionally.

---

## `index.html` — Section Order

1. **Nav** — sticky, scrolled shadow, hamburger mobile, dropdowns on hover
2. **Hero** — interactive constellation canvas (JS), India SVG wireframe watermark, counter animation
3. **Impact Metrics Strip** — animated number counters (JS), 5 stats
4. **Three Pillars** — Corporates / Institutions / Social Impact cards
5. **Capability Areas** — 6-card grid
6. **Featured Programs** — 5 horizontal accent-bar cards
7. **Case Studies** — drag-free carousel with auto-slide, prev/next, dots (all JS)
8. **Logos Marquee** — 3 infinite-scroll ticker rows (real logos, CSS animation)
9. **Team** — 4 grouped categories of real people (CSS grid)
10. **Final CTA** — dark, email link
11. **Footer** — 4-col grid, social icons

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

**Logo path encoding:** The folder is named `Logo's` (apostrophe). In `src` attributes, use `Logo%27s/` and encode spaces as `%20`:
```html
<img src="Logo%27s/Clients/Bank%20Of%20Baroda.png">
```

**Hover behaviour:** grayscale 50% opacity → full colour on hover per logo. Whole row pauses on `.marquee-window:hover`.

**Logos on disk:**
- `Logo's/Clients/` — Bank Of Baroda, EY Logo, Final-Karle-Infra, GPL_Logo, Jai Hind Logo, Libratherm Logo, logo-ibs, Monster-Jobs-Logo-Vector, NTPC Logo, Perfetti_Van_Melle_logo, RIIM Pune, Trti logo, Tyson_Foods_logo, Voya_Financial_logo
- `Logo's/Hiring Partners/` — blue-dart-logo, comett-logo, Delhivery_Logo, Nippon Express Logo, Swiggy_logo (webp)
- `Logo's/Ecosystem Partners/` — Career Graph, Grow Wings, Megathil

⚠️ **Deployment note:** Some HTTP servers reject `%27` in paths. If logos break on deploy, rename `Logo's/` → `logos/` and update all `src` attributes accordingly.

---

## Team Section

**Class:** `.team`  
**Location in index.html:** after Logos Marquee, before Final CTA

Replaced a 4-card placeholder "founders" section. Four groups, each with a header line (`eyebrow label / Group Name ─────`):

### Group 1 — Founders (2-col grid, 96px avatars)
| Name | Role |
|------|------|
| Rewa Singh Deo | Founder — 25+ yrs talent leadership, mentors women entrepreneurs |
| Jayati Pardhy | Founder — global HR leader, strategic hiring & employer branding |

### Group 2 — Mentors & Advisors (3-col grid, 76px avatars)
| Name | Role | Background |
|------|------|-----------|
| Dr. Abhay Bhave | IAS Retd. | 45+ yrs, advises BHEL/GAIL/IOC |
| Anurag Kumar | Advisor | Ex-PepsiCo, 30+ yrs FMCG Asia/ME/Africa |
| Sonali Jha | Advisor | GenAI, product design, go-to-market, UX |
| Rohit Malhotra | Advisor | Ex-Nudge Foundation, Jal Jeevan Mission |
| Anita Sharma | Advisor | Ex-TOI/HT/Telegraph, 38 yrs media, rural women entrepreneurship |

### Group 3 — On-Ground Execution Partners (5-col compact grid, name only)
Subhashini Tripathi, Thendral Rajendran, Sharanya Ojha, Malavika Sharma, Srikanth Vavilla

### Group 4 — Sector Experts / Program Leads (2-col horizontal cards with bullet highlights)
| Name | Role | Key stats |
|------|------|-----------|
| Dr. Dilip Kumar | Veterinary & Livestock Development Expert | 36+ yrs govt livestock, 121 villages, dairy/poultry/goatery/piggery |
| Dr. S. N. Ojha | Fisheries Systems & Policy Expert, Former ICAR-CIFE | 40+ yrs fisheries, 50+ publications, T20/G20 contributor |

**Avatar colours:** gradient circles (no photos). Each person has a unique teal/violet/purple/space gradient. Avatars show initial letter.

---

## CSS Architecture Notes

- **Page-specific styles** live inside a `<style>` block in each HTML file's `<head>`
- **Shared styles** live in `styles.css` and are linked from every page
- The `<style>` block in `index.html` is large — organised with `/* ════ SECTION NAME ════ */` comments
- Responsive breakpoints: 1024px (tablet), 768px (mobile), 480px (small mobile)
- `prefers-reduced-motion` is handled in `styles.css` globally and per-section where needed

---

## JavaScript in `index.html`

All JS is inline at the bottom of `index.html` (no external JS file except `app.js` exists in root but isn't linked — ignore it):

1. **Nav scroll shadow** — adds `.scrolled` class on `window.scroll`
2. **Hamburger / mobile menu** — toggle `.open`, close on `Escape` or outside click
3. **Fade-in observer** — `IntersectionObserver` adds `.visible` to `.fade-in` elements
4. **Number counter** — animates metrics strip on scroll into view, eased cubic
5. **Carousel** — case studies; auto-slides every 5s, pauses on hover, responsive per-view count, prev/next/dots
6. **India wireframe reveal** — SVG stroke-dashoffset line-draw animation on load
7. **Hero constellation** — interactive canvas network; nodes drift, react to cursor proximity, draw labelled capability nodes

---

## What Still Needs Doing (Known Gaps)

- [ ] Real photos for team members (currently gradient-initial placeholders)
- [ ] `Logo's/` folder rename if deployment breaks logo paths
- [ ] `Deck/` folder — intentionally not committed, owner to decide if/when
- [ ] `case-studies.html`, `about.html`, `contact.html` — exist but content is thin
- [ ] Case study carousel cards — still placeholder text, no real client names
- [ ] `first-chair.html`, `technical-training.html`, `colleges.html`, `schools.html` — exist but content TBD
- [ ] `app.js` in root — empty/unused, can be deleted or wired up later
- [ ] No `favicon` set
- [ ] Email in footer (`hello@aquilaindia.com`) and phone (`+91 XXXXX`) are placeholder
