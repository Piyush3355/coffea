---
phase: 1
plan: 1
wave: 1
depends_on: []
files_modified:
  - package.json
  - vite.config.js
  - index.html
  - src/main.js
  - src/styles/main.css
  - src/styles/variables.css
autonomous: true
user_setup: []
must_haves:
  truths:
    - "Vite dev server runs without errors"
    - "Three.js and GSAP installed and importable"
    - "Basic HTML structure with canvas container exists"
  artifacts:
    - "package.json with all dependencies"
    - "vite.config.js configured for production build"
    - "index.html with proper meta tags and canvas"
    - "CSS variables for theming system"
---

# Plan 1.1: Project Foundation & Build Setup

## Objective
Set up the complete project foundation with Vite, Three.js, GSAP, and a minimal CSS architecture. This establishes the build pipeline and development environment.

## Context
Load for context:
- PROJECT_SPEC.md

## Tasks

<task type="auto">
  <name>Initialize package.json with dependencies</name>
  <files>package.json</files>
  <action>
    Create package.json with:
    - name: "cafe-3d-scroll"
    - type: "module"
    - scripts: dev, build, preview
    - dependencies: three@latest, gsap@latest
    - devDependencies: vite@latest, @vitejs/plugin-legacy@latest
    AVOID: Adding unnecessary frameworks (React, Vue) - keep vanilla for performance
  </action>
  <verify>npm install completes without errors</verify>
  <done>package.json exists with all deps, node_modules created</done>
</task>

<task type="auto">
  <name>Configure Vite for optimal 3D builds</name>
  <files>vite.config.js</files>
  <action>
    Create vite.config.js with:
    - ES modules output
    - Legacy plugin for broader browser support
    - Three.js externalization consideration
    - CSS code splitting
    - Build target: es2022
    - Minification: esbuild
    AVOID: Over-configuring - Vite defaults are excellent
  </action>
  <verify>npm run build completes successfully</verify>
  <done>vite.config.js exists, production build works</done>
</task>

<task type="auto">
  <name>Create HTML shell with semantic structure</name>
  <files>index.html</files>
  <action>
    Create index.html with:
    - Proper meta tags (viewport, theme-color, description)
    - Canvas container (#webgl-canvas) for Three.js
    - Semantic sections: header, main>section#hero, section#about, section#menu, section#gallery, section#contact, footer
    - Preconnect to fonts.googleapis.com
    - Link to main.css
    - Script type=module src="./src/main.js"
    AVOID: Inline styles/scripts - keep separation of concerns
  </action>
  <verify>npm run dev serves index.html without console errors</verify>
  <done>index.html loads in browser with correct structure</done>
</task>

<task type="auto">
  <name>Establish CSS architecture with variables</name>
  <files>src/styles/variables.css, src/styles/main.css</files>
  <action>
    Create variables.css with:
    - Color system: --bg, --fg, --muted, --accent (coffee), --card, --border
    - Typography: --font-sans (Space Grotesk), --font-mono (JetBrains Mono)
    - Spacing scale: --space-1 through --space-8
    - Z-index layers: --z-bg, --z-content, --z-nav, --z-modal
    - Transitions: --transition-fast, --transition-base, --transition-slow
    - Breakpoints: --bp-sm, --bp-md, --bp-lg, --bp-xl
    - Reduced motion media query variable
    
    Create main.css with:
    - CSS reset (minimal, modern)
    - Import variables.css
    - Base typography
    - Utility classes for layout (container, grid, flex)
    - Scroll snap for sections
    - Reduced motion overrides
    AVOID: Component-specific styles here - keep foundation only
  </action>
  <verify>No CSS errors in browser devtools</verify>
  <done>Both CSS files exist, variables work in browser inspector</done>
</task>

<task type="auto">
  <name>Create main.js entry point with module imports</name>
  <files>src/main.js</files>
  <action>
    Create src/main.js with:
    - Import './styles/main.css'
    - Import Three.js and GSAP
    - Initialize empty Three.js scene, camera, renderer
    - Initialize GSAP ScrollTrigger
    - Basic resize handler
    - Animation loop stub
    - Console log confirming initialization
    AVOID: Putting all 3D logic here - will be modularized in next plans
  </action>
  <verify>npm run dev shows "Cafe 3D initialized" in console, no errors</verify>
  <done>main.js runs without errors, Three.js and GSAP loaded</done>
</task>

## Verification
After all tasks, verify:
- [ ] npm run dev starts dev server on localhost:5173
- [ ] npm run build creates dist/ folder with optimized assets
- [ ] Browser console shows no errors
- [ ] Three.js and GSAP are globally accessible

## Success Criteria
- [ ] All tasks verified
- [ ] Dev server runs hot-reload correctly
- [ ] Production build outputs to dist/