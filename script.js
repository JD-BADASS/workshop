// Minimalist Contact Page Portfolio — Shared Master Script
// Upgraded: Synchronized Audio Mutual Exclusion Thread (Auto-Pause Overlapping Audio)

document.addEventListener('DOMContentLoaded', function () {
  
  // ── FEATURE 1: Glitch-Text Decoding Matrix Engine ──
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

  // ── FEATURE 3: Kinetic Drag-to-Throw Gallery Inertia with 10-Sec Auto Reset ──
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

  // ── FEATURE 4: 3D "Liquid Metal" Canvas Mercury Trail Pointer ──
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

  // ── FEATURE 5: Interactive Stencil Particle Bleed Engine ──
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

  // ── FEATURE 7: Always-On Waving Mountain Terrain Visualizer + Dust ──
  const mainVCanvas = document.getElementById('cyber-particle-visualizer-canvas');
  if (mainVCanvas) {
    const vCtx = mainVCanvas.getContext('2d');
    let particles = []; let isMusicPlaying = false; let waveOffset = 0;

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

      waveOffset += isMusicPlaying ? 0.08 : 0.02;
      vCtx.save(); vCtx.beginPath();
      const horizonY = mainVCanvas.height * 0.85; vCtx.moveTo(0, mainVCanvas.height);

      for (let x = 0; x <= mainVCanvas.width; x += 20) {
        let baseAmp = isMusicPlaying ? 35 : 12;
        let sineWaves = baseAmp * Math.sin(x * 0.006 + waveOffset) * Math.cos(x * 0.003 - waveOffset);
        vCtx.lineTo(x, horizonY + sineWaves);
      }
      vCtx.lineTo(mainVCanvas.width, mainVCanvas.height); vCtx.closePath();
      
      let terrainGlow = vCtx.createLinearGradient(0, horizonY - 40, 0, mainVCanvas.height);
      terrainGlow.addColorStop(0, isMusicPlaying ? 'rgba(255, 0, 200, 0.15)' : 'rgba(0, 224, 255, 0.06)');
      terrainGlow.addColorStop(1, 'transparent');
      
      vCtx.fillStyle = terrainGlow; vCtx.fill();
      vCtx.strokeStyle = isMusicPlaying ? 'rgba(255, 0, 200, 0.3)' : 'rgba(0, 224, 255, 0.15)';
      vCtx.lineWidth = 1.5; vCtx.stroke(); vCtx.restore();

      requestAnimationFrame(renderSharedVisualizerEngine);
    }
    renderSharedVisualizerEngine();
    window.setMusicPlaybackState = function(state) { isMusicPlaying = state; };
  }

  // ── FEATURE 8: Audio-Peak Glitch Vignette Displacement Shaker ──
  const appWrapper = document.getElementById('master-app-wrapper');
  function triggerChromaticGlitchFlash() {
    if (!appWrapper) return;
    appWrapper.style.filter = 'hue-rotate(45deg) contrast(1.1) saturate(1.2)';
    setTimeout(() => { appWrapper.style.filter = ''; }, 60);
  }

  // ── FEATURE 9: Holographic Foil Card Angle Tracker ──
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

  // ── Section Fade and Media Triggers ──
  const inkCanvas = document.getElementById('ink-bleed-canvas');
  const inkCtx = inkCanvas.getContext('2d');
  let isBleeding = false; let bleedRadius = 0;
  function resizeInkCanvas() { inkCanvas.width = window.innerWidth; inkCanvas.height = window.innerHeight; }
  window.addEventListener('resize', resizeInkCanvas); resizeInkCanvas();

  function runInkBleedAnimation(targetY) {
    if (isBleeding) return; isBleeding = true; bleedRadius = 0;
    const maxRadius = Math.max(inkCanvas.width, inkCanvas.height) * 1.2;
    function drawBleedStep() {
      if (bleedRadius < maxRadius) {
        bleedRadius += (maxRadius - bleedRadius) * 0.08 + 15;
        inkCtx.fillStyle = '#07080d'; inkCtx.beginPath();
        for (let i = 0; i < 8; i++) { inkCtx.arc(inkCanvas.width/2, inkCanvas.height/2, bleedRadius * (1 + Math.sin((i*Math.PI)/4 * 3) * 0.15), 0, Math.PI * 2); }
        inkCtx.fill(); requestAnimationFrame(drawBleedStep);
      } else { window.scrollTo({ top: targetY, behavior: 'instant' }); inkCtx.clearRect(0, 0, inkCanvas.width, inkCanvas.height); isBleeding = false; }
    }
    drawBleedStep();
  }

  document.querySelectorAll('.ink-trigger').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) { e.preventDefault(); runInkBleedAnimation(target.getBoundingClientRect().top + window.scrollY - 70); }
      }
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

  const revealSections = document.querySelectorAll('.scroll-trigger');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  revealSections.forEach(section => revealObserver.observe(section));
  setTimeout(() => { revealSections.forEach(s => s.classList.add('visible')); }, 400);

  // ── FIXED: Synchronized Audio Exclusion Framework Node Loop ──
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
          // MUTUAL EXCLUSION: Global trace sweep to instantly shut down overlapping player streams
          document.querySelectorAll('article').forEach(otherContainer => {
            const otherVideo = otherContainer.querySelector('video');
            const otherPlayBtn = otherContainer.querySelector('.custom-video-play');
            const otherEq = otherContainer.querySelector('.eq-visualizer');
            
            if (otherVideo && otherVideo !== video && !otherVideo.paused) {
              otherVideo.pause(); // Kill stream layout parameters
              if (otherPlayBtn) {
                const oIcon = otherPlayBtn.querySelector('iconify-icon');
                const oLabel = otherPlayBtn.querySelector('.label');
                if (oIcon) oIcon.setAttribute('icon', 'lucide:play');
                if (oLabel) oLabel.textContent = 'Play';
              }
              if (otherEq) otherEq.classList.add('hidden');
            }
          });

          // Reset generic global intervals from prior runs to keep timing gates accurate
          if (window.activeGlitchInterval) clearInterval(window.activeGlitchInterval);

          video.play().then(() => {
            if (playIcon) playIcon.setAttribute('icon', 'lucide:pause');
            if (label) label.textContent = 'Pause';
            if (eqVisualizer) eqVisualizer.classList.remove('hidden');
            
            if (!container.classList.contains('interactive-card')) {
              if (rOrb1) rOrb1.classList.add('orb-pulse-fast');
              if (rOrb2) rOrb2.classList.add('orb-pulse-fast');
              if (window.setMusicPlaybackState) window.setMusicPlaybackState(true);
              
              triggerChromaticGlitchFlash();
              window.activeGlitchInterval = setInterval(triggerChromaticGlitchFlash, 1200);
            }
          });
        } else {
          video.pause();
          if (playIcon) playIcon.setAttribute('icon', 'lucide:play');
          if (label) label.textContent = 'Play';
          if (eqVisualizer) eqVisualizer.classList.add('hidden');
          
          if (rOrb1) rOrb1.classList.remove('orb-pulse-fast');
          if (rOrb2) rOrb2.classList.remove('orb-pulse-fast');
          if (window.setMusicPlaybackState) window.setMusicPlaybackState(false);
          if (window.activeGlitchInterval) clearInterval(window.activeGlitchInterval);
        }
      });
    }
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', (e) => { e.preventDefault(); if (video.requestFullscreen) video.requestFullscreen(); });
    if (volumeSlider) { video.volume = volumeSlider.value; volumeSlider.addEventListener('input', function() { video.volume = this.value; video.muted = (parseFloat(this.value) === 0); }); }
  });

  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-target-img');
  document.querySelectorAll('.portfolio-zoom-img').forEach(img => { img.addEventListener('click', function() { lightboxImg.src = this.src; lightboxModal.classList.add('active'); }); });
  lightboxModal.addEventListener('click', () => { lightboxModal.classList.remove('active'); setTimeout(() => { lightboxImg.src = ""; }, 400); });
});