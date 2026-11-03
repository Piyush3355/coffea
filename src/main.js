import './styles/main.css';

import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

console.log('☕ Coffea Specialty Coffee 3D Initialized — Interactive Pouring & Serving Experience');

// ─── COFFEA CURATED MENU DATA ───────────────────────────────────────────────

const MENU_ITEMS = [
  {
    name: 'Caramel Macchiato Gold',
    price: '$5.50',
    desc: 'Freshly steamed milk with vanilla-flavored syrup marked with espresso and topped with rich caramel drizzle.',
    category: 'Hot Coffee',
    origin: 'House Blend',
    tags: ['Signature', 'Sweet Crema', 'Caramel'],
    icon: '☕'
  },
  {
    name: 'Gesha Reserve Pour-Over',
    price: '$8.50',
    desc: 'Cerro Azul, Colombia · Bright bergamot, white peach, jasmine floral finish. Hand-dripped on Kalita Wave.',
    category: 'Hot Coffee',
    origin: 'Colombia',
    tags: ['Single-Origin', 'Washed', 'Lot #12'],
    icon: '🫖'
  },
  {
    name: 'Mino Ceramic Flat White',
    price: '$5.75',
    desc: 'Double ristretto folded with silky micro-foam in our signature hand-thrown Mino bone china porcelain.',
    category: 'Espresso Bar',
    origin: 'Guatemala',
    tags: ['Velvety', 'Organic', 'Hazelnut'],
    icon: '🥛'
  },
  {
    name: 'Nitro Cascade Cold Brew',
    price: '$6.25',
    desc: '18-hour slow steep infused with nitrogen for a creamy, cascading pour and naturally sweet stout-like head.',
    category: 'Cold Brews',
    origin: 'Kenya AA',
    tags: ['Nitro', 'Velvet', 'Zero Sugar'],
    icon: '🍺'
  },
  {
    name: 'Ethiopian Heirloom Cortado',
    price: '$5.00',
    desc: 'Equal parts 1:1 espresso and steamed oat milk. Candied citrus notes and dark chocolate truffle body.',
    category: 'Espresso Bar',
    origin: 'Yirgacheffe',
    tags: ['Natural', 'Oat', 'Citrus'],
    icon: '🌾'
  },
  {
    name: 'Kyoto Tower Slow Drip',
    price: '$6.75',
    desc: 'Single-drop ice water extraction tower. Intense winey clarity and delicate floral fragrance.',
    category: 'Cold Brews',
    origin: 'Ethiopia',
    tags: ['18h Tower', 'Chilled', 'Winey'],
    icon: '🧊'
  },
  {
    name: 'Ceremonial Matcha Blossom',
    price: '$6.00',
    desc: 'First-harvest shade-grown green tea from Uji, Kyoto. Whisked tableside with steamed oat milk.',
    category: 'Hot Coffee',
    origin: 'Kyoto, Japan',
    tags: ['Ceremonial', 'Antioxidant', 'Oat'],
    icon: '🍵'
  },
  {
    name: 'Artisan Butter Croissant',
    price: '$4.25',
    desc: 'Baked fresh every morning using cultured Normandy butter. Flaky exterior with honey honeycomb crumb.',
    category: 'Artisan Bakery',
    origin: 'In-House Bakery',
    tags: ['Fresh Daily', 'French Butter'],
    icon: '🥐'
  },
  {
    name: 'Cold Drip Citrus Tonic',
    price: '$6.50',
    desc: 'Cold brew poured over artisanal tonic water and fresh cold-pressed Mediterranean yuzu zest.',
    category: 'Cold Brews',
    origin: 'Colombia',
    tags: ['Sparkling', 'Refreshing', 'Yuzu'],
    icon: '🍋'
  }
];

// Top-Level Dynamic Telemetry per Section
const SECTION_TELEMETRY = {
  hero: {
    num: '01 / 06',
    chips: ['BARISTA POURING · 93.5°C'],
    cta: 'Menu',
    link: '#menu'
  },
  about: {
    num: '02 / 06',
    chips: ['MINO CERAMIC BONE CHINA'],
    cta: 'Story',
    link: '#about'
  },
  menu: {
    num: '03 / 06',
    chips: ['9 CURATED SPECIALTIES'],
    cta: 'Filter',
    link: '#menu'
  },
  reservation: {
    num: '04 / 06',
    chips: ['TABLES & FLIGHTS OPEN'],
    cta: 'Book',
    link: '#reservation'
  },
  reviews: {
    num: '05 / 06',
    chips: ['★ 4.9/5 · 2,800+ REVIEWS'],
    cta: 'Reviews',
    link: '#reviews'
  },
  contact: {
    num: '06 / 06',
    chips: ['SEATTLE ROASTERY BAR'],
    cta: 'Visit',
    link: '#contact'
  }
};

// ─── PROCEDURAL LATTE ART GENERATOR ─────────────────────────────────────────

function createLatteArtTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  const cx = 512;
  const cy = 512;
  const r = 500;

  const baseGrad = ctx.createRadialGradient(cx, cy, 60, cx, cy, r);
  baseGrad.addColorStop(0, '#7a421e');
  baseGrad.addColorStop(0.42, '#5e3015');
  baseGrad.addColorStop(0.80, '#3f1e0c');
  baseGrad.addColorStop(0.98, '#261106');
  baseGrad.addColorStop(1.0, '#150802');

  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  for (let i = 0; i < 400; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 70 + Math.random() * (r - 110);
    const px = cx + Math.cos(angle) * dist;
    const py = cy + Math.sin(angle) * dist;
    const radius = 2 + Math.random() * 8;
    ctx.fillStyle = Math.random() > 0.45 ? 'rgba(217, 168, 108, 0.14)' : 'rgba(40, 18, 7, 0.16)';
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Barista Steamed Milk Foam Latte Art
  ctx.save();
  ctx.translate(cx, cy - 20);

  ctx.shadowColor = 'rgba(70, 32, 10, 0.55)';
  ctx.shadowBlur = 18;

  const milkColor = '#fffdf7';
  const milkShadow = '#f2e7d5';

  const tiers = [
    { y: 160, scaleX: 1.4, scaleY: 0.9, w: 90 },
    { y: 90,  scaleX: 1.6, scaleY: 1.0, w: 110 },
    { y: 20,  scaleX: 1.8, scaleY: 1.1, w: 125 },
    { y: -50, scaleX: 1.7, scaleY: 1.15, w: 115 },
    { y: -120, scaleX: 1.4, scaleY: 1.1, w: 95 },
  ];

  tiers.forEach(tier => {
    ctx.save();
    ctx.translate(0, tier.y);
    ctx.scale(tier.scaleX, tier.scaleY);

    const wingGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, tier.w);
    wingGrad.addColorStop(0, milkColor);
    wingGrad.addColorStop(0.85, milkShadow);
    wingGrad.addColorStop(1, 'rgba(230, 210, 185, 0.05)');

    ctx.fillStyle = wingGrad;
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.bezierCurveTo(-tier.w * 0.8, -10, -tier.w, -tier.w * 0.6, 0, -tier.w * 0.85);
    ctx.bezierCurveTo(tier.w, -tier.w * 0.6, tier.w * 0.8, -10, 0, 20);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  // Top crown heart
  ctx.save();
  ctx.translate(0, -185);
  ctx.fillStyle = milkColor;
  ctx.beginPath();
  ctx.moveTo(0, 25);
  ctx.bezierCurveTo(-55, -15, -60, -65, 0, -50);
  ctx.bezierCurveTo(60, -65, 55, -15, 0, 25);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Central Barista Pour Line
  ctx.strokeStyle = milkColor;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 240);
  ctx.lineTo(0, -230);
  ctx.stroke();

  ctx.fillStyle = milkColor;
  ctx.beginPath();
  ctx.arc(0, -235, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  const rimGrad = ctx.createRadialGradient(cx, cy, r - 25, cx, cy, r);
  rimGrad.addColorStop(0, 'rgba(217, 168, 108, 0)');
  rimGrad.addColorStop(0.7, 'rgba(224, 178, 122, 0.28)');
  rimGrad.addColorStop(1, 'rgba(50, 20, 8, 0.4)');
  ctx.fillStyle = rimGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// ─── PROCEDURAL FLOWING COFFEE STREAM TEXTURE ────────────────────────────────

function createStreamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Vertical gradient of rich amber and dark espresso
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0.0, 'rgba(75, 35, 12, 0.95)');
  grad.addColorStop(0.2, 'rgba(195, 125, 60, 0.9)');
  grad.addColorStop(0.5, 'rgba(90, 42, 15, 0.95)');
  grad.addColorStop(0.8, 'rgba(215, 145, 75, 0.85)');
  grad.addColorStop(1.0, 'rgba(65, 28, 10, 0.95)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 512);

  // Subtle vertical flow highlights
  for (let i = 0; i < 30; i++) {
    const x = Math.random() * 128;
    const w = 4 + Math.random() * 12;
    ctx.fillStyle = 'rgba(255, 200, 130, 0.18)';
    ctx.fillRect(x, 0, w, 512);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(1, 2);
  return texture;
}

// ─── PROCEDURAL STEAM PARTICLES TEXTURE ──────────────────────────────────────

function createSteamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
  grad.addColorStop(0.35, 'rgba(250, 246, 240, 0.45)');
  grad.addColorStop(0.7, 'rgba(240, 235, 225, 0.12)');
  grad.addColorStop(1, 'rgba(240, 235, 225, 0)');

  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

// ─── PROCEDURAL AUTHENTIC COFFEE BEAN GEOMETRY ──────────────────────────────

function createAuthenticBeanGeometry() {
  const geom = new THREE.SphereGeometry(0.18, 28, 20);
  const pos = geom.attributes.position;

  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i);
    let y = pos.getY(i);
    let z = pos.getZ(i);

    x *= 0.92;
    y *= 0.65;
    z *= 1.48;

    if (y < 0) {
      y *= 0.8;
    }

    const distFromCenter = Math.abs(x);
    if (y > 0 && distFromCenter < 0.075) {
      const indentFactor = Math.cos((distFromCenter / 0.075) * (Math.PI / 2));
      y -= 0.08 * indentFactor;
    }

    const jitter = Math.sin(x * 15 + z * 12) * 0.004;
    pos.setXYZ(i, x + jitter, y, z);
  }

  geom.computeVertexNormals();
  return geom;
}

// ─── THREE.JS ATELIER SCENE (POURING & SERVING EXPERIENCE) ───────────────────

class CafeApp {
  constructor() {
    this.canvas = document.getElementById('webgl-canvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();
    this.isInitialized = false;

    // Scroll metrics
    this.scrollProgress = 0;
    this.targetScrollProgress = 0;
    this.scrollVelocity = 0;
    this.lastScrollY = 0;

    // Mouse metrics
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetMouseX = 0;
    this.targetMouseY = 0;

    // 3D Model Hierarchy
    this.servingGroup = null; // Master group scaled down and positioned
    this.cupGroup = null;
    this.kettleGroup = null;
    this.pourStream = null;
    this.streamTexture = null;
    this.rippleRings = [];
    this.coffeeBeans = null;
    this.steamParticles = null;
    this.isPageVisible = true;

    this.init();
  }

  async init() {
    try {
      this.setupThreeJS();
      this.setupLighting();
      this.createStudioEnvironment();
      this.createServingAndPouringEnsemble();
      this.createArtisanTabletopBeans();
      this.createSteamParticleSystem();
      this.setupEventListeners();
      this.animate();
      this.isInitialized = true;
      console.log('✅ Three.js Coffea Pouring & Serving Scene Ready');
    } catch (err) {
      console.error('❌ Three.js setup error:', err);
    }
  }

  setupThreeJS() {
    this.scene = new THREE.Scene();

    // Studio Alabaster Fog matching #fbfaf8
    this.scene.fog = new THREE.FogExp2(0xfbfaf8, 0.025);

    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 2.2, 5.6);
    this.camera.lookAt(0, 1.2, 0);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  }

  setupLighting() {
    const hemiLight = new THREE.HemisphereLight(0xfffdfa, 0xe8e2d8, 1.15);
    this.scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfffaee, 1.85);
    keyLight.position.set(4, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 30;
    keyLight.shadow.camera.left = -6;
    keyLight.shadow.camera.right = 6;
    keyLight.shadow.camera.top = 6;
    keyLight.shadow.camera.bottom = -6;
    keyLight.shadow.bias = -0.0006;
    keyLight.shadow.radius = 3.5;
    this.scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xe8f0fa, 0.75);
    fillLight.position.set(-6, 5, -3);
    this.scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xfff7ed, 0.95);
    rimLight.position.set(0, 6, -6);
    this.scene.add(rimLight);
  }

  createStudioEnvironment() {
    const planeGeom = new THREE.PlaneGeometry(35, 35);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.08 });
    const shadowPlane = new THREE.Mesh(planeGeom, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.01;
    shadowPlane.receiveShadow = true;
    this.scene.add(shadowPlane);
  }

  createServingAndPouringEnsemble() {
    this.servingGroup = new THREE.Group();

    // ── REFINED PROPORTIONAL SCALE ──
    const isMobile = window.innerWidth < 768;
    const baseScale = isMobile ? 0.23 : 0.40;
    this.servingGroup.scale.set(baseScale, baseScale, baseScale);

    // Initial positioning in Hero: on desktop, sits on right half (x = 1.35)
    this.servingGroup.position.set(isMobile ? 0 : 1.35, isMobile ? -1.15 : 0.08, 0);

    // ── LUXURY MATERIALS ──
    const porcelainMat = new THREE.MeshPhysicalMaterial({
      color: 0xfcfbf9,        // Pure Mino Japanese bone china
      roughness: 0.12,
      metalness: 0.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      ior: 1.52,
      reflectivity: 0.9,
    });

    const goldRimMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,        // 24K gold foil trim
      metalness: 0.92,
      roughness: 0.22,
    });

    const kettleMat = new THREE.MeshStandardMaterial({
      color: 0x1f1f22,        // Matte brushed graphite stainless steel
      metalness: 0.90,
      roughness: 0.24,
    });

    const walnutWoodMat = new THREE.MeshStandardMaterial({
      color: 0x362316,        // Rich dark walnut serving tray
      roughness: 0.62,
      metalness: 0.02,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd8af48,        // Polished brass barista spoon & knob
      metalness: 0.95,
      roughness: 0.18,
    });

    // ── 1. ARTISAN WALNUT SERVING BOARD (Tray) ──
    const boardGeom = new THREE.CylinderGeometry(2.5, 2.5, 0.10, 64);
    const servingBoard = new THREE.Mesh(boardGeom, walnutWoodMat);
    servingBoard.position.y = -0.05;
    servingBoard.castShadow = true;
    servingBoard.receiveShadow = true;
    this.servingGroup.add(servingBoard);

    // Subtle raised beveled lip on tray edge
    const lipGeom = new THREE.TorusGeometry(2.46, 0.035, 16, 64);
    lipGeom.rotateX(Math.PI / 2);
    lipGeom.translate(0, 0.0, 0);
    const trayLip = new THREE.Mesh(lipGeom, walnutWoodMat);
    trayLip.receiveShadow = true;
    this.servingGroup.add(trayLip);

    // ── 2. BRASS CUPPING & TASTING SPOON (Beside the cup) ──
    const spoonGroup = new THREE.Group();
    spoonGroup.position.set(1.50, 0.04, 0.60);
    spoonGroup.rotation.y = -0.45;
    spoonGroup.rotation.x = Math.PI / 2;

    const spoonHandleGeom = new THREE.CylinderGeometry(0.022, 0.035, 1.75, 16);
    const spoonHandle = new THREE.Mesh(spoonHandleGeom, brassMat);
    spoonHandle.castShadow = true;
    spoonGroup.add(spoonHandle);

    const spoonBowlGeom = new THREE.SphereGeometry(0.13, 24, 16);
    spoonBowlGeom.scale(1.0, 1.35, 0.32);
    const spoonBowl = new THREE.Mesh(spoonBowlGeom, brassMat);
    spoonBowl.position.y = -0.92;
    spoonBowl.castShadow = true;
    spoonGroup.add(spoonBowl);

    this.servingGroup.add(spoonGroup);

    // ── 3. CUP & SAUCER HIERARCHY ──
    this.cupGroup = new THREE.Group();

    // Ceramic Mino Bone China Cup Body (Hollow with rounded rim)
    const cupPoints = [
      new THREE.Vector2(0, 0.04),
      new THREE.Vector2(0.50, 0.04),
      new THREE.Vector2(0.54, 0.0),
      new THREE.Vector2(0.62, 0.0),
      new THREE.Vector2(0.64, 0.06),
      new THREE.Vector2(0.72, 0.32),
      new THREE.Vector2(0.88, 0.72),
      new THREE.Vector2(1.06, 1.15),
      new THREE.Vector2(1.18, 1.48),
      new THREE.Vector2(1.22, 1.62),
      new THREE.Vector2(1.20, 1.65),
      new THREE.Vector2(1.16, 1.65),
      new THREE.Vector2(1.12, 1.60),
      new THREE.Vector2(1.04, 1.35),
      new THREE.Vector2(0.90, 0.95),
      new THREE.Vector2(0.72, 0.55),
      new THREE.Vector2(0.48, 0.22),
      new THREE.Vector2(0, 0.18),
    ];
    const cupGeom = new THREE.LatheGeometry(cupPoints, 64);
    cupGeom.computeVertexNormals();
    const cupMesh = new THREE.Mesh(cupGeom, porcelainMat);
    cupMesh.castShadow = true;
    cupMesh.receiveShadow = true;
    this.cupGroup.add(cupMesh);

    // Cup Ergonomic Handle
    const handleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.10, 1.38, 0),
      new THREE.Vector3(1.48, 1.44, 0),
      new THREE.Vector3(1.78, 1.22, 0),
      new THREE.Vector3(1.82, 0.92, 0),
      new THREE.Vector3(1.64, 0.62, 0),
      new THREE.Vector3(1.30, 0.52, 0),
      new THREE.Vector3(0.82, 0.54, 0),
    ]);
    const handleGeom = new THREE.TubeGeometry(handleCurve, 48, 0.09, 24, false);
    const handleMesh = new THREE.Mesh(handleGeom, porcelainMat);
    handleMesh.castShadow = true;
    handleMesh.receiveShadow = true;
    this.cupGroup.add(handleMesh);

    // 24K Gold Trim on Cup Rim
    const rimTorusGeom = new THREE.TorusGeometry(1.18, 0.016, 16, 64);
    rimTorusGeom.rotateX(Math.PI / 2);
    rimTorusGeom.translate(0, 1.64, 0);
    const rimTorus = new THREE.Mesh(rimTorusGeom, goldRimMat);
    this.cupGroup.add(rimTorus);

    // Coffee Crema Surface with Barista Latte Art
    const latteArtTexture = createLatteArtTexture();
    const coffeeGeom = new THREE.CircleGeometry(1.08, 64);
    const coffeeMat = new THREE.MeshPhysicalMaterial({
      map: latteArtTexture,
      roughness: 0.16,
      clearcoat: 0.95,
      clearcoatRoughness: 0.06,
      metalness: 0.02,
      reflectivity: 0.8,
    });
    const coffeeSurface = new THREE.Mesh(coffeeGeom, coffeeMat);
    coffeeSurface.rotation.x = -Math.PI / 2;
    coffeeSurface.position.y = 1.42;
    this.cupGroup.add(coffeeSurface);

    // Ceramic Saucer
    const saucerPoints = [
      new THREE.Vector2(0, 0.04),
      new THREE.Vector2(0.68, 0.04),
      new THREE.Vector2(0.72, 0.02),
      new THREE.Vector2(0.78, 0.0),
      new THREE.Vector2(0.86, 0.0),
      new THREE.Vector2(0.90, 0.04),
      new THREE.Vector2(1.25, 0.10),
      new THREE.Vector2(1.75, 0.22),
      new THREE.Vector2(2.18, 0.38),
      new THREE.Vector2(2.20, 0.39),
      new THREE.Vector2(2.18, 0.36),
      new THREE.Vector2(1.72, 0.18),
      new THREE.Vector2(1.20, 0.08),
      new THREE.Vector2(0.82, 0.04),
      new THREE.Vector2(0, 0.04),
    ];
    const saucerGeom = new THREE.LatheGeometry(saucerPoints, 64);
    saucerGeom.computeVertexNormals();
    const saucer = new THREE.Mesh(saucerGeom, porcelainMat);
    saucer.castShadow = true;
    saucer.receiveShadow = true;
    this.cupGroup.add(saucer);

    // Gold Trim on Saucer Rim
    const saucerGoldGeom = new THREE.TorusGeometry(2.18, 0.015, 16, 64);
    saucerGoldGeom.rotateX(Math.PI / 2);
    saucerGoldGeom.translate(0, 0.385, 0);
    const saucerGold = new THREE.Mesh(saucerGoldGeom, goldRimMat);
    this.cupGroup.add(saucerGold);

    // Concentric Liquid Pour Impact Ripples
    for (let r = 0; r < 3; r++) {
      const ringGeom = new THREE.RingGeometry(0.04, 0.08, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xe6caa3,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const ringMesh = new THREE.Mesh(ringGeom, ringMat);
      ringMesh.rotation.x = -Math.PI / 2;
      ringMesh.position.set(0, 1.426, 0);
      ringMesh.userData = { phase: r * 0.33 };
      this.cupGroup.add(ringMesh);
      this.rippleRings.push(ringMesh);
    }

    this.servingGroup.add(this.cupGroup);

    // ── 4. ARTISAN GOOSENECK BARISTA KETTLE (The Pourer) ──
    this.kettleGroup = new THREE.Group();
    // Kettle initial position above & to right of cup in pouring stance
    this.kettleGroup.position.set(1.28, 2.22, 0.12);
    this.kettleGroup.rotation.z = -0.42; // Tilted in active pour

    // Kettle Main Body (Architectural tapered lathe)
    const kettlePoints = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(0.68, 0),
      new THREE.Vector2(0.70, 0.08),
      new THREE.Vector2(0.66, 0.38),
      new THREE.Vector2(0.56, 0.85),
      new THREE.Vector2(0.48, 1.45),
      new THREE.Vector2(0.44, 1.70),
      new THREE.Vector2(0.46, 1.74),
      new THREE.Vector2(0.40, 1.74),
      new THREE.Vector2(0, 1.74),
    ];
    const kettleBodyGeom = new THREE.LatheGeometry(kettlePoints, 48);
    const kettleBody = new THREE.Mesh(kettleBodyGeom, kettleMat);
    kettleBody.castShadow = true;
    kettleBody.receiveShadow = true;
    this.kettleGroup.add(kettleBody);

    // Kettle Lid with Walnut / Brass Knob
    const lidGeom = new THREE.CylinderGeometry(0.42, 0.44, 0.06, 32);
    const lid = new THREE.Mesh(lidGeom, kettleMat);
    lid.position.y = 1.76;
    this.kettleGroup.add(lid);

    const knobGeom = new THREE.SphereGeometry(0.08, 16, 16);
    const knob = new THREE.Mesh(knobGeom, brassMat);
    knob.position.y = 1.88;
    this.kettleGroup.add(knob);

    // Gooseneck Spout (Arching from base toward cup)
    const spoutCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.52, 0.32, 0),
      new THREE.Vector3(0.92, 0.65, 0),
      new THREE.Vector3(1.10, 1.15, 0),
      new THREE.Vector3(1.00, 1.55, 0),
      new THREE.Vector3(0.68, 1.65, 0),
      new THREE.Vector3(0.32, 1.45, 0), // Spout tip pointing down
    ]);
    const spoutGeom = new THREE.TubeGeometry(spoutCurve, 40, 0.045, 16, false);
    const spoutMesh = new THREE.Mesh(spoutGeom, kettleMat);
    spoutMesh.castShadow = true;
    this.kettleGroup.add(spoutMesh);

    // Kettle Ergonomic Handle
    const kettleHandleCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.48, 1.40, 0),
      new THREE.Vector3(-0.98, 1.10, 0),
      new THREE.Vector3(-0.95, 0.50, 0),
      new THREE.Vector3(-0.60, 0.30, 0),
    ]);
    const kettleHandleGeom = new THREE.TubeGeometry(kettleHandleCurve, 32, 0.060, 16, false);
    const kettleHandle = new THREE.Mesh(kettleHandleGeom, kettleMat);
    kettleHandle.castShadow = true;
    this.kettleGroup.add(kettleHandle);

    this.servingGroup.add(this.kettleGroup);

    // ── 5. DYNAMIC LIQUID STREAM (POURING INTO CUP) ──
    this.streamTexture = createStreamTexture();
    const streamCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.68, 2.70, 0.12), // Connected from spout tip
      new THREE.Vector3(0.48, 2.25, 0.08),
      new THREE.Vector3(0.24, 1.82, 0.04),
      new THREE.Vector3(0.00, 1.42, 0.00), // Into center of cup
    ]);
    const streamGeom = new THREE.TubeGeometry(streamCurve, 32, 0.032, 16, false);
    const streamMat = new THREE.MeshPhysicalMaterial({
      map: this.streamTexture,
      color: 0x5c2b0d,
      roughness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.95,
      transmission: 0.25,
      side: THREE.DoubleSide,
    });
    this.pourStream = new THREE.Mesh(streamGeom, streamMat);
    this.servingGroup.add(this.pourStream);

    this.scene.add(this.servingGroup);
  }

  // ── 6. ARTISAN TABLETOP COFFEE BEANS (REALISTIC STILL-LIFE) ──
  createArtisanTabletopBeans() {
    const beanGeom = createAuthenticBeanGeometry();
    const beanMat = new THREE.MeshStandardMaterial({
      color: 0x2e180d,        // Dark roast Arabica sheen
      roughness: 0.35,
      metalness: 0.05,
    });

    // 16 beans naturally resting on the walnut tray around the saucer
    const trayBeanCount = 16;
    for (let i = 0; i < trayBeanCount; i++) {
      const bean = new THREE.Mesh(beanGeom, beanMat);
      bean.castShadow = true;
      bean.receiveShadow = true;

      const angle = (i / trayBeanCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const radius = 1.42 + Math.random() * 0.95;
      const s = 0.65 + Math.random() * 0.25;

      bean.scale.set(s, s, s);
      bean.position.set(Math.cos(angle) * radius, 0.035, Math.sin(angle) * radius);
      bean.rotation.set(
        Math.PI / 2 + (Math.random() - 0.5) * 0.25,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.4
      );
      this.servingGroup.add(bean);
    }

    // 8 beans casually scattered around the perimeter of the walnut tray
    const rimBeanCount = 8;
    for (let i = 0; i < rimBeanCount; i++) {
      const bean = new THREE.Mesh(beanGeom, beanMat);
      bean.castShadow = true;
      bean.receiveShadow = true;

      const angle = (i / rimBeanCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
      const radius = 2.58 + Math.random() * 0.28;
      const s = 0.60 + Math.random() * 0.25;

      bean.scale.set(s, s, s);
      bean.position.set(Math.cos(angle) * radius, -0.04, Math.sin(angle) * radius);
      bean.rotation.set(
        Math.PI / 2 + (Math.random() - 0.5) * 0.2,
        Math.random() * Math.PI * 2,
        (Math.random() - 0.5) * 0.3
      );
      this.servingGroup.add(bean);
    }
  }

  createSteamParticleSystem() {
    const count = 120;
    const geom = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const alphas = new Float32Array(count);
    const velocities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      this.resetSteamParticle(i, positions, sizes, alphas, velocities, true);
    }

    geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geom.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));

    const steamTexture = createSteamTexture();
    const steamMat = new THREE.PointsMaterial({
      size: 0.28,
      map: steamTexture,
      transparent: true,
      opacity: 0.30,
      depthWrite: false,
      blending: THREE.NormalBlending,
      color: 0xffffff,
      sizeAttenuation: true,
    });

    this.steamParticles = new THREE.Points(geom, steamMat);
    this.cupGroup.add(this.steamParticles);

    this.steamData = { positions, sizes, alphas, velocities, count };
  }

  resetSteamParticle(i, positions, sizes, alphas, velocities, initial = false) {
    const angle = Math.random() * Math.PI * 2;
    const r = Math.random() * 0.26;

    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = initial ? 1.42 + Math.random() * 0.75 : 1.42;
    positions[i * 3 + 2] = Math.sin(angle) * r;

    sizes[i] = 0.12 + Math.random() * 0.16;
    alphas[i] = 0.15 + Math.random() * 0.18;
    velocities[i] = 0.30 + Math.random() * 0.40;
  }

  setupEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this), { passive: true });
    window.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: true });
    window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
    document.addEventListener('visibilitychange', () => {
      this.isPageVisible = !document.hidden;
    });
  }

  onTouchMove(e) {
    if (e.touches && e.touches.length > 0) {
      const touch = e.touches[0];
      this.targetMouseX = (touch.clientX / window.innerWidth) * 2 - 1;
      this.targetMouseY = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }

  onResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const isMobile = window.innerWidth < 768;
    if (this.servingGroup) {
      const s = isMobile ? 0.23 : 0.40;
      this.servingGroup.scale.set(s, s, s);
    }
  }

  onMouseMove(e) {
    this.targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  onScroll() {
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    this.targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    this.scrollVelocity = (window.scrollY - this.lastScrollY) * 0.0015;
    this.lastScrollY = window.scrollY;
  }

  updateCoffeeBeans(deltaTime) {
    // All 24 beans are grounded still-life elements on the walnut serving tray
  }

  updateSteamParticles(deltaTime) {
    if (!this.steamParticles || !this.steamData) return;

    const { positions, sizes, alphas, velocities, count } = this.steamData;

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 1] += velocities[i] * deltaTime;
      positions[i * 3] += Math.sin(positions[i * 3 + 1] * 4.0 + i) * 0.0025;
      positions[i * 3 + 2] += Math.cos(positions[i * 3 + 1] * 4.0 + i) * 0.0025;

      alphas[i] -= deltaTime * 0.20;
      sizes[i] += deltaTime * 0.09;

      if (positions[i * 3 + 1] > 2.25 || alphas[i] <= 0.02) {
        this.resetSteamParticle(i, positions, sizes, alphas, velocities);
      }
    }

    this.steamParticles.geometry.attributes.position.needsUpdate = true;
  }

  // ── Dynamic Pour Animation & 6-Stage Choreography ──
  updateChoreography(deltaTime) {
    this.mouseX += (this.targetMouseX - this.mouseX) * 0.06;
    this.mouseY += (this.targetMouseY - this.mouseY) * 0.06;

    this.scrollProgress += (this.targetScrollProgress - this.scrollProgress) * 0.08;
    const p = Math.max(0, Math.min(1, this.scrollProgress));

    const isMobile = window.innerWidth < 768;

    // 1. Animate Liquid Flow Texture in Stream
    if (this.streamTexture) {
      this.streamTexture.offset.y -= deltaTime * 4.2;
    }

    // 2. Animate Pour Impact Ripples on Coffee Surface
    if (this.rippleRings.length > 0) {
      this.rippleRings.forEach(ring => {
        ring.userData.phase = (ring.userData.phase + deltaTime * 1.6) % 1.0;
        const progress = ring.userData.phase;
        const scale = 0.2 + progress * 2.2;
        ring.scale.set(scale, scale, 1);
        ring.material.opacity = Math.max(0, (1 - progress) * 0.65);
      });
    }

    // 3. Dynamic Pouring vs Served Transition:
    // When p is near top (Hero: 0 to 0.18), the kettle is actively pouring!
    // As p goes from 0.18 to 0.35, the kettle straightens, stream disappears, kettle lifts away.
    if (this.kettleGroup && this.pourStream) {
      if (p < 0.18) {
        // Active pour
        const tilt = -0.42 + Math.sin(this.clock.getElapsedTime() * 2.0) * 0.02;
        this.kettleGroup.rotation.z = tilt;
        this.kettleGroup.position.y = 2.22;
        this.kettleGroup.visible = true;
        this.pourStream.visible = true;
        this.pourStream.material.opacity = 0.95;
      } else if (p < 0.35) {
        // Transition: kettle tilts back and lifts away
        const t = (p - 0.18) / 0.17;
        this.kettleGroup.rotation.z = THREE.MathUtils.lerp(-0.42, 0.0, t);
        this.kettleGroup.position.y = THREE.MathUtils.lerp(2.22, 4.2, t);
        this.pourStream.material.opacity = THREE.MathUtils.lerp(0.95, 0.0, t);
        this.pourStream.visible = t < 0.85;
        this.kettleGroup.visible = true;
      } else {
        // Pour finished: Coffee is served!
        this.kettleGroup.visible = false;
        this.pourStream.visible = false;
      }
    }

    // 4. Choreographed Multi-Stage Camera & Ensemble Movement
    let camTargetPos = new THREE.Vector3();
    let camLookTarget = new THREE.Vector3();
    let groupTargetPos = new THREE.Vector3();
    let groupTargetRot = new THREE.Vector3();

    const heroX = isMobile ? 0 : 1.35;
    const heroY = isMobile ? -1.15 : 0.08;

    if (p < 0.18) {
      // Stage 1: Hero (Active Pour, elegant right side on desktop)
      const t = p / 0.18;
      camTargetPos.lerpVectors(new THREE.Vector3(0, 2.0, 5.2), new THREE.Vector3(-1.6, 2.0, 4.6), t);
      camLookTarget.lerpVectors(new THREE.Vector3(0.45, 1.0, 0), new THREE.Vector3(0.25, 0.9, 0), t);
      groupTargetPos.lerpVectors(new THREE.Vector3(heroX, heroY, 0), new THREE.Vector3(0.85, 0.08, 0), t);
      groupTargetRot.lerpVectors(new THREE.Vector3(0.08, 0.22, -0.02), new THREE.Vector3(0.06, 1.25, 0.0), t);
    } else if (p < 0.38) {
      // Stage 2: About (Served cup on walnut board & spoon side profile)
      const t = (p - 0.18) / 0.20;
      camTargetPos.lerpVectors(new THREE.Vector3(-1.6, 2.0, 4.6), new THREE.Vector3(0.0, 3.8, 2.6), t);
      camLookTarget.lerpVectors(new THREE.Vector3(0.25, 0.9, 0), new THREE.Vector3(0.0, 0.8, 0), t);
      groupTargetPos.lerpVectors(new THREE.Vector3(0.85, 0.08, 0), new THREE.Vector3(0.0, 0.05, 0), t);
      groupTargetRot.lerpVectors(new THREE.Vector3(0.06, 1.25, 0.0), new THREE.Vector3(-0.16, 2.85, 0.0), t);
    } else if (p < 0.58) {
      // Stage 3: Menu (Overhead beauty shot looking down at the Rosetta latte art!)
      const t = (p - 0.38) / 0.20;
      camTargetPos.lerpVectors(new THREE.Vector3(0.0, 3.8, 2.6), new THREE.Vector3(2.0, 1.6, 4.0), t);
      camLookTarget.lerpVectors(new THREE.Vector3(0.0, 0.8, 0), new THREE.Vector3(-0.2, 0.8, 0), t);
      groupTargetPos.lerpVectors(new THREE.Vector3(0.0, 0.05, 0), new THREE.Vector3(-0.75, 0.08, 0), t);
      groupTargetRot.lerpVectors(new THREE.Vector3(-0.16, 2.85, 0.0), new THREE.Vector3(0.12, 4.20, 0.05), t);
    } else if (p < 0.76) {
      // Stage 4: Reservation (Intimate Table Setting)
      const t = (p - 0.58) / 0.18;
      camTargetPos.lerpVectors(new THREE.Vector3(2.0, 1.6, 4.0), new THREE.Vector3(1.5, 1.35, 4.4), t);
      camLookTarget.lerpVectors(new THREE.Vector3(-0.2, 0.8, 0), new THREE.Vector3(0.2, 0.75, 0), t);
      groupTargetPos.lerpVectors(new THREE.Vector3(-0.75, 0.08, 0), new THREE.Vector3(0.65, 0.05, 0), t);
      groupTargetRot.lerpVectors(new THREE.Vector3(0.12, 4.20, 0.05), new THREE.Vector3(0.15, 5.2, 0.0), t);
    } else if (p < 0.90) {
      // Stage 5: Reviews (Macro Beauty Angle)
      const t = (p - 0.76) / 0.14;
      camTargetPos.lerpVectors(new THREE.Vector3(1.5, 1.35, 4.4), new THREE.Vector3(-1.5, 1.6, 4.4), t);
      camLookTarget.lerpVectors(new THREE.Vector3(0.2, 0.75, 0), new THREE.Vector3(0.0, 0.8, 0), t);
      groupTargetPos.lerpVectors(new THREE.Vector3(0.65, 0.05, 0), new THREE.Vector3(-0.45, 0.08, 0), t);
      groupTargetRot.lerpVectors(new THREE.Vector3(0.15, 5.2, 0.0), new THREE.Vector3(0.08, 5.8, 0.0), t);
    } else {
      // Stage 6: Visit (Centered Peaceful Served Presentation)
      const t = (p - 0.90) / 0.10;
      camTargetPos.lerpVectors(new THREE.Vector3(-1.5, 1.6, 4.4), new THREE.Vector3(0, 1.7, 4.8), t);
      camLookTarget.lerpVectors(new THREE.Vector3(0.0, 0.8, 0), new THREE.Vector3(0, 0.8, 0), t);
      groupTargetPos.lerpVectors(new THREE.Vector3(-0.45, 0.08, 0), new THREE.Vector3(0, 0.05, 0), t);
      groupTargetRot.lerpVectors(new THREE.Vector3(0.08, 5.8, 0.0), new THREE.Vector3(0.06, 6.28, 0.0), t);
    }

    this.camera.position.lerp(camTargetPos, 0.1);
    this.camera.lookAt(camLookTarget);

    if (this.servingGroup) {
      const levitate = Math.sin(this.clock.getElapsedTime() * 1.2) * 0.025;
      this.servingGroup.position.x = groupTargetPos.x + this.mouseX * 0.20;
      this.servingGroup.position.y = groupTargetPos.y + levitate + this.mouseY * 0.12;
      this.servingGroup.position.z = groupTargetPos.z;

      this.servingGroup.rotation.x = groupTargetRot.x + this.mouseY * 0.15;
      this.servingGroup.rotation.y = groupTargetRot.y + this.mouseX * 0.25;
      this.servingGroup.rotation.z = groupTargetRot.z;
    }
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    if (!this.isPageVisible) return;

    const deltaTime = Math.min(this.clock.getDelta(), 1 / 30);

    this.updateCoffeeBeans(deltaTime);
    this.updateSteamParticles(deltaTime);
    this.updateChoreography(deltaTime);

    this.renderer.render(this.scene, this.camera);
  }
}

// ─── TOP-LEVEL DYNAMIC SCROLL CONTROLLER ─────────────────────────────────────

function initScrollBaseController() {
  const progressBar = document.getElementById('scroll-progress-bar');
  const progressReadout = document.getElementById('nav-progress-readout');
  const sectionNumEl = document.getElementById('nav-section-num');
  const chipsContainer = document.getElementById('nav-chips');
  const ctaBtn = document.getElementById('nav-cta-action');
  const navEl = document.getElementById('main-nav');
  const timeTicker = document.getElementById('live-time-ticker');

  const sections = ['hero', 'about', 'menu', 'reservation', 'reviews', 'contact'];
  let currentActiveSection = '';

  function updateSeattleTime() {
    const now = new Date();
    const options = { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', hour12: true };
    const timeStr = now.toLocaleTimeString('en-US', options);
    if (timeTicker) {
      timeTicker.textContent = `SEATTLE ${timeStr} · OPEN TODAY`;
    }
  }
  updateSeattleTime();
  setInterval(updateSeattleTime, 30000);

  function updateSectionTelemetry(sectionKey) {
    if (currentActiveSection === sectionKey) return;
    currentActiveSection = sectionKey;

    const data = SECTION_TELEMETRY[sectionKey] || SECTION_TELEMETRY.hero;

    if (sectionNumEl) {
      sectionNumEl.textContent = data.num;
    }

    if (chipsContainer) {
      chipsContainer.innerHTML = data.chips.map(chip =>
        `<span class="nav__chip">${chip}</span>`
      ).join('');
    }

    if (ctaBtn) {
      ctaBtn.textContent = data.cta;
      ctaBtn.onclick = () => {
        const target = document.querySelector(data.link);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      };
    }

    document.querySelectorAll('.nav__link').forEach(link => {
      const isCurrent = link.dataset.section === sectionKey;
      link.classList.toggle('nav__link--active', isCurrent);
    });
  }

  function onScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;

    if (progressBar) {
      progressBar.style.width = `${progress}%`;
    }

    if (progressReadout) {
      progressReadout.textContent = `${Math.round(progress).toString().padStart(2, '0')}%`;
    }

    if (navEl) {
      navEl.classList.toggle('nav--scrolled', scrollY > 60);
    }

    const viewCenter = scrollY + window.innerHeight * 0.38;
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const top = el.offsetTop;
        if (viewCenter >= top) {
          updateSectionTelemetry(sections[i]);
          break;
        }
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ─── HERO INTRO ANIMATIONS ───────────────────────────────────────────────────

function initHeroAnimations() {
  // Hero typography & badges orchestrated via CSS keyframes with backwards fill
}

// ─── SCROLL REVEAL ────────────────────────────────────────────────────────────

function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal');
  revealEls.forEach(el => {
    gsap.fromTo(el,
      { y: 35, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });
}

// ─── STATS COUNTER ────────────────────────────────────────────────────────────

function initStatsCounter() {
  document.querySelectorAll('.stat-pill__num[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        gsap.to({ val: 0 }, {
          val: target,
          duration: 2.2,
          ease: 'power2.out',
          onUpdate: function() {
            el.textContent = Math.round(this.targets()[0].val);
          }
        });
      }
    });
  });
}

// ─── DYNAMIC MENU GRID WITH FILTERING ────────────────────────────────────────

function initMenu() {
  const grid = document.getElementById('menu-grid');
  const categoriesContainer = document.getElementById('menu-categories');
  if (!grid || !categoriesContainer) return;

  const categories = ['All', 'Hot Coffee', 'Espresso Bar', 'Cold Brews', 'Artisan Bakery'];
  let activeCategory = 'All';

  function renderTabs() {
    categoriesContainer.innerHTML = categories.map(cat =>
      `<button class="menu__category${cat === activeCategory ? ' menu__category--active' : ''}"
        type="button" data-cat="${cat}">${cat}</button>`
    ).join('');

    categoriesContainer.querySelectorAll('.menu__category').forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.dataset.cat;
        renderTabs();
        renderCards();
      });
    });
  }

  function renderCards() {
    const items = activeCategory === 'All'
      ? MENU_ITEMS
      : MENU_ITEMS.filter(item => item.category === activeCategory);

    grid.innerHTML = items.map(item => `
      <article class="menu-card" role="listitem">
        <div class="menu-card__top">
          <div class="menu-card__icon-badge" aria-hidden="true">${item.icon}</div>
          <span class="menu-card__price">${item.price}</span>
        </div>
        <div>
          <h3 class="menu-card__title">${item.name}</h3>
          <p class="menu-card__desc">${item.desc}</p>
        </div>
        <div class="menu-card__bottom">
          <div class="menu-card__tags">
            ${item.tags.map(t => `<span class="menu-card__tag">#${t}</span>`).join('')}
          </div>
          <span class="menu-card__meta-origin">${item.origin}</span>
        </div>
      </article>
    `).join('');

    gsap.fromTo('.menu-card',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.45, stagger: 0.05, ease: 'power2.out' }
    );
  }

  renderTabs();
  renderCards();
}

// ─── RESERVATION & CONTACT HANDLERS ──────────────────────────────────────────

function initForms() {
  const resForm = document.getElementById('reservation-form');
  const resNote = document.getElementById('res-note');
  const contactForm = document.getElementById('contact-form');
  const contactNote = document.getElementById('contact-note');
  const copyBtn = document.getElementById('copy-address-btn');

  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('123 Coffee Lane, Brew District, Seattle, WA 98101').then(() => {
        const orig = copyBtn.textContent;
        copyBtn.textContent = '✓ Copied Coordinates!';
        setTimeout(() => { copyBtn.textContent = orig; }, 2200);
      });
    });
  }

  if (resForm) {
    resForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = resForm.querySelector('.form__submit');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Reserving Your Table…</span>';

      setTimeout(() => {
        resNote.textContent = '✓ Table reserved! A confirmation has been sent to your email.';
        resNote.style.color = 'var(--color-success)';
        submitBtn.innerHTML = '<span>Table Confirmed</span>';
        resForm.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Confirm Table Reservation</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        }, 3200);
      }, 1100);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('.form__submit');
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Transmitting…</span>';

      setTimeout(() => {
        contactNote.textContent = '✓ Message received! Our concierge will reply within 2 hours.';
        contactNote.style.color = 'var(--color-success)';
        submitBtn.innerHTML = '<span>Message Sent</span>';
        contactForm.reset();
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
        }, 3200);
      }, 1000);
    });
  }
}

// ─── MOBILE NAV MENU ─────────────────────────────────────────────────────────

function initMobileNav() {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('nav-menu');

  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('nav__links--open');
    toggle.classList.toggle('nav__toggle--open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('nav__links--open');
      toggle.classList.remove('nav__toggle--open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ─── BOOTSTRAP ───────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  window.cafeApp = new CafeApp();

  initScrollBaseController();
  initHeroAnimations();
  initScrollReveal();
  initStatsCounter();
  initMenu();
  initForms();
  initMobileNav();
});
