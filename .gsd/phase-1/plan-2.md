---
phase: 1
plan: 2
wave: 2
depends_on: ["phase-1/plan-1.md"]
files_modified:
  - src/three/scene.js
  - src/three/camera.js
  - src/three/renderer.js
  - src/three/objects/Environment.js
  - src/three/objects/CoffeeBeans.js
  - src/three/objects/SteamParticles.js
  - src/three/objects/CupModel.js
  - src/three/compositor.js
  - src/main.js
autonomous: true
user_setup: []
must_haves:
  truths:
    - "Three.js scene renders at 60fps"
    - "Camera follows scroll position smoothly"
    - "Coffee beans float with physics-based motion"
    - "Steam particles respond to scroll velocity"
    - "Cup model loads and displays correctly"
  artifacts:
    - "Modular Three.js architecture in src/three/"
    - "Post-processing composer with bloom"
    - "All 3D objects instanced for performance"
---

# Plan 1.2: Core 3D Scene & Objects

## Objective
Build the complete Three.js foundation with modular architecture: scene management, camera system, renderer with post-processing, and core 3D objects (environment, coffee beans, steam particles, cup models).

## Context
Load for context:
- PROJECT_SPEC.md
- .gsd/phase-1/plan-1.md
- src/main.js (current state)

## Tasks

<task type="auto">
  <name>Create Three.js core modules (scene, camera, renderer)</name>
  <files>src/three/scene.js, src/three/camera.js, src/three/renderer.js</files>
  <action>
    Create scene.js: exports createScene() returning configured Scene with fog, background
    Create camera.js: exports createCamera() returning PerspectiveCamera with scroll-linked position updates
    Create renderer.js: exports createRenderer(canvas) returning WebGLRenderer with:
      - antialias: true, alpha: true, powerPreference: "high-performance"
      - toneMapping: ACESFilmicToneMapping, toneMappingExposure: 1
      - shadowMap enabled (PCFSoftShadowMap)
      - setPixelRatio(Math.min(window.devicePixelRatio, 2))
      - resize() method for responsive handling
    AVOID: Putting animation logic in these - pure setup only
  </action>
  <verify>Import all three in main.js, scene renders blank canvas without errors</verify>
  <done>Three core modules export correctly, renderer shows blank canvas</done>
</task>

<task type="auto">
  <name>Build Environment object (floor, walls, lighting)</name>
  <files>src/three/objects/Environment.js</files>
  <action>
    Create Environment class with:
    - Floor: PlaneGeometry with MeshStandardMaterial (roughness: 0.8, metalness: 0.1)
    - Subtle walls: PlaneGeometry for depth perception
    - Lighting: HemisphereLight (sky: 0xfff5e6, ground: 0x8b7355, intensity: 0.6)
    - Accent: DirectionalLight (0xffebd5, intensity: 1) casting soft shadows
    - Ambient: AmbientLight (0xffffff, 0.3)
    - Method: update(time) for subtle breathing animation
    - Method: setMood(mood) for section-based lighting changes
    AVOID: Complex geometry - keep minimalist, use textures for detail
  </action>
  <verify>Environment renders in scene, lighting looks warm and inviting</verify>
  <done>Environment.js exports class, integrates with scene</done>
</task>

<task type="auto">
  <name>Create Coffee Beans particle system (instanced)</name>
  <files>src/three/objects/CoffeeBeans.js</files>
  <action>
    Create CoffeeBeans class using InstancedMesh for performance:
    - 500-1000 instances of simple bean geometry (CapsuleGeometry)
    - Material: MeshStandardMaterial (color: 0x2d1b10, roughness: 0.9, metalness: 0)
    - Float animation: sine-based Y offset per instance with unique phase
    - Gentle rotation on Z axis
    - Scroll-linked: positions shift based on scroll progress
    - Cursor attraction: beans subtly move toward mouse position
    - Methods: update(deltaTime, scrollProgress, mousePosition)
    AVOID: Individual meshes - InstancedMesh is 100x faster
  </action>
  <verify>500+ beans render at 60fps, animate smoothly, respond to scroll</verify>
  <done>CoffeeBeans.js works, performs well on mid-range GPU</done>
</task>

<task type="auto">
  <name>Build Steam Particles system</name>
  <files>src/three/objects/SteamParticles.js</files>
  <action>
    Create SteamParticles class:
    - Points material with custom shader for soft volumetric look
    - 200-500 particles rising from cup positions
    - Velocity based on scroll speed (faster scroll = more vigorous steam)
    - Perlin noise for organic motion
    - Fade out at top, recycle at bottom
    - Color gradient: white → warm cream → transparent
    - Methods: update(deltaTime, scrollVelocity, cupPositions)
    AVOID: CPU-side particle updates - use GPU shaders if possible
  </action>
  <verify>Steam rises naturally, responds to scroll velocity, performs well</verify>
  <done>SteamParticles.js integrated, looks organic</done>
</task>

<task type="auto">
  <name>Load and setup Cup Model (GLTF)</name>
  <files>src/three/objects/CupModel.js</files>
  <action>
    Create CupModel class:
    - Load GLTF model (create procedural cup if no asset yet)
    - Procedural fallback: LatheGeometry for ceramic cup shape
    - Material: MeshPhysicalMaterial (clearcoat: 1, clearcoatRoughness: 0.1)
    - Steam emission point as Object3D child
    - Hover interaction: gentle rotation toward cursor
    - Scroll transform: position/rotation based on section
    - Methods: load(), update(deltaTime, scrollProgress, hoverState)
    AVOID: Heavy models - procedural is fine for MVP, optimize later
  </action>
  <verify>Cup renders with realistic ceramic material, steam emits from correct position</verify>
  <done>CupModel.js works with procedural geometry</done>
</task>

<task type="auto">
  <name>Setup Post-processing Composer (Bloom + FXAA)</name>
  <files>src/three/compositor.js</files>
  <action>
    Create compositor.js exporting createComposer(renderer, scene, camera):
    - EffectComposer with RenderPass
    - UnrealBloomPass (strength: 0.3, radius: 0.4, threshold: 0.85)
    - ShaderPass for FXAA (anti-aliasing)
    - Optional: VignettePass for cinematic feel
    - Returns composer with render() method
    - Handles resize
    AVOID: Too many passes - keep minimal for performance
  </action>
  <verify>Bloom gives warm glow to highlights, no jagged edges</verify>
  <done>Composer integrates, renders through composer not renderer directly</done>
</task>

<task type="auto">
  <name>Integrate all 3D modules into main.js</name>
  <files>src/main.js</files>
  <action>
    Refactor main.js to:
    - Import all three modules and objects
    - Initialize scene, camera, renderer, composer
    - Instantiate Environment, CoffeeBeans, SteamParticles, CupModel
    - Setup animation loop with deltaTime
    - Connect scroll progress to 3D objects
    - Handle resize for all modules
    - Clean up on page unload
    AVOID: Logic leakage - keep main.js as orchestrator only
  </action>
  <verify>npm run dev shows complete 3D scene animating at 60fps</verify>
  <done>Full 3D scene runs, all objects integrated and animated</done>
</task>

## Verification
After all tasks, verify:
- [ ] 60fps on desktop (Chrome DevTools Performance tab)
- [ ] No memory leaks (heap stable over 30s)
- [ ] Coffee beans: 500+ instances, smooth animation
- [ ] Steam particles respond to scroll velocity
- [ ] Cup model renders with materials
- [ ] Bloom post-processing active
- [ ] Resize works correctly

## Success Criteria
- [ ] All tasks verified
- [ ] Performance budget met
- [ ] Code modular and extensible