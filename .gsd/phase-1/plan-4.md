---
phase: 1
plan: 4
wave: 4
depends_on: ["phase-1/plan-3.md"]
files_modified:
  - src/content/ContentManager.js
  - src/content/sections/Hero.js
  - src/content/sections/About.js
  - src/content/sections/Menu.js
  - src/content/sections/Gallery.js
  - src/content/sections/Contact.js
  - src/ui/Interactions.js
  - src/styles/main.css
  - index.html
  - public/fonts/ (font files)
autonomous: true
user_setup: []
must_haves:
  truths:
    - "Each section has unique, polished content"
    - "Typography uses Space Grotesk + JetBrains Mono"
    - "Micro-interactions on all interactive elements"
    - "Images optimize loaded (WebP, lazy, blur placeholder)"
    - "Contact form validates and submits"
  artifacts:
    - "5 section content modules"
    - "Interaction system for hover/touch"
    - "Font loading optimized"
    - "Production-ready assets"
---

# Plan 1.4: Section Content, Polish & Production

## Objective
Create polished content for all 5 sections with premium typography, micro-interactions, optimized assets, and production-ready performance. Add the final layer of craft that makes it feel high-end.

## Context
Load for context:
- PROJECT_SPEC.md
- .gsd/phase-1/plan-3.md
- src/scroll/SectionManager.js (section definitions)
- src/ui/Navigation.js, src/ui/MenuItems.js

## Tasks

<task type="auto">
  <name>Build ContentManager and 5 Section Content Modules</name>
  <files>src/content/ContentManager.js, src/content/sections/*.js</files>
  <action>
    Create ContentManager coordinating all sections:
    - Hero: Large kinetic type "CRAFTED COFFEE" with scroll-reveal chars
      - Subtext: "Where precision meets passion"
      - 3D cup floats center, rotates on hover
      - Scroll indicator: animated mouse wheel
    - About: Split layout - text left, 3D bean journey right
      - Stats counter: "12 Years", "50+ Origins", "100% Traceable"
      - Interactive bean map: hover origin → highlight
    - Menu: 3D card grid, flip on hover showing details
      - Categories filter via MenuItems pills
      - Price animation: count up on scroll into view
      - "Chef's Recommendation" badge with pulse
    - Gallery: Masonry grid with 3D tilt on hover
      - Lightbox with 3D transition
      - Categories from MenuItems
      - Infinite scroll simulation
    - Contact: Map with 3D pin, form with floating labels
      - Hours accordion
      - Booking widget (mock)
      - Social proof: "4.9★ 2.3k reviews"
    AVOID: Placeholder content - write real copy, use real dimensions
  </action>
  <verify>Each section renders complete content, animations trigger on scroll</verify>
  <done>All 5 sections have production-quality content</done>
</task>

<task type="auto">
  <name>Implement Premium Typography System</name>
  <files>src/styles/main.css, public/fonts/</files>
  <action>
    Setup fonts:
    - Download Space Grotesk (variable: wght 300-700)
    - Download JetBrains Mono (variable: wght 400-700)
    - Store in public/fonts/ as WOFF2
    - @font-face with font-display: swap
    - CSS variables: --font-display, --font-mono
    - Fluid type scale using clamp():
      --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)
      --text-sm: clamp(0.875rem, 0.8rem + 0.375vw, 1rem)
      --text-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)
      --text-lg: clamp(1.125rem, 1rem + 0.625vw, 1.25rem)
      --text-xl: clamp(1.5rem, 1.25rem + 1.25vw, 2rem)
      --text-2xl: clamp(2rem, 1.5rem + 2.5vw, 3rem)
      --text-3xl: clamp(3rem, 2rem + 5vw, 5rem)
    - Variable font settings for optical sizing
    AVOID: Google Fonts CDN - self-host for performance/privacy
  </action>
  <verify>Fonts load without layout shift, variable weights work</verify>
  <done>Typography system complete, self-hosted, performant</done>
</task>

<task type="auto">
  <name>Build Micro-Interaction System</name>
  <files>src/ui/Interactions.js</files>
  <action>
    Create Interactions class for consistent micro-interactions:
    - Magnetic buttons: follow cursor within radius, spring back
    - Ripple effect on click (CSS-based, no canvas)
    - 3D card tilt: rotateX/rotateY based on mouse position
    - Text scramble effect on hover (for headings)
    - Focus rings: visible, branded, accessible
    - Touch equivalents: tap for hover, long-press for context
    - Staggered entrance: GSAP stagger for lists/grids
    - Scroll reveal: IntersectionObserver + GSAP
    - Reduced motion: all animations instant
    AVOID: JS-heavy animations - prefer CSS transitions + GSAP only for complex
  </action>
  <verify>Buttons feel alive, cards tilt, text scrambles, focus visible</verify>
  <done>Interactions.js provides reusable interaction primitives</done>
</task>

<task type="auto">
  <name>Optimize Assets & Loading Strategy</name>
  <files>public/, src/main.js, vite.config.js</files>
  <action>
    Asset optimization:
    - Images: WebP + AVIF via Vite plugin, multiple sizes
    - Lazy load: loading="lazy" + IntersectionObserver for JS-loaded
    - Blur placeholders: base64 tiny blur for LQIP
    - Preload critical: hero cup model, fonts, first section images
    - Service worker: Workbox for offline caching (optional)
    - Three.js: DRACO compression for GLTF if used
    - Code split: dynamic import for Gallery lightbox, Contact map
    - Bundle analysis: rollup-plugin-visualizer in build
    AVOID: Over-optimizing early - measure first, optimize bottlenecks
  </action>
  <verify>Lighthouse: Performance > 90, LCP < 2.5s, CLS < 0.1</verify>
  <done>Assets optimized, loading strategy implemented</done>
</task>

<task type="auto">
  <name>Final Polish: Accessibility, SEO, Meta</name>
  <files>index.html, src/main.js, src/styles/main.css</files>
  <action>
    Final polish:
    - Semantic HTML: proper heading hierarchy, landmarks
    - ARIA: labels for 3D canvas (role="img", aria-label), live regions for section changes
    - Meta: Open Graph, Twitter Cards, JSON-LD for LocalBusiness
    - Sitemap.xml, robots.txt generation
    - Reduced motion: @media (prefers-reduced-motion) disables ALL animation
    - High contrast: @media (prefers-contrast) increases contrast
    - Focus management: skip link, focus trap in modals
    - Error boundaries: graceful 3D fallback (static image)
    - Console: branded welcome message, no errors
    AVOID: Accessibility as afterthought - test with screen reader
  </action>
  <verify>axe-core: 0 violations, Lighthouse Accessibility > 95</verify>
  <done>Production-ready: accessible, SEO-optimized, error-free</done>
</task>

<task type="auto">
  <name>Build Verification & Deploy Config</name>
  <files>vite.config.js, package.json, .github/workflows/deploy.yml</files>
  <action>
    Production readiness:
    - Build script: npm run build → dist/
    - Preview script: npm run preview tests production build locally
    - GitHub Action: build + deploy to GitHub Pages / Netlify / Vercel
    - Environment: NODE_ENV=production
    - Cache headers: immutable for hashed assets
    - Compression: gzip + brotli via hosting
    - Analytics: privacy-friendly (Plausible/Umami) - optional
    - Error tracking: Sentry DSN via env var - optional
    AVOID: Complex CI - simple deploy is fine for static site
  </action>
  <verify>npm run build && npm run preview works, deploy succeeds</verify>
  <done>Deploy pipeline configured, production build verified</done>
</task>

## Verification
After all tasks, verify:
- [ ] Lighthouse: Performance > 90, Accessibility > 95, Best Practices > 90, SEO > 90
- [ ] All 5 sections complete with polished content
- [ ] Typography loads without CLS
- [ ] Micro-interactions feel premium
- [ ] Reduced motion works completely
- [ ] Mobile: touch friendly, performant
- [ ] Deploy works, site live
- [ ] No console errors in production

## Success Criteria
- [ ] All tasks verified
- [ ] Site feels like a 2026 award-winning experience
- [ ] Codebase maintainable for future enhancements