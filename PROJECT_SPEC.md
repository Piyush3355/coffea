# Cafe Website - High-End 3D Scroll Experience

## Vision
A minimalist, premium cafe website featuring cutting-edge 3D scroll animations trending in 2026. Smooth scroll-triggered 3D transitions, dynamic top navigation with changing custom items, and an immersive visual experience that feels like a physical space.

## Core Requirements

### 1. 3D Scroll Experience
- Three.js powered 3D scene (coffee beans, cups, steam particles, ambient environment)
- GSAP ScrollTrigger for scroll-linked animations
- Smooth parallax layers with depth
- Camera moves through 3D space as user scrolls
- Performance: 60fps on desktop, graceful degradation on mobile

### 2. Dynamic Top Navigation
- Minimalist header that transforms on scroll
- Custom items that change based on scroll position (menu sections, time of day, featured items)
- Glassmorphism/frosted glass effect
- Smooth transitions between states

### 3. Scroll-Triggered Section Changes
- Hero → About → Menu → Gallery → Contact flow
- Each section has unique 3D environment
- Seamless transitions between sections
- Text/content reveals synchronized with 3D animations

### 4. Custom Interactive Items
- Floating 3D coffee beans that react to cursor
- Steam particles following scroll velocity
- Cup models that rotate/transform on hover
- Menu items as 3D cards with flip animations

### 5. Minimalist High-End UI
- Monospace typography (Space Grotesk / JetBrains Mono)
- Restrained color palette: warm neutrals, coffee browns, cream
- Micro-interactions on every element
- Reduced motion support

## Technical Stack
- **Framework:** Vite + Vanilla JS (lightweight, no framework overhead)
- **3D:** Three.js (r160+)
- **Animation:** GSAP + ScrollTrigger
- **Styling:** CSS Modules + CSS Variables
- **Build:** Vite
- **Deployment:** Static (Netlify/Vercel/GitHub Pages)

## Performance Targets
- LCP < 2.5s
- CLS < 0.1
- 60fps scroll animations
- < 200KB JS gzipped (excluding Three.js)
- Progressive enhancement for low-end devices

## Accessibility
- prefers-reduced-motion respected
- Semantic HTML
- ARIA labels for interactive 3D elements
- Keyboard navigation for all UI
- High contrast mode support

## Browser Support
- Modern browsers (last 2 versions)
- WebGL2 required for 3D
- Graceful fallback: static images + CSS animations