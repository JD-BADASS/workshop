// JD & LEO DAS's Workshop — Master Script & 3D Interactive JD WEB CORE Engine
// Integrated 3D Three.js WebGL System, Touch & Mouse Gyro Controls, Plexus Network, Audio Reactivity & UI Framework

document.addEventListener('DOMContentLoaded', function () {

  // =========================================================================
  // ⚡ 1. JD WEB CORE — 3D WEBGL ENGINE & INTERACTIVE REACTOR (Three.js) ⚡
  // =========================================================================

  const coreCanvas = document.getElementById('jd-core-3d-canvas');
  const coreViewport = document.getElementById('jd-core-3d-viewport');

  if (coreCanvas && coreViewport && typeof THREE !== 'undefined') {
    
    // ── Performance & Device Detection ──
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    const particleCount = isMobile ? 90 : 180;
    const maxConnectionsPerFrame = isMobile ? 220 : 380;
    const connectionDistThreshold = isMobile ? 2.2 : 2.5;
    const threshSq = connectionDistThreshold * connectionDistThreshold;

    // ── 3D Scene, Camera & Renderer ──
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(45, coreViewport.clientWidth / coreViewport.clientHeight, 0.1, 1000);
    const defaultCamZ = isMobile ? 12.0 : 10.2;
    camera.position.set(0, 0.5, defaultCamZ);

    const renderer = new THREE.WebGLRenderer({
      canvas: coreCanvas,
      alpha: true,
      antialias: !isMobile,
      powerPreference: 'high-performance'
    });
    renderer.setSize(coreViewport.clientWidth, coreViewport.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    // ── Dynamic Lighting System ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x00e0ff, 5.0, 45);
    cyanPointLight.position.set(5, 5, 5);
    scene.add(cyanPointLight);

    const magentaPointLight = new THREE.PointLight(0xff00c8, 5.0, 45);
    magentaPointLight.position.set(-5, -5, 5);
    scene.add(magentaPointLight);

    const centerPointLight = new THREE.PointLight(0x00e0ff, 2.0, 10);
    centerPointLight.position.set(0, 0, 0);
    scene.add(centerPointLight);

    // ── Master Transform Groups ──
    const masterCoreGroup = new THREE.Group();
    scene.add(masterCoreGroup);

    const coreReactorGroup = new THREE.Group();
    masterCoreGroup.add(coreReactorGroup);

    const ringsGroup = new THREE.Group();
    masterCoreGroup.add(ringsGroup);

    const nodesGroup = new THREE.Group();
    masterCoreGroup.add(nodesGroup);

    // ── 1. Central Core Reactor (Layered Glass, Energy Sphere & JD Emblem) ──
    
    // A. Inner Energy Core Sphere
    const innerCoreGeo = new THREE.IcosahedronGeometry(1.0, 4);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x00e0ff,
      emissive: 0x00e0ff,
      emissiveIntensity: 1.0,
      roughness: 0.3,
      metalness: 0.1,
      wireframe: false
    });
    const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreReactorGroup.add(innerCoreMesh);

    // B. Outer Faceted Glass Shell (Lattice Cage)
    const outerCageGeo = new THREE.IcosahedronGeometry(1.42, 1);
    const outerCageMat = new THREE.MeshStandardMaterial({
      color: 0xff00c8,
      emissive: 0x440033,
      emissiveIntensity: 0.6,
      wireframe: true,
      transparent: true,
      opacity: 0.65
    });
    const outerCageMesh = new THREE.Mesh(outerCageGeo, outerCageMat);
    coreReactorGroup.add(outerCageMesh);

    // C. Glowing Crystal Polyhedron Shell
    const crystalGeo = new THREE.DodecahedronGeometry(1.2, 0);
    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: 0x070b14,
      emissive: 0x002244,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      opacity: 0.45,
      transparent: true,
      wireframe: false
    });
    const crystalMesh = new THREE.Mesh(crystalGeo, crystalMat);
    coreReactorGroup.add(crystalMesh);

    // D. Central 3D Holographic "JD CORE" Emblem Billboard Sprite
    function createJDEmblemTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 512;
      const ctx = c.getContext('2d');

      // Outer targeting reticle
      ctx.strokeStyle = '#00e0ff';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(256, 256, 220, 0, Math.PI * 2);
      ctx.stroke();

      // Dashed inner ring
      ctx.strokeStyle = '#ff00c8';
      ctx.lineWidth = 4;
      ctx.setLineDash([16, 12]);
      ctx.beginPath();
      ctx.arc(256, 256, 180, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // 4 Corner Sci-Fi Tech Ticks
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 8;
      const ticks = [0, Math.PI/2, Math.PI, Math.PI*1.5];
      ticks.forEach(a => {
        const x1 = 256 + Math.cos(a) * 200;
        const y1 = 256 + Math.sin(a) * 200;
        const x2 = 256 + Math.cos(a) * 240;
        const y2 = 256 + Math.sin(a) * 240;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      });

      // Central Glow Background
      const radialGlow = ctx.createRadialGradient(256, 256, 20, 256, 256, 180);
      radialGlow.addColorStop(0, 'rgba(0, 224, 255, 0.45)');
      radialGlow.addColorStop(0.6, 'rgba(255, 0, 200, 0.25)');
      radialGlow.addColorStop(1, 'rgba(7, 8, 13, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, 512, 512);

      // JD Typography
      ctx.font = '900 120px Satoshi, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00e0ff';
      ctx.shadowBlur = 24;
      ctx.fillText('JD', 256, 226);

      // WEB CORE subtext
      ctx.font = '700 32px "JetBrains Mono", monospace';
      ctx.fillStyle = '#00e0ff';
      ctx.shadowColor = '#ff00c8';
      ctx.shadowBlur = 16;
      ctx.fillText('WEB CORE', 256, 310);

      // Micro system indicator
      ctx.font = '500 16px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.shadowBlur = 0;
      ctx.fillText('// ENGINE ONLINE //', 256, 345);

      return new THREE.CanvasTexture(c);
    }

    const emblemTexture = createJDEmblemTexture();
    const emblemSpriteMat = new THREE.SpriteMaterial({
      map: emblemTexture,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const emblemSprite = new THREE.Sprite(emblemSpriteMat);
    emblemSprite.scale.set(2.8, 2.8, 1);
    coreReactorGroup.add(emblemSprite);

    // E. Mini Inner Quantum Rings
    const innerRingGeo1 = new THREE.TorusGeometry(1.65, 0.015, 16, 64);
    const innerRingMat1 = new THREE.MeshBasicMaterial({ color: 0x00e0ff, wireframe: true });
    const innerRing1 = new THREE.Mesh(innerRingGeo1, innerRingMat1);
    coreReactorGroup.add(innerRing1);

    const innerRingGeo2 = new THREE.TorusGeometry(1.75, 0.015, 16, 64);
    const innerRingMat2 = new THREE.MeshBasicMaterial({ color: 0xff00c8, wireframe: true });
    const innerRing2 = new THREE.Mesh(innerRingGeo2, innerRingMat2);
    innerRing2.rotation.x = Math.PI / 2;
    coreReactorGroup.add(innerRing2);

    // ── 2. Gyroscopic Multi-Axis 3D Reactor Rings ──
    const gyroRings = [];

    function createGyroRing(radius, tube, colorHex, rotX, rotY, rotZ, speed, name) {
      const ringGroup = new THREE.Group();
      
      const geo = new THREE.TorusGeometry(radius, tube, 8, 48);
      const mat = new THREE.MeshStandardMaterial({
        color: colorHex,
        emissive: colorHex,
        emissiveIntensity: 0.7,
        roughness: 0.3,
        metalness: 0.8
      });
      const mesh = new THREE.Mesh(geo, mat);
      ringGroup.add(mesh);

      // Add orbital energy node satellites along ring
      const dotCount = 6;
      for (let i = 0; i < dotCount; i++) {
        const dotGeo = new THREE.SphereGeometry(tube * 2.8, 8, 8);
        const dotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const dot = new THREE.Mesh(dotGeo, dotMat);
        const angle = (i / dotCount) * Math.PI * 2;
        dot.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
        ringGroup.add(dot);
      }

      ringGroup.rotation.set(rotX, rotY, rotZ);
      ringsGroup.add(ringGroup);

      gyroRings.push({
        group: ringGroup,
        speed: speed,
        baseSpeed: speed,
        axis: new THREE.Vector3(rotX ? 1 : 0, rotY ? 1 : 0, rotZ ? 1 : 0).normalize()
      });
    }

    // Concentric 3D Rings
    createGyroRing(2.6, 0.02, 0x00e0ff, Math.PI / 3.5, Math.PI / 6, 0, 0.008, 'Ring1');
    createGyroRing(3.4, 0.022, 0xff00c8, -Math.PI / 4, 0, Math.PI / 5, -0.006, 'Ring2');
    createGyroRing(4.2, 0.018, 0x00ffa3, Math.PI / 2, 0, 0, 0.004, 'Ring3_Equator');
    createGyroRing(4.8, 0.016, 0x9d00ff, 0, Math.PI / 2.5, Math.PI / 4, -0.005, 'Ring4_Polar');

    // ── 3. Energy Surge Shockwave Ring ──
    const shockwaveGeo = new THREE.RingGeometry(0.8, 0.95, 64);
    const shockwaveMat = new THREE.MeshBasicMaterial({
      color: 0x00e0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending
    });
    const shockwaveMesh = new THREE.Mesh(shockwaveGeo, shockwaveMat);
    shockwaveMesh.rotation.x = Math.PI / 2;
    masterCoreGroup.add(shockwaveMesh);

    // ── 4. 3D Particle Cloud & Dynamic Neural Plexus System ──
    const particlePositions = new Float32Array(particleCount * 3);
    const particleVelocities = [];
    const particleColors = new Float32Array(particleCount * 3);
    const particleBaseScales = new Float32Array(particleCount);

    const palette = [
      new THREE.Color(0x00e0ff), // Cyan
      new THREE.Color(0xff00c8), // Magenta
      new THREE.Color(0x00ffa3), // Mint
      new THREE.Color(0x9d00ff), // Purple
      new THREE.Color(0xffffff)  // Bright White
    ];

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a spherical orbital cloud around the core
      const r = 2.0 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particleVelocities.push({
        vx: (Math.random() - 0.5) * 0.006,
        vy: (Math.random() - 0.5) * 0.006,
        vz: (Math.random() - 0.5) * 0.006,
        orbitSpeed: 0.001 + Math.random() * 0.004,
        radius: r,
        angle: theta,
        yPhase: Math.random() * Math.PI * 2
      });

      const color = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;

      particleBaseScales[i] = 0.5 + Math.random() * 1.5;
    }

    // Particle Points Geometry & Texture
    function createGlowPointTexture() {
      const c = document.createElement('canvas');
      c.width = 64;
      c.height = 64;
      const ctx = c.getContext('2d');
      const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.3, 'rgba(0, 224, 255, 0.8)');
      grad.addColorStop(0.7, 'rgba(255, 0, 200, 0.3)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 64, 64);
      return new THREE.CanvasTexture(c);
    }

    const particlePointsGeo = new THREE.BufferGeometry();
    particlePointsGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlePointsGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlePointsMat = new THREE.PointsMaterial({
      size: isMobile ? 0.28 : 0.34,
      map: createGlowPointTexture(),
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particlePointsMesh = new THREE.Points(particlePointsGeo, particlePointsMat);
    masterCoreGroup.add(particlePointsMesh);

    // Dynamic Plexus Lines Buffer (Up to maxConnectionsPerFrame line segments)
    const linePositions = new Float32Array(maxConnectionsPerFrame * 6);
    const lineColors = new Float32Array(maxConnectionsPerFrame * 6);

    const plexusGeo = new THREE.BufferGeometry();
    plexusGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    plexusGeo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

    const plexusMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const plexusLinesMesh = new THREE.LineSegments(plexusGeo, plexusMat);
    masterCoreGroup.add(plexusLinesMesh);

    // ── 5. The Six Core Domain Satellite Nodes ──
    const domainsData = [
      {
        id: 0,
        name: 'ART',
        code: 'DOMAIN // 01',
        title: 'Digital Artwork & Stencils',
        tag: 'VISUAL ARTS',
        icon: '🎨',
        colorHex: 0xff00c8,
        colorCss: '#ff00c8',
        desc: 'Original digital illustrations, high-contrast stencil-led compositions, and stylized character art with attitude and personality.',
        link: '#work',
        pos: new THREE.Vector3(4.8, 1.2, 1.2)
      },
      {
        id: 1,
        name: 'DESIGN',
        code: 'DOMAIN // 02',
        title: 'PPT Presentation Design',
        tag: 'SLIDE CRAFT',
        icon: '🖥️',
        colorHex: 0x00e0ff,
        colorCss: '#00e0ff',
        desc: 'High-impact professional slide decks, pitch presentations, and clean visual layouts built for school, business, and key moments.',
        link: '#services',
        pos: new THREE.Vector3(2.4, 4.2, -1.8)
      },
      {
        id: 2,
        name: 'WEB',
        code: 'DOMAIN // 03',
        title: 'Interactive Web Experiences',
        tag: 'FRONT-END',
        icon: '🌐',
        colorHex: 0x00f0ff,
        colorCss: '#00f0ff',
        desc: 'Modern, highly interactive 3D landing pages, portfolio environments, and cyber interfaces built for memorable user engagement.',
        link: '#work',
        pos: new THREE.Vector3(-3.2, 3.4, 2.6)
      },
      {
        id: 3,
        name: 'MUSIC',
        code: 'DOMAIN // 04',
        title: 'Original Sound & OST Design',
        tag: 'AUDIO ARTS',
        icon: '🎵',
        colorHex: 0xb000ff,
        colorCss: '#b000ff',
        desc: 'BGM experiments, motion soundtracks, and sonic atmospheres that sync seamlessly with visual rhythms and identity.',
        link: '#music-section',
        pos: new THREE.Vector3(-4.8, -1.6, 1.4)
      },
      {
        id: 4,
        name: 'CREATE',
        code: 'DOMAIN // 05',
        title: 'Experimental Creative Engine',
        tag: 'LAB & IDEAS',
        icon: '💡',
        colorHex: 0xff9d00,
        colorCss: '#ff9d00',
        desc: 'Raw experimentation, creative technology prototypes, sketches, and turning imaginative spark into finished digital pieces.',
        link: '#services',
        pos: new THREE.Vector3(-1.6, -4.4, -2.6)
      },
      {
        id: 5,
        name: 'CONNECT',
        code: 'DOMAIN // 06',
        title: 'Collaborations & Services',
        tag: 'DIRECT CONTACT',
        icon: '🔗',
        colorHex: 0x00ffa3,
        colorCss: '#00ffa3',
        desc: 'Bridging JD with clients, collaborators, and creative seekers worldwide. Direct DM inquiries, custom commissions, and quotes.',
        link: '#contact',
        pos: new THREE.Vector3(3.4, -3.4, 2.8)
      }
    ];

    function createDomainBadgeTexture(domain) {
      const c = document.createElement('canvas');
      c.width = 384;
      c.height = 160;
      const ctx = c.getContext('2d');

      // Rounded pill container
      ctx.fillStyle = 'rgba(7, 8, 13, 0.88)';
      ctx.strokeStyle = domain.colorCss;
      ctx.lineWidth = 4;
      
      const r = 24;
      ctx.beginPath();
      ctx.roundRect(10, 10, 364, 140, r);
      ctx.fill();
      ctx.stroke();

      // Top bar code
      ctx.font = '700 20px "JetBrains Mono", monospace';
      ctx.fillStyle = domain.colorCss;
      ctx.fillText(`// 0${domain.id + 1}`, 36, 48);

      // Icon & Name
      ctx.font = '800 42px Satoshi, sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = domain.colorCss;
      ctx.shadowBlur = 14;
      ctx.fillText(`${domain.icon} ${domain.name}`, 36, 106);

      return new THREE.CanvasTexture(c);
    }

    const domainNodes = [];
    const interactiveRaycastObjects = [];

    domainsData.forEach(d => {
      const nodeGroup = new THREE.Group();
      nodeGroup.position.copy(d.pos);

      // Anchor Crystal Polyhedron
      const anchorGeo = new THREE.OctahedronGeometry(0.42, 0);
      const anchorMat = new THREE.MeshStandardMaterial({
        color: d.colorHex,
        emissive: d.colorHex,
        emissiveIntensity: 0.9,
        roughness: 0.2,
        metalness: 0.8
      });
      const anchorMesh = new THREE.Mesh(anchorGeo, anchorMat);
      anchorMesh.userData = { domainId: d.id, isDomainNode: true };
      nodeGroup.add(anchorMesh);
      interactiveRaycastObjects.push(anchorMesh);

      // Orbiting Satellite Ring around Anchor
      const nodeRingGeo = new THREE.TorusGeometry(0.68, 0.015, 6, 24);
      const nodeRingMat = new THREE.MeshBasicMaterial({ color: d.colorHex, wireframe: true });
      const nodeRing = new THREE.Mesh(nodeRingGeo, nodeRingMat);
      nodeRing.rotation.x = Math.PI / 3;
      nodeGroup.add(nodeRing);

      // Holographic Badge Sprite
      const badgeTexture = createDomainBadgeTexture(d);
      const badgeSpriteMat = new THREE.SpriteMaterial({
        map: badgeTexture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false
      });
      const badgeSprite = new THREE.Sprite(badgeSpriteMat);
      badgeSprite.scale.set(1.9, 0.8, 1);
      badgeSprite.position.set(0, 0.85, 0);
      badgeSprite.userData = { domainId: d.id, isDomainNode: true };
      nodeGroup.add(badgeSprite);
      interactiveRaycastObjects.push(badgeSprite);

      // Energy Tether Line from Domain Node to Central Core
      const tetherPoints = [new THREE.Vector3(0, 0, 0), d.pos.clone().negate()];
      const tetherGeo = new THREE.BufferGeometry().setFromPoints(tetherPoints);
      const tetherMat = new THREE.LineBasicMaterial({
        color: d.colorHex,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      const tetherLine = new THREE.Line(tetherGeo, tetherMat);
      nodeGroup.add(tetherLine);

      // Energy Pulse traveling along Tether
      const pulseGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const pulseMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const pulse = new THREE.Mesh(pulseGeo, pulseMat);
      nodeGroup.add(pulse);

      nodesGroup.add(nodeGroup);

      domainNodes.push({
        data: d,
        group: nodeGroup,
        anchor: anchorMesh,
        ring: nodeRing,
        tetherLine: tetherLine,
        tetherMat: tetherMat,
        pulse: pulse,
        pulseProgress: Math.random(),
        basePos: d.pos.clone(),
        orbitAngle: Math.atan2(d.pos.z, d.pos.x),
        isHovered: false
      });
    });

    // Make central core raycastable
    innerCoreMesh.userData = { isCoreCenter: true };
    outerCageMesh.userData = { isCoreCenter: true };
    crystalMesh.userData = { isCoreCenter: true };
    interactiveRaycastObjects.push(innerCoreMesh, outerCageMesh, crystalMesh);

    // ── 6. State Machine & Energy Surge Physics Engine ──
    const CoreState = {
      IDLE: 'IDLE // LIVING',
      ACTIVE: 'ACTIVE // INTERACTING',
      FOCUSED: 'FOCUSED // DOMAIN LOCK',
      AUDIO: 'AUDIO REACTOR // SYNCED',
      SURGE: 'ENERGY SURGE // BURST'
    };

    let currentState = CoreState.IDLE;
    let isSurging = false;
    let surgeTimer = 0;
    let surgeDuration = 1.6;
    let isMusicActive = false;
    let audioPulseVal = 0;
    let focusedDomainId = null;

    const coreStateIndicator = document.getElementById('core-state-indicator');
    const coreStateText = document.getElementById('core-state-text');
    const coreTelemetryRot = document.getElementById('core-telemetry-rot');
    const coreZoomLevel = document.getElementById('core-zoom-level');
    const coreConnCount = document.getElementById('core-connection-count');

    function updateCoreState(newState) {
      currentState = newState;
      if (coreStateText) coreStateText.textContent = newState;
      if (coreStateIndicator) {
        if (newState === CoreState.SURGE) {
          coreStateIndicator.className = 'w-2 h-2 rounded-full bg-pink-500 animate-ping';
        } else if (newState === CoreState.AUDIO) {
          coreStateIndicator.className = 'w-2 h-2 rounded-full bg-pink-400 animate-pulse';
        } else if (newState === CoreState.FOCUSED) {
          coreStateIndicator.className = 'w-2 h-2 rounded-full bg-emerald-400';
        } else if (newState === CoreState.ACTIVE) {
          coreStateIndicator.className = 'w-2 h-2 rounded-full bg-cyan-400';
        } else {
          coreStateIndicator.className = 'w-2 h-2 rounded-full bg-primary animate-pulse';
        }
      }
    }

    function triggerEnergySurge() {
      if (isSurging) return;
      isSurging = true;
      surgeTimer = 0;
      updateCoreState(CoreState.SURGE);

      // Flash glitch vignette
      if (typeof triggerChromaticGlitchFlash === 'function') {
        triggerChromaticGlitchFlash();
      }

      // Background orbs burst
      const o1 = document.getElementById('reactive-orb-1');
      const o2 = document.getElementById('reactive-orb-2');
      if (o1) o1.classList.add('orb-pulse-fast');
      if (o2) o2.classList.add('orb-pulse-fast');

      setTimeout(() => {
        if (!isMusicActive) {
          if (o1) o1.classList.remove('orb-pulse-fast');
          if (o2) o2.classList.remove('orb-pulse-fast');
          updateCoreState(focusedDomainId !== null ? CoreState.FOCUSED : CoreState.IDLE);
        } else {
          updateCoreState(CoreState.AUDIO);
        }
        isSurging = false;
      }, 1600);
    }

    const btnTriggerSurge = document.getElementById('btn-trigger-surge');
    if (btnTriggerSurge) {
      btnTriggerSurge.addEventListener('click', (e) => {
        e.preventDefault();
        triggerEnergySurge();
      });
    }

    // Auto-surge periodically if idle
    setInterval(() => {
      if (currentState === CoreState.IDLE && !isPointerDown && Math.random() < 0.45) {
        triggerEnergySurge();
      }
    }, 24000);

    // Audio Pulse Toggle Button
    const btnAudioPulse = document.getElementById('btn-audio-pulse');
    let isManualAudioPulse = false;
    if (btnAudioPulse) {
      btnAudioPulse.addEventListener('click', (e) => {
        e.preventDefault();
        isManualAudioPulse = !isManualAudioPulse;
        const lbl = document.getElementById('audio-pulse-btn-label');
        if (isManualAudioPulse) {
          btnAudioPulse.classList.add('bg-pink-900/60', 'border-pink-500', 'text-pink-300');
          if (lbl) lbl.textContent = 'PULSE ACTIVE';
          window.setCoreMusicState(true);
        } else {
          btnAudioPulse.classList.remove('bg-pink-900/60', 'border-pink-500', 'text-pink-300');
          if (lbl) lbl.textContent = 'AUDIO PULSE';
          window.setCoreMusicState(false);
        }
      });
    }

    // ── 7. Touch & Mouse Gyro Interactivity Controls ──
    let isPointerDown = false;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let targetRotationY = 0;
    let targetRotationX = 0;
    let currentRotationY = 0;
    let currentRotationX = 0;
    let velX = 0;
    let velY = 0;
    let lastPointerX = 0;
    let lastPointerY = 0;

    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    let targetCamDist = defaultCamZ;
    let currentCamDist = defaultCamZ;
    let initialPinchDist = 0;

    // Raycaster
    const raycaster = new THREE.Raycaster();
    const pointerCoord = new THREE.Vector2(-999, -999);

    function onPointerDown(e) {
      isPointerDown = true;
      coreCanvas.style.cursor = 'grabbing';
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      pointerStartX = clientX;
      pointerStartY = clientY;
      lastPointerX = clientX;
      lastPointerY = clientY;
      velX = 0;
      velY = 0;
      updateCoreState(CoreState.ACTIVE);

      if (e.touches && e.touches.length === 2) {
        initialPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    }

    function onPointerMove(e) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      // Update Normalized Coordinates for Raycaster
      const rect = coreViewport.getBoundingClientRect();
      pointerCoord.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      pointerCoord.y = -((clientY - rect.top) / rect.height) * 2 + 1;

      if (isPointerDown) {
        // Multi-touch pinch zoom
        if (e.touches && e.touches.length === 2) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          const delta = (initialPinchDist - dist) * 0.02;
          targetCamDist = Math.max(6.0, Math.min(14.0, targetCamDist + delta));
          initialPinchDist = dist;
          return;
        }

        const deltaX = clientX - lastPointerX;
        const deltaY = clientY - lastPointerY;
        
        targetRotationY += deltaX * 0.007;
        targetRotationX += deltaY * 0.007;
        targetRotationX = Math.max(-Math.PI / 2.2, Math.min(Math.PI / 2.2, targetRotationX));

        velX = deltaX * 0.007;
        velY = deltaY * 0.007;

        lastPointerX = clientX;
        lastPointerY = clientY;
      } else {
        // Subtle Parallax Tilt
        mouseParallaxX = ((clientX - rect.left) / rect.width - 0.5) * 0.4;
        mouseParallaxY = ((clientY - rect.top) / rect.height - 0.5) * 0.4;
      }
    }

    function onPointerUp() {
      if (isPointerDown) {
        isPointerDown = false;
        coreCanvas.style.cursor = 'grab';
        if (!isSurging && !isMusicActive && focusedDomainId === null) {
          setTimeout(() => {
            if (!isPointerDown && currentState === CoreState.ACTIVE) {
              updateCoreState(CoreState.IDLE);
            }
          }, 800);
        }
      }
    }

    // Wheel Zoom
    coreViewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      targetCamDist += e.deltaY * 0.005;
      targetCamDist = Math.max(5.5, Math.min(14.0, targetCamDist));
    }, { passive: false });

    // Pointer Event Listeners
    coreViewport.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    coreViewport.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp, { passive: true });

    // Click Raycast Handler (Focus domain or trigger core pulse)
    coreViewport.addEventListener('click', (e) => {
      const rect = coreViewport.getBoundingClientRect();
      pointerCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointerCoord, camera);
      const intersects = raycaster.intersectObjects(interactiveRaycastObjects, true);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData.isDomainNode && hit.userData.domainId !== undefined) {
          focusDomainNode(hit.userData.domainId);
        } else if (hit.userData.isCoreCenter) {
          triggerEnergySurge();
        }
      }
    });

    // ── 8. Holographic Domain Dossier & Focus Tweener ──
    const dossierCard = document.getElementById('domain-dossier-card');
    const dossierCode = document.getElementById('dossier-code');
    const dossierTitle = document.getElementById('dossier-title');
    const dossierDesc = document.getElementById('dossier-desc');
    const dossierTag = document.getElementById('dossier-tag');
    const dossierLink = document.getElementById('dossier-link');
    const dossierIconBox = document.getElementById('dossier-icon-box');
    const dossierCloseBtn = document.getElementById('dossier-close-btn');

    function showDomainDossier(domain) {
      if (!dossierCard) return;
      if (dossierCode) dossierCode.textContent = domain.code;
      if (dossierTitle) dossierTitle.textContent = domain.title;
      if (dossierDesc) dossierDesc.textContent = domain.desc;
      if (dossierTag) {
        dossierTag.textContent = domain.tag;
        dossierTag.style.borderColor = domain.colorCss;
        dossierTag.style.color = domain.colorCss;
      }
      if (dossierIconBox) {
        dossierIconBox.textContent = domain.icon;
        dossierIconBox.style.borderColor = domain.colorCss;
      }
      if (dossierLink) {
        dossierLink.setAttribute('href', domain.link);
      }

      dossierCard.classList.remove('opacity-0', 'translate-y-4', 'pointer-events-none');
      dossierCard.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
    }

    function hideDomainDossier() {
      if (!dossierCard) return;
      dossierCard.classList.add('opacity-0', 'translate-y-4', 'pointer-events-none');
      dossierCard.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
      focusedDomainId = null;
      document.querySelectorAll('.domain-hud-btn').forEach(b => b.classList.remove('active'));
      if (!isMusicActive && !isSurging) updateCoreState(CoreState.IDLE);
    }

    if (dossierCloseBtn) {
      dossierCloseBtn.addEventListener('click', (e) => {
        e.preventDefault();
        hideDomainDossier();
      });
    }

    function focusDomainNode(domainId) {
      focusedDomainId = domainId;
      const domain = domainsData[domainId];
      if (!domain) return;

      // Rotate camera to face the node directly
      const nodeAngle = Math.atan2(domain.pos.x, domain.pos.z);
      targetRotationY = -nodeAngle;
      targetRotationX = (domain.pos.y > 0 ? 0.2 : -0.2);

      updateCoreState(CoreState.FOCUSED);
      showDomainDossier(domain);

      // Highlight active HUD tab
      document.querySelectorAll('.domain-hud-btn').forEach(btn => {
        if (parseInt(btn.getAttribute('data-domain')) === domainId) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    }

    // Connect HUD domain buttons & bottom cards
    document.querySelectorAll('.domain-hud-btn, .domain-card').forEach(el => {
      el.addEventListener('click', function (e) {
        const domainId = parseInt(this.getAttribute('data-domain'));
        if (!isNaN(domainId)) {
          focusDomainNode(domainId);
        }
      });
    });

    // Reset Camera Orientation Button
    const btnResetCam = document.getElementById('btn-reset-core-cam');
    if (btnResetCam) {
      btnResetCam.addEventListener('click', (e) => {
        e.preventDefault();
        targetRotationX = 0;
        targetRotationY = 0;
        targetCamDist = defaultCamZ;
        hideDomainDossier();
      });
    }

    // ── 9. Music & Audio Hook Synchronization API ──
    window.setCoreMusicState = function (isPlaying) {
      isMusicActive = isPlaying;
      if (isPlaying) {
        updateCoreState(CoreState.AUDIO);
      } else {
        if (!isSurging && focusedDomainId === null) {
          updateCoreState(CoreState.IDLE);
        }
      }
      if (window.setMusicPlaybackState) {
        window.setMusicPlaybackState(isPlaying);
      }
    };

    // ── 10. Master 3D Animation & Render Loop ──
    const clock = new THREE.Clock();
    let frameCount = 0;

    let isCoreInView = true;
    const coreObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => { isCoreInView = entry.isIntersecting; });
    }, { threshold: 0.05 });
    coreObserver.observe(coreViewport);

    function render3DCoreFrame() {
      requestAnimationFrame(render3DCoreFrame);
      if (!isCoreInView) return; // Zero GPU/CPU overhead when user scrolls down!

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Damping / Inertia on Rotation
      if (!isPointerDown) {
        // Slow continuous idle rotation
        const idleRotSpeed = isMusicActive ? 0.008 : (isSurging ? 0.015 : 0.0025);
        targetRotationY += idleRotSpeed;

        // Apply momentum decay
        targetRotationY += velX;
        targetRotationX += velY;
        velX *= 0.92;
        velY *= 0.92;
      }

      currentRotationY += (targetRotationY - currentRotationY) * 0.08;
      currentRotationX += (targetRotationX - currentRotationX) * 0.08;

      masterCoreGroup.rotation.y = currentRotationY + mouseParallaxX;
      masterCoreGroup.rotation.x = currentRotationX + mouseParallaxY;

      // Smooth Camera Zoom Damping
      currentCamDist += (targetCamDist - currentCamDist) * 0.08;
      camera.position.z = currentCamDist;

      // Update Telemetry HUD
      frameCount++;
      if (frameCount % 6 === 0) {
        if (coreTelemetryRot) {
          const degX = (masterCoreGroup.rotation.x * (180 / Math.PI)).toFixed(1);
          const degY = (masterCoreGroup.rotation.y * (180 / Math.PI)).toFixed(1);
          coreTelemetryRot.textContent = `X: ${degX >= 0 ? '+' : ''}${degX}° | Y: ${degY >= 0 ? '+' : ''}${degY}°`;
        }
        if (coreZoomLevel) {
          const zoomPercent = Math.round((defaultCamZ / currentCamDist) * 100);
          coreZoomLevel.textContent = `${zoomPercent}%`;
        }
      }

      // Audio beat simulation pulse
      if (isMusicActive) {
        audioPulseVal = Math.sin(time * 8.0) * 0.12 + Math.cos(time * 4.0) * 0.06;
      } else {
        audioPulseVal = Math.sin(time * 2.0) * 0.03;
      }

      // ── Animate Inner Reactor Core ──
      const baseCoreScale = (isSurging ? 1.35 : (isMusicActive ? 1.15 : 1.0)) + audioPulseVal;
      coreReactorGroup.scale.set(baseCoreScale, baseCoreScale, baseCoreScale);

      innerCoreMesh.rotation.y += 0.015;
      innerCoreMesh.rotation.x += 0.008;

      outerCageMesh.rotation.y -= 0.009;
      outerCageMesh.rotation.z += 0.012;

      crystalMesh.rotation.x += 0.005;
      crystalMesh.rotation.y -= 0.007;

      innerRing1.rotation.z += 0.03;
      innerRing2.rotation.y -= 0.025;

      // Central Emblem Subtle Breathing Pulse
      const emblemScale = 2.8 + audioPulseVal * 1.5;
      emblemSprite.scale.set(emblemScale, emblemScale, 1);

      // ── Animate Gyroscopic Rings ──
      gyroRings.forEach(ring => {
        const speedMultiplier = isSurging ? 3.0 : (isMusicActive ? 2.2 : 1.0);
        ring.group.rotateOnAxis(ring.axis, ring.baseSpeed * speedMultiplier);
      });

      // ── Animate Energy Surge Shockwave ──
      if (isSurging) {
        surgeTimer += delta;
        const progress = Math.min(1, surgeTimer / surgeDuration);
        const ringScale = 0.5 + progress * 7.5;
        shockwaveMesh.scale.set(ringScale, ringScale, ringScale);
        shockwaveMat.opacity = (1 - progress) * 0.8;
      } else {
        shockwaveMat.opacity = 0;
      }

      // ── Animate 3D Particles & Plexus Connections ──
      const posAttr = particlePointsGeo.attributes.position;
      const positions = posAttr.array;

      let connectionSegmentCount = 0;
      const activeThreshold = (isMusicActive || isSurging) ? connectionDistThreshold * 1.25 : connectionDistThreshold;

      for (let i = 0; i < particleCount; i++) {
        const v = particleVelocities[i];
        
        // Orbital harmonic movement
        const speedMult = isSurging ? 3.0 : (isMusicActive ? 1.8 : 1.0);
        v.angle += v.orbitSpeed * speedMult;
        
        const px = Math.cos(v.angle) * v.radius;
        const pz = Math.sin(v.angle) * v.radius;
        const py = Math.sin(time * 0.8 + v.yPhase) * (v.radius * 0.45);

        positions[i * 3] = px;
        positions[i * 3 + 1] = py;
        positions[i * 3 + 2] = pz;

        // Check proximity with other particles for Plexus lines
        if (connectionSegmentCount < maxConnectionsPerFrame - 10) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = px - positions[j * 3];
            const dy = py - positions[j * 3 + 1];
            const dz = pz - positions[j * 3 + 2];
            const dSq = dx * dx + dy * dy + dz * dz;
            const curThreshSq = (isMusicActive || isSurging) ? threshSq * 1.4 : threshSq;

            if (dSq < curThreshSq) {
              const alpha = (1 - dSq / curThreshSq) * (isMusicActive ? 0.9 : 0.6);
              const idx = connectionSegmentCount * 6;

              // Vertex A
              linePositions[idx] = px;
              linePositions[idx + 1] = py;
              linePositions[idx + 2] = pz;

              lineColors[idx] = particleColors[i * 3] * alpha;
              lineColors[idx + 1] = particleColors[i * 3 + 1] * alpha;
              lineColors[idx + 2] = particleColors[i * 3 + 2] * alpha;

              // Vertex B
              linePositions[idx + 3] = positions[j * 3];
              linePositions[idx + 4] = positions[j * 3 + 1];
              linePositions[idx + 5] = positions[j * 3 + 2];

              lineColors[idx + 3] = particleColors[j * 3] * alpha;
              lineColors[idx + 4] = particleColors[j * 3 + 1] * alpha;
              lineColors[idx + 5] = particleColors[j * 3 + 2] * alpha;

              connectionSegmentCount++;
              if (connectionSegmentCount >= maxConnectionsPerFrame) break;
            }
          }
        }
      }

      posAttr.needsUpdate = true;

      // Update Plexus geometry range
      plexusGeo.setDrawRange(0, connectionSegmentCount * 2);
      plexusGeo.attributes.position.needsUpdate = true;
      plexusGeo.attributes.color.needsUpdate = true;

      if (coreConnCount && frameCount % 12 === 0) {
        coreConnCount.textContent = `${connectionSegmentCount} ACTIVE`;
      }

      // ── Animate Domain Satellite Nodes & Tether Pulses ──
      domainNodes.forEach(node => {
        node.anchor.rotation.y += 0.02;
        node.anchor.rotation.x += 0.01;
        node.ring.rotation.z -= 0.025;

        // Hover scale boost
        const isHovered = node.isHovered || (focusedDomainId === node.data.id);
        const targetScale = isHovered ? 1.45 : 1.0;
        node.anchor.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        node.tetherMat.opacity = isHovered ? 0.75 : (isMusicActive ? 0.45 : 0.25);

        // Advance energy pulse along tether beam into core
        node.pulseProgress += delta * (isMusicActive ? 1.5 : 0.8);
        if (node.pulseProgress > 1.0) node.pulseProgress = 0;

        const pulsePos = node.basePos.clone().lerp(new THREE.Vector3(0, 0, 0), node.pulseProgress);
        node.pulse.position.copy(pulsePos).sub(node.basePos);
      });

      // ── Hover Raycast Detection ──
      raycaster.setFromCamera(pointerCoord, camera);
      const hoverHits = raycaster.intersectObjects(interactiveRaycastObjects, true);

      let foundHover = false;
      domainNodes.forEach(n => n.isHovered = false);

      if (hoverHits.length > 0) {
        const hObj = hoverHits[0].object;
        if (hObj.userData.isDomainNode && hObj.userData.domainId !== undefined) {
          const matched = domainNodes.find(n => n.data.id === hObj.userData.domainId);
          if (matched) matched.isHovered = true;
          foundHover = true;
        } else if (hObj.userData.isCoreCenter) {
          foundHover = true;
        }
      }

      if (!isPointerDown) {
        coreCanvas.style.cursor = foundHover ? 'pointer' : 'grab';
      }

      renderer.render(scene, camera);
    }

    render3DCoreFrame();

    // ── Window Resize Handling ──
    function onCoreViewportResize() {
      const w = coreViewport.clientWidth;
      const h = coreViewport.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener('resize', onCoreViewportResize);
  }

  // =========================================================================
  // ⚡ 2. GLITCH-TEXT DECODING MATRIX ENGINE ⚡
  // =========================================================================
  const decodeChars = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789#@$&%*+=";
  function runTextDecryption(element) {
    const originalText = element.getAttribute('data-text') || element.textContent.trim();
    if (!element.getAttribute('data-text')) element.setAttribute('data-text', originalText);
    
    let iteration = 0;
    let interval = setInterval(() => {
      element.innerHTML = originalText.split("").map((letter, index) => {
        if (index < iteration) return originalText[index];
        if (letter === " ") return " ";
        return `<span class="text-primary font-mono">${decodeChars[Math.floor(Math.random() * decodeChars.length)]}</span>`;
      }).join("");
      
      if (iteration >= originalText.length) clearInterval(interval);
      iteration += 1 / 2;
    }, 24);
  }

  const decodeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runTextDecryption(entry.target);
        decodeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.decode-trigger').forEach(el => decodeObserver.observe(el));

  // =========================================================================
  // ⚡ 3. KINETIC DRAG-TO-THROW GALLERY INERTIA ⚡
  // =========================================================================
  const gallery = document.getElementById('horizontal-swipe-gallery');
  if (gallery) {
    let isDown = false; let startX; let scrollLeft;
    let velocity = 0; let lastX = 0; let lastTime = 0;
    let inertiaInterval = null; let resetTimeout = null;

    function clearSystemTimers() {
      if (inertiaInterval) clearInterval(inertiaInterval);
      if (resetTimeout) clearTimeout(resetTimeout);
    }

    function initAutoResetTimer() {
      if (resetTimeout) clearTimeout(resetTimeout);
      resetTimeout = setTimeout(() => {
        gallery.scrollTo({ left: 0, behavior: 'smooth' });
      }, 10000);
    }

    gallery.addEventListener('mousedown', (e) => {
      isDown = true; gallery.classList.remove('scroll-smooth');
      clearSystemTimers();
      startX = e.pageX - gallery.offsetLeft; scrollLeft = gallery.scrollLeft;
      lastX = e.pageX; lastTime = performance.now(); velocity = 0;
    });

    gallery.addEventListener('mouseleave', () => { if (isDown) { isDown = false; initAutoResetTimer(); } });
    gallery.addEventListener('mouseup', () => {
      isDown = false;
      const elapsed = performance.now() - lastTime;
      if (elapsed > 0 && elapsed < 100) { runMomentumInertia(); } else { initAutoResetTimer(); }
    });

    gallery.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const walk = (e.pageX - gallery.offsetLeft - startX) * 1.5;
      gallery.scrollLeft = scrollLeft - walk;
      const elapsed = performance.now() - lastTime;
      if (elapsed > 0) velocity = (e.pageX - lastX) / elapsed;
      lastX = e.pageX; lastTime = performance.now();
    });

    function runMomentumInertia() {
      clearSystemTimers();
      inertiaInterval = setInterval(() => {
        if (Math.abs(velocity) < 0.05) { clearInterval(inertiaInterval); initAutoResetTimer(); return; }
        gallery.scrollLeft -= velocity * 16; velocity *= 0.94;
      }, 16);
    }

    const leftArrow = document.getElementById('gallery-left-arrow');
    const rightArrow = document.getElementById('gallery-right-arrow');
    if (leftArrow && rightArrow) {
      leftArrow.addEventListener('click', () => { clearSystemTimers(); gallery.scrollTo({ left: gallery.scrollLeft - 340, behavior: 'smooth' }); initAutoResetTimer(); });
      rightArrow.addEventListener('click', () => { clearSystemTimers(); gallery.scrollTo({ left: gallery.scrollLeft + 340, behavior: 'smooth' }); initAutoResetTimer(); });
    }
    initAutoResetTimer();
  }

  // =========================================================================
  // ⚡ 4. 3D "LIQUID METAL" CANVAS MERCURY TRAIL POINTER ⚡
  // =========================================================================
  const mercuryCanvas = document.getElementById('liquid-mercury-canvas');
  if (mercuryCanvas) {
    const mCtx = mercuryCanvas.getContext('2d');
    let points = [];
    let mouse = { x: -100, y: -100, targetX: -100, targetY: -100 };

    function resizeMercury() { mercuryCanvas.width = window.innerWidth; mercuryCanvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeMercury); resizeMercury();

    window.addEventListener('mousemove', (e) => {
      const activeCard = e.target.closest('.interactive-card');
      if (activeCard) {
        const r = activeCard.getBoundingClientRect();
        mouse.targetX = r.left + r.width / 2; mouse.targetY = r.top + r.height / 2;
      } else {
        mouse.targetX = e.clientX; mouse.targetY = e.clientY;
      }
    });

    function drawMercuryFrame() {
      mCtx.clearRect(0, 0, mercuryCanvas.width, mercuryCanvas.height);
      mouse.x += (mouse.targetX - mouse.x) * 0.16;
      mouse.y += (mouse.targetY - mouse.y) * 0.16;
      points.push({ x: mouse.x, y: mouse.y });
      if (points.length > 12) points.shift();

      if (points.length > 1) {
        mCtx.save(); mCtx.beginPath(); mCtx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; i++) { mCtx.lineTo(points[i].x, points[i].y); }
        mCtx.strokeStyle = '#00e0ff'; mCtx.lineWidth = 6; mCtx.lineCap = 'round'; mCtx.lineJoin = 'round';
        mCtx.shadowColor = '#ff00c8'; mCtx.shadowBlur = 12; mCtx.stroke(); mCtx.restore();
      }
      requestAnimationFrame(drawMercuryFrame);
    }
    drawMercuryFrame();
  }

  // =========================================================================
  // ⚡ 5. INTERACTIVE STENCIL PARTICLE BLEED ENGINE ⚡
  // =========================================================================
  const bleedTargets = document.querySelectorAll('.particle-bleed-target');
  bleedTargets.forEach(target => {
    target.addEventListener('mousedown', () => {
      const img = target.querySelector('img');
      if (img) { img.style.filter = 'blur(4px) chromatic-aberration'; img.style.transform = 'scale(0.95)'; img.style.transition = 'all 0.2s ease'; }
    });
    target.addEventListener('mouseup', () => {
      const img = target.querySelector('img');
      if (img) { img.style.filter = ''; img.style.transform = ''; }
    });
  });

  // =========================================================================
  // ⚡ 6. ALWAYS-ON WAVING MOUNTAIN TERRAIN VISUALIZER + DUST ⚡
  // =========================================================================
  const mainVCanvas = document.getElementById('cyber-particle-visualizer-canvas');
  if (mainVCanvas) {
    const vCtx = mainVCanvas.getContext('2d');
    let particles = []; let isTerrainMusicPlaying = false; let waveOffset = 0;

    function resizeVisualizerCanvas() { mainVCanvas.width = window.innerWidth; mainVCanvas.height = window.innerHeight; }
    window.addEventListener('resize', resizeVisualizerCanvas); resizeVisualizerCanvas();

    for (let i = 0; i < 65; i++) {
      particles.push({ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, z: Math.random() * 200, speed: 0.2 + Math.random() * 0.4 });
    }

    function renderSharedVisualizerEngine() {
      vCtx.clearRect(0, 0, mainVCanvas.width, mainVCanvas.height);

      particles.forEach(p => {
        p.z -= p.speed;
        if (p.z <= 0) { p.z = 200; p.x = Math.random() * mainVCanvas.width; p.y = Math.random() * mainVCanvas.height; }
        let pScale = 150 / (150 + p.z);
        let px = p.x * pScale + (mainVCanvas.width / 2) * (1 - pScale);
        let py = p.y * pScale + (mainVCanvas.height / 2) * (1 - pScale);
        vCtx.beginPath(); vCtx.arc(px, py, Math.max(0.5, 2.5 * pScale), 0, Math.PI * 2);
        vCtx.fillStyle = `rgba(0, 224, 255, ${0.15 * pScale})`; vCtx.fill();
      });

      waveOffset += isTerrainMusicPlaying ? 0.08 : 0.02;
      vCtx.save(); vCtx.beginPath();
      const horizonY = mainVCanvas.height * 0.85; vCtx.moveTo(0, mainVCanvas.height);

      for (let x = 0; x <= mainVCanvas.width; x += 20) {
        let baseAmp = isTerrainMusicPlaying ? 35 : 12;
        let sineWaves = baseAmp * Math.sin(x * 0.006 + waveOffset) * Math.cos(x * 0.003 - waveOffset);
        vCtx.lineTo(x, horizonY + sineWaves);
      }
      vCtx.lineTo(mainVCanvas.width, mainVCanvas.height); vCtx.closePath();
      
      let terrainGlow = vCtx.createLinearGradient(0, horizonY - 40, 0, mainVCanvas.height);
      terrainGlow.addColorStop(0, isTerrainMusicPlaying ? 'rgba(255, 0, 200, 0.15)' : 'rgba(0, 224, 255, 0.06)');
      terrainGlow.addColorStop(1, 'transparent');
      
      vCtx.fillStyle = terrainGlow; vCtx.fill();
      vCtx.strokeStyle = isTerrainMusicPlaying ? 'rgba(255, 0, 200, 0.3)' : 'rgba(0, 224, 255, 0.15)';
      vCtx.lineWidth = 1.5; vCtx.stroke(); vCtx.restore();

      requestAnimationFrame(renderSharedVisualizerEngine);
    }
    renderSharedVisualizerEngine();
    window.setMusicPlaybackState = function(state) { isTerrainMusicPlaying = state; };
  }

  // =========================================================================
  // ⚡ 7. AUDIO-PEAK GLITCH VIGNETTE FLASH ⚡
  // =========================================================================
  const appWrapper = document.getElementById('master-app-wrapper');
  window.triggerChromaticGlitchFlash = function() {
    if (!appWrapper) return;
    appWrapper.style.filter = 'hue-rotate(45deg) contrast(1.1) saturate(1.2)';
    setTimeout(() => { appWrapper.style.filter = ''; }, 60);
  };

  // =========================================================================
  // ⚡ 8. HOLOGRAPHIC FOIL CARDS & 3D TILT ⚡
  // =========================================================================
  const holoCards = document.querySelectorAll('.holo-foil-card');
  holoCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      const yPercent = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--holo-x', `${xPercent}%`);
      card.style.setProperty('--holo-y', `${yPercent}%`);
    });
  });

  const tiltCards = document.querySelectorAll('.tilt-3d-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const tiltX = ((rect.height / 2) - (e.clientY - rect.top)) / 14;
      const tiltY = ((e.clientX - rect.left) - (rect.width / 2)) / 14;
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'; });
  });

  // =========================================================================
  // ⚡ 9. INK-BLEED SECTION NAVIGATION TRANSITIONS ⚡
  // =========================================================================
  const inkCanvas = document.getElementById('ink-bleed-canvas');
  const inkCtx = inkCanvas ? inkCanvas.getContext('2d') : null;
  let isBleeding = false; let bleedRadius = 0;
  function resizeInkCanvas() { if (inkCanvas) { inkCanvas.width = window.innerWidth; inkCanvas.height = window.innerHeight; } }
  window.addEventListener('resize', resizeInkCanvas); resizeInkCanvas();

  function runInkBleedAnimation(targetY) {
    if (isBleeding || !inkCanvas || !inkCtx) {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      return;
    }
    isBleeding = true; bleedRadius = 0;
    const maxRadius = Math.max(inkCanvas.width, inkCanvas.height) * 1.2;
    function drawBleedStep() {
      if (bleedRadius < maxRadius) {
        bleedRadius += (maxRadius - bleedRadius) * 0.08 + 15;
        inkCtx.fillStyle = '#07080d'; inkCtx.beginPath();
        for (let i = 0; i < 8; i++) { inkCtx.arc(inkCanvas.width/2, inkCanvas.height/2, bleedRadius * (1 + Math.sin((i*Math.PI)/4 * 3) * 0.15), 0, Math.PI * 2); }
        inkCtx.fill(); requestAnimationFrame(drawBleedStep);
      } else { 
        window.scrollTo({ top: targetY, behavior: 'instant' }); 
        inkCtx.clearRect(0, 0, inkCanvas.width, inkCanvas.height); 
        isBleeding = false; 
      }
    }
    drawBleedStep();
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const target = document.querySelector(targetId);
        if (target) { 
          e.preventDefault(); 
          target.scrollIntoView({ behavior: 'smooth' }); 
        }
      }
    });
  });

  // =========================================================================
  // ⚡ 10. SCROLL REVEAL OBSERVER ⚡
  // =========================================================================
  const revealSections = document.querySelectorAll('.scroll-trigger');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  revealSections.forEach(section => revealObserver.observe(section));
  setTimeout(() => { revealSections.forEach(s => s.classList.add('visible')); }, 400);

  // =========================================================================
  // ⚡ 11. SYNCHRONIZED AUDIO MUTUAL EXCLUSION & 3D CORE LINK ⚡
  // =========================================================================
  const rOrb1 = document.getElementById('reactive-orb-1');
  const rOrb2 = document.getElementById('reactive-orb-2');

  document.querySelectorAll('article').forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.custom-video-play');
    const volumeSlider = container.querySelector('.custom-volume-slider');
    const eqVisualizer = container.querySelector('.eq-visualizer');
    const fullscreenBtn = container.querySelector('.custom-fullscreen-btn');
    if (!video) return;

    video.controls = false; video.removeAttribute('controls');
    video.setAttribute('controlsList', 'nodownload noplaybackspeed');
    video.disablePictureInPicture = true;
    video.addEventListener('contextmenu', e => e.preventDefault());

    if (playBtn) {
      const playIcon = playBtn.querySelector('iconify-icon');
      const label = playBtn.querySelector('.label');
      playBtn.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (video.paused || video.ended) {
          // Mutex: Pause all other media
          document.querySelectorAll('article').forEach(otherContainer => {
            const otherVideo = otherContainer.querySelector('video');
            const otherPlayBtn = otherContainer.querySelector('.custom-video-play');
            const otherEq = otherContainer.querySelector('.eq-visualizer');
            
            if (otherVideo && otherVideo !== video && !otherVideo.paused) {
              otherVideo.pause();
              if (otherPlayBtn) {
                const oIcon = otherPlayBtn.querySelector('iconify-icon');
                const oLabel = otherPlayBtn.querySelector('.label');
                if (oIcon) oIcon.setAttribute('icon', 'lucide:play');
                if (oLabel) oLabel.textContent = 'Play';
              }
              if (otherEq) otherEq.classList.add('hidden');
            }
          });

          if (window.activeGlitchInterval) clearInterval(window.activeGlitchInterval);

          video.play().then(() => {
            if (playIcon) playIcon.setAttribute('icon', 'lucide:pause');
            if (label) label.textContent = 'Pause';
            if (eqVisualizer) eqVisualizer.classList.remove('hidden');
            
            if (rOrb1) rOrb1.classList.add('orb-pulse-fast');
            if (rOrb2) rOrb2.classList.add('orb-pulse-fast');

            // SYNC WITH 3D JD WEB CORE!
            if (window.setCoreMusicState) window.setCoreMusicState(true);
            
            window.triggerChromaticGlitchFlash();
            window.activeGlitchInterval = setInterval(window.triggerChromaticGlitchFlash, 1200);
          }).catch(err => console.log('Audio playback prevented:', err));
        } else {
          video.pause();
          if (playIcon) playIcon.setAttribute('icon', 'lucide:play');
          if (label) label.textContent = 'Play';
          if (eqVisualizer) eqVisualizer.classList.add('hidden');
          
          if (rOrb1) rOrb1.classList.remove('orb-pulse-fast');
          if (rOrb2) rOrb2.classList.remove('orb-pulse-fast');

          // SYNC WITH 3D JD WEB CORE!
          if (window.setCoreMusicState) window.setCoreMusicState(false);
          if (window.activeGlitchInterval) clearInterval(window.activeGlitchInterval);
        }
      });
    }
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', (e) => { e.preventDefault(); if (video.requestFullscreen) video.requestFullscreen(); });
    if (volumeSlider) { video.volume = volumeSlider.value; volumeSlider.addEventListener('input', function() { video.volume = this.value; video.muted = (parseFloat(this.value) === 0); }); }
  });

  // =========================================================================
  // ⚡ 12. LIGHTBOX ZOOM MODAL ⚡
  // =========================================================================
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-target-img');
  if (lightboxModal && lightboxImg) {
    document.querySelectorAll('.portfolio-zoom-img').forEach(img => { 
      img.addEventListener('click', function() { 
        lightboxImg.src = this.src; 
        lightboxModal.classList.add('active'); 
      }); 
    });
    lightboxModal.addEventListener('click', () => { 
      lightboxModal.classList.remove('active'); 
      setTimeout(() => { lightboxImg.src = ""; }, 400); 
    });
  }
});
