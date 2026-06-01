# Content Request — What I Need From You

Before writing any code, I need real content to avoid building a site full of guesses.
Here's exactly what to provide and where to put it.

---

## 🔴 Priority 1: Must-Have (Blocks Implementation)

### 1. Social Media Links & Content Export

I **cannot scrape** Facebook, Instagram, or LinkedIn directly — these platforms block automated access and require authentication. Here's what I need you to do:

**Facebook Page:**
- [ ] Provide the page URL
- [ ] Export the "About" section text (copy-paste into a `.txt` file)
- [ ] Copy-paste 10–15 recent post captions that describe projects/events (into `content/social-media/facebook/posts.txt`)
- [ ] Screenshot or copy the page's "Intro" / description

**Instagram Page:**
- [ ] Provide the page URL
- [ ] Copy the bio text
- [ ] Copy 10–15 recent post captions (into `content/social-media/instagram/posts.txt`)
- [ ] List any Highlight names (e.g., "Projects", "Events", "Board 2025")

**LinkedIn Page:**
- [ ] Provide the page URL
- [ ] Copy the "About" section text
- [ ] Copy any recent post content relevant to projects

> **How to export Facebook posts easily:** Go to your page → Posts tab → For each relevant post, click the "..." menu → "Copy link" or simply select the text and paste it into a text file. Alternatively, use Facebook's "Download Your Information" tool (Settings → Your Information → Download) and export Posts in JSON format.

---

### 2. JCI Brand Guidelines (2025/2026 New Logo)

- [ ] Place the PDF in `content/branding/`
- I found it referenced on Scribd and jci.cc but can't access the full document. I need it to confirm:
  - Exact color codes (primary blue, secondary colors)
  - New logo usage rules & clear space requirements
  - Approved typography (font families)
  - Do's and don'ts for local chapter branding

---

### 3. JCI El Alia Logo

- [ ] Place in `content/images/logo-jci-el-alia.png`
- Ideally: transparent PNG, high resolution (512px+ width)
- If you have the new 2025/2026 version generated from jci.cc/logo-generator, that's perfect

---

### 4. Annual Reports (2021–2025)

- [ ] Place in `content/annual-reports/` as PDFs
- From these I'll extract:
  - Chapter founding year
  - Board members / presidents by year
  - Project names, descriptions, dates, and impact numbers
  - Membership growth stats
  - Partner organizations
  - Any awards or recognitions

---

## 🟡 Priority 2: Important (Improves Quality)

### 5. Hero & Section Photos

- [ ] 1 hero background image (landscape, high-res, ideally showing El Alia community, members in action, or a JCI event)
- [ ] 1 "About Us" section photo (team photo or chapter meeting)
- [ ] 3–6 project photos (one per major project/initiative)
- [ ] Board member headshots (if you want a "Our Team" section)

Place all in `content/images/` using descriptive names.

---

### 6. Specific Text Answers

Please answer these directly (paste into `content/chapter-info.txt`):

- [ ] What year was JCI El Alia founded?
- [ ] How many active members currently?
- [ ] Who is the current (2025) Local President?
- [ ] What are your top 3–5 flagship projects? (name + one-sentence description each)
- [ ] Do you have any twinning agreements with other chapters? Which ones?
- [ ] What is your chapter's tagline or slogan (if any)?
- [ ] Contact email for the chapter?
- [ ] Physical meeting location / address?

---

## 🟢 Priority 3: Nice-to-Have (Polish & Extras)

### 7. Testimonials
- [ ] 2–3 short quotes from members about their JCI El Alia experience

### 8. Partner Logos
- [ ] Logos of organizations you've partnered with (municipality, NGOs, sponsors)

### 9. Event Calendar
- [ ] Upcoming events for 2025/2026 (if you want a "What's Next" section)

### 10. Video Content
- [ ] Any YouTube/social video links for embedding

---

## 📁 Final Directory Structure

Once you've added everything, the folder should look like:

```
content/
├── chapter-info.txt              ← Your answers to section 6
├── branding/
│   └── jci-brand-guidelines.pdf  ← The 2025/2026 manual
├── annual-reports/
│   ├── annual-report-2021.pdf
│   ├── annual-report-2022.pdf
│   ├── annual-report-2023.pdf
│   ├── annual-report-2024.pdf
│   └── annual-report-2025.pdf
├── images/
│   ├── logo-jci-el-alia.png
│   ├── hero-bg.jpg
│   ├── about-section.jpg
│   ├── project-green-impact.jpg
│   ├── project-education.jpg
│   ├── project-health.jpg
│   └── ...
└── social-media/
    ├── facebook/
    │   ├── about.txt
    │   └── posts.txt
    ├── instagram/
    │   ├── bio.txt
    │   └── posts.txt
    └── linkedin/
        ├── about.txt
        └── posts.txt
```

---

## Why I Can't Scrape Social Media Myself

- **Facebook/Instagram:** Require login, use dynamic JavaScript rendering, and actively block bots. Meta's robots.txt and terms of service prohibit scraping.
- **LinkedIn:** Same situation — authentication-walled and legally protected.
- **What I CAN do:** Once you paste the text content into files in this directory, I can read, parse, and structure it perfectly for the website.

---

## Next Steps

1. You provide the content above (even partial is fine — we can iterate).
2. I'll parse everything and update the spec with real data.
3. Then I build the site section by section with accurate content.

No guesswork. No placeholder text that needs replacing later.
