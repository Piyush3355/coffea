import * as THREE from 'three';

// ─── PROCEDURAL BARISTA LATTE ART CREMA TEXTURE ─────────────────────────────
function createLatteArtTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  const cx = 512;
  const cy = 512;
  const r = 500;

  // Rich layered espresso crema gradient
  const baseGrad = ctx.createRadialGradient(cx, cy, 60, cx, cy, r);
  baseGrad.addColorStop(0, '#854922');
  baseGrad.addColorStop(0.35, '#633417');
  baseGrad.addColorStop(0.72, '#42200d');
  baseGrad.addColorStop(0.92, '#291207');
  baseGrad.addColorStop(1.0, '#160903');

  ctx.fillStyle = baseGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Micro-crema flecks and oils
  for (let i = 0; i < 350; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * (r - 100);
    const px = cx + Math.cos(angle) * dist;
    const py = cy + Math.sin(angle) * dist;
    const radius = 2 + Math.random() * 7;
    ctx.fillStyle = Math.random() > 0.4 ? 'rgba(225, 178, 122, 0.18)' : 'rgba(35, 16, 6, 0.2)';
    ctx.beginPath();
    ctx.arc(px, py, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // Steamed Micro-Foam Tulip Latte Art
  ctx.save();
  ctx.translate(cx, cy - 15);

  ctx.shadowColor = 'rgba(60, 26, 8, 0.55)';
  ctx.shadowBlur = 18;

  const milkColor = '#fffdf7';
  const milkShadow = '#f4e9d9';

  const tiers = [
    { y: 155, scaleX: 1.45, scaleY: 0.9, w: 90 },
    { y: 88,  scaleX: 1.65, scaleY: 1.0, w: 110 },
    { y: 22,  scaleX: 1.82, scaleY: 1.1, w: 125 },
    { y: -45, scaleX: 1.68, scaleY: 1.15, w: 112 },
    { y: -115, scaleX: 1.42, scaleY: 1.1, w: 92 },
  ];

  tiers.forEach((tier) => {
    ctx.save();
    ctx.translate(0, tier.y);
    ctx.scale(tier.scaleX, tier.scaleY);

    const wingGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, tier.w);
    wingGrad.addColorStop(0, milkColor);
    wingGrad.addColorStop(0.85, milkShadow);
    wingGrad.addColorStop(1, 'rgba(235, 218, 195, 0.05)');

    ctx.fillStyle = wingGrad;
    ctx.beginPath();
    ctx.moveTo(0, 20);
    ctx.bezierCurveTo(-tier.w * 0.8, -10, -tier.w, -tier.w * 0.6, 0, -tier.w * 0.85);
    ctx.bezierCurveTo(tier.w, -tier.w * 0.6, tier.w * 0.8, -10, 0, 20);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  });

  // Top heart
  ctx.save();
  ctx.translate(0, -175);
  ctx.fillStyle = milkColor;
  ctx.beginPath();
  ctx.moveTo(0, 24);
  ctx.bezierCurveTo(-55, -15, -60, -65, 0, -50);
  ctx.bezierCurveTo(60, -65, 55, -15, 0, 24);
  ctx.closePath();
  ctx.fill();
  ctx.restore();

  // Central barista stem line
  ctx.strokeStyle = milkColor;
  ctx.lineWidth = 14;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 235);
  ctx.lineTo(0, -220);
  ctx.stroke();

  // Terminal foam drop
  ctx.fillStyle = milkColor;
  ctx.beginPath();
  ctx.arc(0, -225, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();

  // Outer cup edge crema rim
  const rimGrad = ctx.createRadialGradient(cx, cy, r - 30, cx, cy, r);
  rimGrad.addColorStop(0, 'rgba(225, 178, 122, 0)');
  rimGrad.addColorStop(0.75, 'rgba(235, 188, 132, 0.25)');
  rimGrad.addColorStop(1, 'rgba(40, 15, 5, 0.45)');
  ctx.fillStyle = rimGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

// ─── PROCEDURAL STEAM PARTICLE TEXTURE ──────────────────────────────────────
function createSteamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  const grad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  grad.addColorStop(0.35, 'rgba(250, 245, 238, 0.38)');
  grad.addColorStop(0.7, 'rgba(240, 235, 225, 0.08)');
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

    // Oval bean proportions
    x *= 0.92;
    y *= 0.65;
    z *= 1.48;

    if (y < 0) {
      y *= 0.82;
    }

    // Authentic center crease
    const distFromCenter = Math.abs(x);
    if (y > 0 && distFromCenter < 0.075) {
      const indentFactor = Math.cos((distFromCenter / 0.075) * (Math.PI / 2));
      y -= 0.08 * indentFactor;
    }

    const jitter = Math.sin(x * 15 + z * 12) * 0.003;
    pos.setXYZ(i, x + jitter, y, z);
  }

  geom.computeVertexNormals();
  return geom;
}

// ─── 3D HERO CONTROLLER CLASS ───────────────────────────────────────────────
export class Hero3DScene {
  constructor(canvasElement, fallbackImgElement) {
    this.canvas = canvasElement;
    this.fallbackImg = fallbackImgElement;
    this.heroSection = document.getElementById('hero');

    this.scene = null;
    this.camera = null;
    this.renderer = null;

    this.cupGroup = null;
    this.floatingBeans = [];
    this.steamParticles = null;

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;
    this.clock = new THREE.Clock();

    this.isRunning = false;
    this.rafId = null;

    // Intro entrance animation progress (0 to 1)
    this.introProgress = 0;
    this.introDone = false;

    this.init();
  }

  init() {
    try {
      const width = this.canvas.clientWidth || 440;
      const height = this.canvas.clientHeight || 440;

      // 1. Scene
      this.scene = new THREE.Scene();

      // 2. Camera
      this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
      this.camera.position.set(0, 2.4, 5.2);
      this.camera.lookAt(0, 0.2, 0);

      // 3. Renderer with high-DPI & transparency
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height, false);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.15;

      // 4. Lighting
      this.setupLights();

      // 5. Build 3D Cup & Floating Beans
      this.buildSceneObjects();

      // 6. Event Listeners
      this.setupEvents();

      // Hide fallback image once WebGL is confirmed working
      if (this.fallbackImg) {
        this.fallbackImg.style.opacity = '0';
        this.fallbackImg.style.pointerEvents = 'none';
      }

      this.isRunning = true;
      this.animate();
    } catch (err) {
      console.warn('WebGL init failed, using static fallback:', err);
      if (this.fallbackImg) {
        this.fallbackImg.style.opacity = '1';
      }
    }
  }

  setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xfff6ee, 1.25);
    this.scene.add(ambientLight);

    // Key light (soft warm top-right)
    const keyLight = new THREE.DirectionalLight(0xffefe0, 2.4);
    keyLight.position.set(4, 6, 3);
    this.scene.add(keyLight);

    // Golden rim light (behind left)
    const rimLight = new THREE.DirectionalLight(0xc68a4c, 2.0);
    rimLight.position.set(-4, 3, -2.5);
    this.scene.add(rimLight);

    // Subtle blue fill light
    const fillLight = new THREE.DirectionalLight(0xdde5f0, 0.6);
    fillLight.position.set(0, -3, 3);
    this.scene.add(fillLight);
  }

  buildSceneObjects() {
    this.cupGroup = new THREE.Group();
    // Starting position for entrance
    this.cupGroup.position.set(0, -0.2, 0);
    this.cupGroup.rotation.set(0.65, -0.4, 0.05);

    // ── Mino Bone China Porcelain Material ──
    const porcelainMat = new THREE.MeshPhysicalMaterial({
      color: 0xfbf9f6,
      roughness: 0.12,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      metalness: 0.0,
      reflectivity: 0.9,
    });

    // ── 24K Gold Rim Accent Material ──
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd6a45a,
      metalness: 0.88,
      roughness: 0.22,
    });

    // ── 1. Ceramic Cup Body ──
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
    this.cupGroup.add(cupMesh);

    // ── 2. Ergonomic Handle ──
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
    this.cupGroup.add(handleMesh);

    // ── 3. Gold Trim on Cup Rim ──
    const rimGoldGeom = new THREE.TorusGeometry(1.18, 0.016, 16, 64);
    rimGoldGeom.rotateX(Math.PI / 2);
    rimGoldGeom.translate(0, 1.64, 0);
    const rimGold = new THREE.Mesh(rimGoldGeom, goldMat);
    this.cupGroup.add(rimGold);

    // ── 4. Barista Latte Art Crema Surface ──
    const latteArtTexture = createLatteArtTexture();
    const coffeeGeom = new THREE.CircleGeometry(1.08, 64);
    const coffeeMat = new THREE.MeshPhysicalMaterial({
      map: latteArtTexture,
      roughness: 0.18,
      clearcoat: 0.92,
      clearcoatRoughness: 0.06,
      metalness: 0.02,
      reflectivity: 0.85,
    });
    const coffeeSurface = new THREE.Mesh(coffeeGeom, coffeeMat);
    coffeeSurface.rotation.x = -Math.PI / 2;
    coffeeSurface.position.y = 1.42;
    this.cupGroup.add(coffeeSurface);

    // ── 5. Ceramic Saucer ──
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
    const saucerMesh = new THREE.Mesh(saucerGeom, porcelainMat);
    this.cupGroup.add(saucerMesh);

    // ── 6. Gold Trim on Saucer Rim ──
    const saucerGoldGeom = new THREE.TorusGeometry(2.18, 0.015, 16, 64);
    saucerGoldGeom.rotateX(Math.PI / 2);
    saucerGoldGeom.translate(0, 0.385, 0);
    const saucerGold = new THREE.Mesh(saucerGoldGeom, goldMat);
    this.cupGroup.add(saucerGold);

    this.scene.add(this.cupGroup);

    // ── 7. Floating 3D Roasted Coffee Beans ──
    const beanGeom = createAuthenticBeanGeometry();
    const beanMat = new THREE.MeshPhysicalMaterial({
      color: 0x342016,
      roughness: 0.42,
      clearcoat: 0.32,
      clearcoatRoughness: 0.15,
      metalness: 0.05,
    });

    const beanOffsets = [
      { x: -1.8, y: 1.2, z: 0.9, scale: 1.15, scatter: [-1.4, 1.2, 1.5] },
      { x: 1.9, y: 0.8, z: 1.1, scale: 1.05, scatter: [1.6, 0.8, 1.8] },
      { x: -1.4, y: -0.6, z: 1.3, scale: 0.95, scatter: [-1.8, -1.1, 1.2] },
      { x: 1.6, y: -0.4, z: 1.2, scale: 1.2, scatter: [1.7, -0.9, 1.4] },
      { x: -2.1, y: 0.4, z: -0.4, scale: 0.85, scatter: [-2.2, 0.5, -0.8] },
      { x: 2.1, y: 1.5, z: -0.5, scale: 0.9, scatter: [2.1, 1.6, -0.9] },
      { x: 0.3, y: 2.2, z: 0.6, scale: 1.0, scatter: [0.4, 2.2, 1.6] },
      { x: -0.8, y: -1.2, z: 0.8, scale: 1.1, scatter: [-0.9, -1.8, 1.1] },
    ];

    beanOffsets.forEach((b, i) => {
      const bean = new THREE.Mesh(beanGeom, beanMat);
      bean.scale.setScalar(b.scale);
      bean.position.set(b.x, b.y, b.z);
      bean.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      bean.userData = {
        origX: b.x,
        origY: b.y,
        origZ: b.z,
        scatterX: b.scatter[0],
        scatterY: b.scatter[1],
        scatterZ: b.scatter[2],
        floatSpeed: 0.8 + Math.random() * 0.8,
        floatOffset: i * 0.7,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
      };

      this.scene.add(bean);
      this.floatingBeans.push(bean);
    });

    // ── 8. Procedural Steam Particles ──
    const steamCount = 20;
    const steamGeom = new THREE.BufferGeometry();
    const steamPositions = new Float32Array(steamCount * 3);
    const steamScales = new Float32Array(steamCount);
    const steamAlphas = new Float32Array(steamCount);

    this.steamData = [];
    for (let s = 0; s < steamCount; s++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 0.65;
      const x = Math.cos(angle) * r;
      const y = 1.45 + Math.random() * 0.9;
      const z = Math.sin(angle) * r;

      steamPositions[s * 3] = x;
      steamPositions[s * 3 + 1] = y;
      steamPositions[s * 3 + 2] = z;
      steamScales[s] = 12 + Math.random() * 18;
      steamAlphas[s] = Math.random() * 0.45;

      this.steamData.push({
        baseX: x,
        baseZ: z,
        y: y,
        speed: 0.2 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.08,
      });
    }

    steamGeom.setAttribute('position', new THREE.BufferAttribute(steamPositions, 3));

    const steamMat = new THREE.PointsMaterial({
      size: 0.32,
      map: createSteamTexture(),
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    this.steamParticles = new THREE.Points(steamGeom, steamMat);
    this.cupGroup.add(this.steamParticles);
  }

  setupEvents() {
    // Mouse hover parallax on Hero
    if (this.heroSection) {
      this.heroSection.addEventListener('mousemove', (e) => {
        const rect = this.heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        this.mouse.targetX = x * 0.6;
        this.mouse.targetY = y * 0.4;
      });

      this.heroSection.addEventListener('mouseleave', () => {
        this.mouse.targetX = 0;
        this.mouse.targetY = 0;
      });
    }

    // Scroll progress tracker specifically for Hero
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroHeight = this.heroSection ? this.heroSection.offsetHeight : 600;
      this.scrollProgress = Math.min(1.2, Math.max(0, scrollY / (heroHeight * 0.9)));
    }, { passive: true });

    // Responsive resize
    window.addEventListener('resize', () => {
      const width = this.canvas.clientWidth || 440;
      const height = this.canvas.clientHeight || 440;
      if (this.renderer && this.camera) {
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height, false);
      }
    });

    // Pause animation when hero is off-screen (0% GPU/CPU overhead!)
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!this.isRunning) {
            this.isRunning = true;
            this.clock.start();
            this.animate();
          }
        } else {
          this.isRunning = false;
          if (this.rafId) {
            cancelAnimationFrame(this.rafId);
            this.rafId = null;
          }
        }
      });
    }, { threshold: 0.05 });

    if (this.heroSection) {
      visibilityObserver.observe(this.heroSection);
    }
  }

  animate() {
    if (!this.isRunning) return;

    this.rafId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Initial Visit Entrance Animation (Smooth Intro Easing)
    if (this.introProgress < 1) {
      this.introProgress += delta * 0.85;
      if (this.introProgress >= 1) {
        this.introProgress = 1;
        this.introDone = true;
      }
    }
    // Cubic ease out
    const introEase = 1 - Math.pow(1 - this.introProgress, 3);

    // Smooth mouse lerp
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.08;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.08;

    // 2. Base Idle Floating Animation
    const idleFloatY = Math.sin(elapsedTime * 1.6) * 0.05;
    const idleRotY = Math.sin(elapsedTime * 0.8) * 0.06;

    // 3. Scroll Reaction Transformations:
    // When scrolling down, the cup smoothly tilts forward into a dramatic serving/top-down view
    // and sinks slightly with momentum, revealing the tulip latte art heart.
    const sp = this.scrollProgress;
    const scrollTiltX = sp * 0.65; // tilts forward
    const scrollSpinY = sp * 0.45; // slight Y spin
    const scrollDropY = -sp * 0.35; // moves down

    if (this.cupGroup) {
      // Intro entrance target
      const basePosX = 0;
      const basePosY = (-0.3 + 0.3 * introEase) + idleFloatY + scrollDropY;
      const basePosZ = 0;
      this.cupGroup.position.set(basePosX, basePosY, basePosZ);

      // Rotation combining entrance, mouse parallax, and scroll response
      const targetRotX = (0.78 - 0.22 * introEase) + scrollTiltX + (-this.mouse.y * 0.35);
      const targetRotY = (-0.45 + 0.25 * introEase) + idleRotY + scrollSpinY + (this.mouse.x * 0.5);
      const targetRotZ = 0.04 * Math.sin(elapsedTime * 1.2) - (this.mouse.x * 0.1);

      this.cupGroup.rotation.x += (targetRotX - this.cupGroup.rotation.x) * 0.1;
      this.cupGroup.rotation.y += (targetRotY - this.cupGroup.rotation.y) * 0.1;
      this.cupGroup.rotation.z += (targetRotZ - this.cupGroup.rotation.z) * 0.1;
    }

    // 4. Floating Coffee Beans Transformations:
    // Beans hover during idle, and scatter outward with 3D depth as user scrolls down!
    this.floatingBeans.forEach((bean) => {
      const u = bean.userData;
      // Idle float
      const beanFloat = Math.sin(elapsedTime * u.floatSpeed + u.floatOffset) * 0.06;

      // Scatter outward as user scrolls
      const scatterMultiplier = sp * 1.5;
      const targetX = u.origX + u.scatterX * scatterMultiplier;
      const targetY = u.origY + beanFloat + (u.scatterY * scatterMultiplier);
      const targetZ = u.origZ + u.scatterZ * scatterMultiplier;

      bean.position.x += (targetX - bean.position.x) * 0.12;
      bean.position.y += (targetY - bean.position.y) * 0.12;
      bean.position.z += (targetZ - bean.position.z) * 0.12;

      // Beans tumble faster when scrolling
      const spinSpeed = 1 + sp * 3;
      bean.rotation.x += u.rotSpeedX * spinSpeed;
      bean.rotation.y += u.rotSpeedY * spinSpeed;
      bean.rotation.z += u.rotSpeedZ * spinSpeed;
    });

    // 5. Steam Particle Drift & Fade
    if (this.steamParticles && this.steamData) {
      const positions = this.steamParticles.geometry.attributes.position.array;
      for (let s = 0; s < this.steamData.length; s++) {
        const d = this.steamData[s];
        d.y += delta * d.speed;
        if (d.y > 2.6) {
          d.y = 1.45;
        }
        positions[s * 3 + 1] = d.y;
        positions[s * 3] = d.baseX + Math.sin(elapsedTime * 2 + s) * d.drift;
      }
      this.steamParticles.geometry.attributes.position.needsUpdate = true;
      // Fade steam out as scroll progresses
      this.steamParticles.material.opacity = Math.max(0, 0.45 * (1 - sp * 1.2));
    }

    this.renderer.render(this.scene, this.camera);
  }
}
