---
phase: 1
plan: 3
wave: 3
depends_on: ["phase-1/plan-2.md"]
files_modified:
  - src/scroll/ScrollController.js
  - src/scroll/SectionManager.js
  - src/ui/Navigation.js
  - src/ui/MenuItems.js
  - src/ui/SectionTransitions.js
  - src/main.js
  - src/styles/main.css
  - index.html
autonomous: true
user_setup: []
must_haves:
  truths:
    - "Scroll position drives 3D camera and object states"
    - "Navigation transforms smoothly between sections"
    - "Custom menu items change based on scroll position"
    - "Section transitions are seamless with 3D morphing"
    - "Reduced motion disables all scroll animations"
  artifacts:
    - "ScrollController with GSAP ScrollTrigger integration"
    - "SectionManager handling 5 sections"
    - "Dynamic Navigation component"
    - "CSS for navigation states and transitions"
---

# Plan 1.3: Scroll System & Dynamic UI

## Objective
Implement the scroll-driven animation system connecting GSAP ScrollTrigger to Three.js, create the dynamic top navigation that changes custom items per section, and build seamless section transitions with 3D morphing effects.

## Context
Load for context:
- PROJECT_SPEC.md
- .gsd/phase-1/plan-2.md
- src/main.js (current 3D integration)
- src/three/objects/* (all 3D objects)

## Tasks

<task type="auto">
  <name>Build ScrollController with GSAP ScrollTrigger</name>
  <files>src/scroll/ScrollController.js</files>
  <action>
    Create ScrollController class:
    - Initialize GSAP ScrollTrigger with smoothScroller: "#smooth-wrapper"
    - Create scroll proxy for locomotive-scroll style smooth scrolling (or native CSS scroll-snap)
    - Expose: scrollProgress (0-1), scrollVelocity, currentSection, direction
    - Methods: onSectionChange(callback), onProgress(callback), getVelocity()
    - Sync Three.js camera position to scroll progress
    - Handle reduced-motion: disable smooth scroll, use instant jumps
    - Cleanup: kill all ScrollTriggers on destroy
    AVOID: Locomotive Scroll library - adds 15KB, use native CSS scroll-snap + GSAP
  </action>
  <verify>Scroll progress logs 0-1 smoothly, velocity tracks correctly, sections detected</verify>
  <done>ScrollController exports, integrates with GSAP, provides clean API</done>
</task>

<task type="auto">
  <name>Create SectionManager for 5-section flow</name>
  <files>src/scroll/SectionManager.js</files>
  <action>
    Create SectionManager class:
    - Define sections: hero, about, menu, gallery, contact
    - Each section: { id, name, start, end, 3DState, uiState }
    - 3DState: cameraPos, cameraTarget, environmentMood, beanDensity, steamIntensity
    - uiState: navVariant, menuItems, backgroundColor
    - Method: getSectionAt(progress) returns current section data
    - Method: lerpSectionState(from, to, t) for smooth transitions
    - Events: onSectionEnter, onSectionLeave, onTransitionProgress
    AVOID: Hardcoding values - use config object for easy tuning
  </action>
  <verify>Section states change smoothly at boundaries, 3D state interpolates correctly</verify>
  <done>SectionManager drives both 3D and UI state changes</done>
</task>

<task type="auto">
  <name>Build Dynamic Navigation component</name>
  <files>src/ui/Navigation.js, src/styles/main.css (nav styles)</files>
  <action>
    Create Navigation class:
    - Minimalist header: logo, 3-4 nav links, time-based greeting
    - Glassmorphism: backdrop-filter: blur(20px), semi-transparent bg
    - State variants per section:
      * hero: transparent, logo only
      * about: minimal, "Our Story" highlighted
      * menu: shows 3 featured items as pills
      * gallery: shows filter tabs
      * contact: shows "Visit Us" CTA
    - Smooth transitions: 400ms cubic-bezier(0.4, 0, 0.2, 1)
    - Scroll hide/show: hides on scroll down, shows on scroll up
    - Reduced motion: instant state changes
    - Keyboard accessible: focus states, ARIA labels
    AVOID: Fixed positioning conflicts - use sticky with proper z-index
  </action>
  <verify>Navigation morphs between states smoothly, items change per section</verify>
  <done>Navigation.js works, CSS handles all visual states</done>
</task>

<task type="auto">
  <name>Create Custom Menu Items system</name>
<files>src/ui/MenuItems.js</files>
  <action>
    Create MenuItems class for dynamic top-bar items:
    - Data-driven: array of item configs per section/time
    - Hero: ["Espresso", "Latte", "Cold Brew"] - rotating
    - About: ["Our Beans", "Roast Process", "Sustainability"]
    - Menu: Full category pills: ["Espresso", "Filter", "Milk", "Specials"]
    - Gallery: Filter tags: ["Interior", "Drinks", "Food", "Events"]
    - Contact: ["Location", "Hours", "Book Table", "Private Events"]
    - Render as horizontal scrollable pills with active state
    - GSAP stagger animation on section enter
    - Click handlers for filtering/scrolling
    AVOID: Hardcoded HTML - render from JS data for flexibility
  </action>
  <verify>Items change per section, animate in/out, clickable</verify>
  <done>MenuItems.js renders dynamic items, integrates with SectionManager</done>
</task>

<task type="auto">
  <name>Implement Section Transitions with 3D Morphing</name>
  <files>src/ui/SectionTransitions.js</files>
  <action>
    Create SectionTransitions class:
    - Listen to SectionManager transition events
    - Camera flight: GSAP to new position/lookAt over 1.5s
    - Environment morph: lighting color, fog density, background
    - CoffeeBeans: density, float amplitude, color temperature shift
    - SteamParticles: intensity, color, velocity multiplier
    - CupModel: position, rotation, material properties
    - Text/content: GSAP ScrollTrigger pin + reveal per section
    - Parallax layers: background elements move at different speeds
    - Transition timeline: master GSAP timeline per section pair
    AVOID: Jarring cuts - every property lerps smoothly
  </action>
  <verify>Scrolling between sections feels like flying through 3D space</verify>
  <done>Transitions are cinematic, performant, and reversible</done>
</task>

<task type="auto">
  <name>Integrate Scroll System into main.js</name>
  <files>src/main.js, index.html</files>
  <action>
    Refactor main.js to:
    - Initialize ScrollController
    - Initialize SectionManager
    - Initialize Navigation, MenuItems, SectionTransitions
    - Connect ScrollController -> SectionManager -> 3D objects -> UI
    - Setup scroll event flow: scroll -> progress -> section -> 3D state + UI state
    - Update index.html with proper section structure and data attributes
    - Add #smooth-wrapper for scroll container
    AVOID: Circular dependencies - one-way data flow: scroll -> state -> render
  </action>
  <verify>Full scroll experience works: 3D morphs, nav changes, items update</verify>
  <done>Complete scroll-driven 3D experience functional</done>
</task>

## Verification
After all tasks, verify:
- [ ] Smooth 60fps scrolling through all 5 sections
- [ ] Navigation transforms correctly per section
- [ ] Custom items change with smooth animations
- [ ] 3D scene morphs: camera, lighting, particles, beans
- [ ] Reduced motion: instant transitions, no parallax
- [ ] Mobile: touch scroll works, performance acceptable
- [ ] No console errors or warnings

## Success Criteria
- [ ] All tasks verified
- [ ] Scroll experience feels premium and cohesive
- [ ] Code maintains separation: scroll logic separate from 3D/UI