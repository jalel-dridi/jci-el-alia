# JCI El Alia Landing Page — Implementation Specification

## 1. Project Overview

**Client:** JCI El Alia (Jeune Chambre Internationale El Alia)  
**Location:** El Alia, Bizerte Governorate, Northern Tunisia (population ~18,400)  
**Type:** Single-page responsive landing site  
**Hosting target:** GitHub Pages (static, no build step)  
**Steering reference:** `.kiro/steering/branding.md`

---

## 2. Research Summary

### 2.1 About El Alia
El Alia is a commune in the Bizerte Governorate, the northernmost region of Tunisia. Known historically as ancient Uzalis (Roman-era), the town sits between the Mediterranean coast and Lake Ichkeul (UNESCO World Heritage Site). It has a population of approximately 18,410 (2014 census) and is part of a governorate of over 600,000 people.

### 2.2 About JCI Tunisia
- Founded in the 1960s; JCI Tunisia is one of the largest national organizations in the Africa & Middle East region.
- Comprises **113 local chapters** across the country — ranked 1st in Africa/Middle East and 8th globally.
- Core mission: developing young leaders aged 18–40 through community action, individual development, business/entrepreneurship, and international cooperation.
- Active in hosting international events (e.g., JCI EXchange 2025 in Sousse, JCI World Congress participation).

### 2.3 JCI El Alia — Contextual Profile
Direct web presence for JCI El Alia is limited (no dedicated website found; likely operates via Facebook page and JCI Tunisia national network). Based on the standard structure of Tunisian JCI local chapters and regional context, the chapter likely:
- Was established as part of JCI Tunisia's expansion across Bizerte Governorate.
- Focuses on youth empowerment in a semi-rural Mediterranean community.
- Runs projects aligned with JCI's four areas of opportunity.
- Collaborates with neighboring chapters (JCI Bizerte, JCI Ras Jebel, JCI Menzel Bourguiba).
- Participates in national campaigns: Tunisia Green Impact Day, health caravans, educational workshops.

### 2.4 Likely Projects & Activities (to be confirmed/refined)
| Project Theme | Probable Activity |
|---|---|
| Environment | Beach/lake cleanups near Ichkeul, tree planting, Green Impact Day |
| Education | School supply drives, psychological support for primary students |
| Health | Blood donation campaigns, health awareness caravans |
| Entrepreneurship | Youth entrepreneurship workshops, local market support |
| International | Twinning with other LOMs, participation in JCI EXchange |

---

## 3. Information Architecture

```
┌─────────────────────────────────────────────────┐
│  STICKY NAVBAR (blur backdrop)                  │
│  Logo | Home | Who We Are | Our Impact | Join   │
├─────────────────────────────────────────────────┤
│  HERO SECTION                                   │
│  Full-width bg image + overlay                  │
│  Headline + Subtext + CTA Button                │
├─────────────────────────────────────────────────┤
│  ABOUT / WHO WE ARE                             │
│  Brief intro + JCI El Alia story                │
├─────────────────────────────────────────────────┤
│  CORE PILLARS (4-column card grid)              │
│  Individual Dev | Community | International |   │
│  Business & Entrepreneurship                    │
├─────────────────────────────────────────────────┤
│  PROJECT SHOWCASE / OUR IMPACT                  │
│  Card grid (3 cols desktop, 1 col mobile)       │
│  Each: image + badge + title + narrative +      │
│  impact metric                                  │
├─────────────────────────────────────────────────┤
│  MEMBERSHIP / JOIN US                           │
│  Benefits list + Intake form (Formspree)        │
├─────────────────────────────────────────────────┤
│  FOOTER (3-column dark)                         │
│  Chapter info | Quick links | Social icons      │
└─────────────────────────────────────────────────┘
```

---

## 4. Technical Stack

| Layer | Choice | Source |
|---|---|---|
| CSS Framework | Tailwind CSS 3.x | CDN (`<script src="https://cdn.tailwindcss.com">`) |
| Icons | Font Awesome 6 | CDN |
| Fonts | Inter (headings) + Open Sans (body) | Google Fonts CDN |
| Form handler | Formspree (free tier) | AJAX POST |
| Smooth scroll | Native CSS `scroll-behavior: smooth` | Built-in |
| Animations | Tailwind `transition`, `transform`, `hover:` utilities | Built-in |
| Hosting | GitHub Pages | Static HTML |

---

## 5. Design Tokens

```
Primary Blue:    #0096D6
Dark Charcoal:   #1F2937
Light Grey BG:   #F9FAFB
White:           #FFFFFF
Accent Gold:     #F59E0B (for badges/highlights)
Success Green:   #10B981 (for impact metrics)
```

---

## 6. Implementation Tasks (Step-by-Step)

### Phase 1: Project Setup
- [ ] **Task 1.1** — Create `index.html` with HTML5 boilerplate, meta tags (charset, viewport, description, OG tags for social sharing).
- [ ] **Task 1.2** — Add CDN links: Tailwind CSS, Google Fonts (Inter + Open Sans), Font Awesome 6.
- [ ] **Task 1.3** — Configure Tailwind via inline `<script>` to extend theme with custom colors (#0096D6, #1F2937, #F9FAFB, #F59E0B).

### Phase 2: Sticky Navbar
- [ ] **Task 2.1** — Build fixed-top navbar with `backdrop-blur-md`, `bg-white/80`, and `shadow-sm`.
- [ ] **Task 2.2** — Add JCI El Alia logo/text branding (left), navigation links (right): Home, Who We Are, Our Impact, Join Us.
- [ ] **Task 2.3** — Implement mobile hamburger menu (hidden on `md:` and above) with toggle via minimal vanilla JS.
- [ ] **Task 2.4** — Add smooth-scroll behavior via `scroll-behavior: smooth` on `<html>` and anchor `href="#section-id"`.

### Phase 3: Hero Section
- [ ] **Task 3.1** — Full-viewport-height section with placeholder background image (gradient fallback).
- [ ] **Task 3.2** — Semi-transparent dark/blue overlay (`bg-gradient-to-r from-gray-900/70 to-blue-900/50`).
- [ ] **Task 3.3** — Headline: "Developing Leaders for a Changing World in El Alia", subtext about JCI mission, CTA button "Become an Active Citizen".
- [ ] **Task 3.4** — Responsive typography scaling (`text-4xl md:text-5xl lg:text-6xl`).

### Phase 4: About / Who We Are
- [ ] **Task 4.1** — Two-column layout (image left, text right on desktop; stacked on mobile).
- [ ] **Task 4.2** — Write contextualized copy: chapter founding story, connection to Bizerte Governorate, JCI Tunisia affiliation.
- [ ] **Task 4.3** — Include key stats (members count, year founded, projects delivered).

### Phase 5: Core Pillars Section
- [ ] **Task 5.1** — Section with light grey background (`bg-gray-50`).
- [ ] **Task 5.2** — 4-column responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`).
- [ ] **Task 5.3** — Each card: icon (Font Awesome), title, short description, hover transform (`hover:scale-105 hover:shadow-lg`).
- [ ] **Task 5.4** — Content for 4 pillars: Individual Development, Community Action, International Cooperation, Business & Entrepreneurship.

### Phase 6: Project Showcase (Our Impact)
- [ ] **Task 6.1** — 3-column card grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- [ ] **Task 6.2** — Each card structure: image container (with placeholder/gradient), colored badge (category), title, narrative paragraph, impact metric with icon.
- [ ] **Task 6.3** — Populate with 4–6 project cards based on research:
  - Tunisia Green Impact Day (environment)
  - School Children Development Initiative (education)
  - Health Caravan / Blood Donation (health)
  - Youth Entrepreneurship Workshop (business)
  - Inter-chapter Twinning Program (international)
  - Lake Ichkeul Cleanup Campaign (environment)
- [ ] **Task 6.4** — Hover animations on cards (lift + shadow).

### Phase 7: Membership / Join Us Section
- [ ] **Task 7.1** — Split layout: left side = benefits/eligibility info, right side = form.
- [ ] **Task 7.2** — Benefits list with checkmark icons (ages 18–40, free training, network access, leadership opportunities).
- [ ] **Task 7.3** — Styled form fields: Full Name, Email, Phone, Age, Motivation (textarea).
- [ ] **Task 7.4** — Form action pointed to Formspree endpoint (placeholder URL to be replaced).
- [ ] **Task 7.5** — Submit button with primary blue styling and hover state.

### Phase 8: Footer
- [ ] **Task 8.1** — Dark background (`bg-gray-900 text-gray-300`), 3-column grid.
- [ ] **Task 8.2** — Column 1: JCI El Alia logo, address (El Alia, Bizerte, Tunisia), contact email.
- [ ] **Task 8.3** — Column 2: Quick links (Home, About, Projects, Join, JCI Tunisia, JCI International).
- [ ] **Task 8.4** — Column 3: Social media icons (Facebook, Instagram, LinkedIn) with hover color transitions.
- [ ] **Task 8.5** — Bottom bar: copyright notice + "Part of JCI Tunisia & JCI International" attribution.

### Phase 9: Responsiveness & Polish
- [ ] **Task 9.1** — Test all breakpoints: mobile (default), `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px).
- [ ] **Task 9.2** — Ensure navbar collapses properly on mobile.
- [ ] **Task 9.3** — Verify card grids stack correctly.
- [ ] **Task 9.4** — Add `scroll-margin-top` to sections to account for sticky navbar height.
- [ ] **Task 9.5** — Add subtle entrance animations (optional: Intersection Observer for scroll-triggered fade-ins).

### Phase 10: Accessibility & SEO
- [ ] **Task 10.1** — Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`, proper heading hierarchy.
- [ ] **Task 10.2** — Alt text on all images, aria-labels on icon-only buttons.
- [ ] **Task 10.3** — Meta description, OG tags (title, description, image) for social sharing.
- [ ] **Task 10.4** — Favicon placeholder.
- [ ] **Task 10.5** — Language attribute `lang="en"` (or `lang="fr"` if French version).

### Phase 11: Deployment Readiness
- [ ] **Task 11.1** — Ensure all paths are relative (no absolute local paths).
- [ ] **Task 11.2** — Add a `README.md` with deployment instructions for GitHub Pages.
- [ ] **Task 11.3** — Create placeholder `images/` directory structure.
- [ ] **Task 11.4** — Final code review: clean comments, consistent indentation, no dead code.

---

## 7. File Structure

```
/
├── index.html          (main landing page)
├── README.md           (project documentation)
├── images/
│   ├── hero-bg.jpg     (placeholder)
│   ├── logo.png        (JCI El Alia logo)
│   ├── project-1.jpg   (project card images)
│   ├── project-2.jpg
│   └── ...
└── .kiro/
    └── steering/
        └── branding.md (design constraints)
```

---

## 8. Content Drafts (Key Sections)

### Hero Headline
> "Developing Leaders for a Changing World in El Alia"

### Hero Subtext
> "JCI El Alia empowers young citizens aged 18–40 to create positive change in our community through leadership, action, and international cooperation."

### About Section Draft
> "Founded as part of JCI Tunisia's network of 113 local chapters, JCI El Alia brings the global JCI mission to the heart of Bizerte Governorate. Our members are young professionals, students, and entrepreneurs united by a shared belief: that active citizenship transforms communities. From the shores of the Mediterranean to the wetlands of Ichkeul, we develop leaders who drive lasting impact in El Alia and beyond."

### Pillar Descriptions
1. **Individual Development** — "Build confidence, communication, and leadership skills through hands-on training programs designed for tomorrow's leaders."
2. **Community Action** — "Drive meaningful change in El Alia through environmental cleanups, health campaigns, and educational initiatives that uplift our neighbors."
3. **International Cooperation** — "Connect with JCI chapters worldwide through twinning programs, cultural exchanges, and collaborative projects that broaden horizons."
4. **Business & Entrepreneurship** — "Support local youth entrepreneurship through workshops, mentoring, and networking events that fuel economic growth in our region."

---

## 9. Content-First Approach (UPDATED)

**Before any code is written**, real content must be gathered. See `CONTENT-REQUEST.md` for the full checklist.

### Blocking Dependencies:
1. Social media content export (Facebook, Instagram, LinkedIn) — manual copy-paste required
2. JCI Brand Guidelines 2025/2026 PDF (new logo, exact colors, typography)
3. JCI El Alia logo file (new branding version)
4. Annual reports 2021–2025 (for project data, stats, board info)

### Content Directory:
All raw materials go into `content/` — see `CONTENT-REQUEST.md` for exact structure.

### Revised Workflow:
1. **Phase 0 (NOW):** Collect real content from the chapter owner.
2. **Phase 0.5:** Parse content, extract project data, confirm branding colors/fonts against official guidelines.
3. **Phase 1–11:** Build the site with verified, accurate content.

---

*Document generated based on web research conducted on May 18, 2026. Updated to reflect content-first methodology. Project details will be sourced from annual reports and social media exports rather than assumptions.*
