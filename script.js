// Minimalist Contact Page Portfolio — Shared Script
// Injected Music-Reactive Orbs & Canvas Ink-Bleed Section Smooth Scrollers

document.addEventListener('DOMContentLoaded', function () {
  
  // 1. NEW: Canvas Ink-Bleed Transition Scroller Engine
  const inkCanvas = document.getElementById('ink-bleed-canvas');
  const inkCtx = inkCanvas.getContext('2d');
  let isBleeding = false;
  let bleedRadius = 0;

  function resizeInkCanvas() {
    inkCanvas.width = window.innerWidth;
    inkCanvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeInkCanvas);
  resizeInkCanvas();

  function runInkBleedAnimation(targetY) {
    if (isBleeding) return;
    isBleeding = true;
    bleedRadius = 0;
    
    const maxRadius = Math.max(inkCanvas.width, inkCanvas.height) * 1.2;
    const centerX = inkCanvas.width / 2;
    const centerY = inkCanvas.height / 2;

    function drawBleedStep() {
      if (bleedRadius < maxRadius) {
        bleedRadius += (maxRadius - bleedRadius) * 0.08 + 15; // Elastic ink flow
        
        inkCtx.fillStyle = '#07080d';
        inkCtx.beginPath();
        // Render stylized jagged ink blot shapes via multi-arc paths
        for (let i = 0; i < 8; i++) {
          const angle = (i * Math.PI) / 4;
          const currentR = bleedRadius * (1 + Math.sin(angle * 3) * 0.15);
          inkCtx.arc(centerX, centerY, currentR, 0, Math.PI * 2);
        }
        inkCtx.fill();
        
        requestAnimationFrame(drawBleedStep);
      } else {
        // Once screen is fully blanketed by ink veil, scroll view and fade back down cleanly
        window.scrollTo({ top: targetY, behavior: 'instant' });
        inkCtx.clearRect(0, 0, inkCanvas.width, inkCanvas.height);
        isBleeding = false;
      }
    }
    drawBleedStep();
  }

  // Intercept trigger clicks to pipe them into the ink transition thread safely
  document.querySelectorAll('.ink-trigger').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const targetY = target.getBoundingClientRect().top + window.scrollY - 70;
          runInkBleedAnimation(targetY);
        }
      }
    });
  });

  // 2. Prevent default submission behaviors
  document.querySelectorAll('form').forEach(function (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); });
  });

  // 3. Immersive Scroll Trigger Reveal Animation
  const revealSections = document.querySelectorAll('.scroll-trigger');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  revealSections.forEach(section => revealObserver.observe(section));
  setTimeout(() => {
    revealSections.forEach(s => s.classList.add('visible'));
  }, 400);

  // 4. Magnet Mouse Button Tracking Animation
  const magnetButtons = document.querySelectorAll('.magnet-btn');
  magnetButtons.forEach(btn => {
    btn.addEventListener('mousemove', function(e) {
      const position = btn.getBoundingClientRect();
      const x = e.clientX - position.left - position.width / 2;
      const y = e.clientY - position.top - position.height / 2;
      btn.style.transform = `translate(${x * 0.35}px, ${y * 0.45}px) scale(1.04)`;
    });
    btn.addEventListener('mouseleave', function() {
      btn.style.transform = '';
    });
  });

  // 5. Custom Secured Media Controller Logic with NEW: Music-Reactive Orb Links
  const mediaContainers = document.querySelectorAll('article');
  const rOrb1 = document.getElementById('reactive-orb-1');
  const rOrb2 = document.getElementById('reactive-orb-2');
  
  mediaContainers.forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.custom-video-play');
    const volumeSlider = container.querySelector('.custom-volume-slider');
    const eqVisualizer = container.querySelector('.eq-visualizer');
    const fullscreenBtn = container.querySelector('.custom-fullscreen-btn');
    
    if (!video) return;

    video.controls = false;
    video.removeAttribute('controls');
    video.setAttribute('controlsList', 'nodownload noplaybackspeed');
    video.disablePictureInPicture = true;
    video.addEventListener('contextmenu', e => e.preventDefault());

    if (playBtn) {
      const playIcon = playBtn.querySelector('iconify-icon');
      const label = playBtn.querySelector('.label');

      playBtn.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (video.paused || video.ended) {
          video.play().then(() => {
            if (playIcon) playIcon.setAttribute('icon', 'lucide:pause');
            if (label) label.textContent = 'Pause';
            if (eqVisualizer) eqVisualizer.classList.remove('hidden');
            
            // Toggle reactive pulsing layout if chosen track is an audio track file stream
            if (!container.classList.contains('interactive-card')) {
              if (rOrb1) rOrb1.classList.add('orb-pulse-fast');
              if (rOrb2) rOrb2.classList.add('orb-pulse-fast');
            }
          }).catch(err => console.log("Playback safely handled:", err));
          
        } else {
          video.pause();
          if (playIcon) playIcon.setAttribute('icon', 'lucide:play');
          if (label) label.textContent = 'Play';
          if (eqVisualizer) eqVisualizer.classList.add('hidden');
          
          if (rOrb1) rOrb1.classList.remove('orb-pulse-fast');
          if (rOrb2) rOrb2.classList.remove('orb-pulse-fast');
        }
      });
    }

    if (fullscreenBtn) {
      fullscreenBtn.addEventListener('click', function(e) {
        e.preventDefault();
        if (video.requestFullscreen) { video.requestFullscreen(); }
        else if (video.webkitRequestFullscreen) { video.webkitRequestFullscreen(); }
      });
    }

    if (volumeSlider) {
      video.volume = volumeSlider.value;
      volumeSlider.addEventListener('input', function () {
        video.volume = this.value;
        video.muted = (parseFloat(this.value) === 0);
      });
    }
  });

  // 6. Immersive Image Pop-out Lightbox Engine Implementation
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-target-img');
  const zoomableImages = document.querySelectorAll('.portfolio-zoom-img');

  zoomableImages.forEach(img => {
    img.addEventListener('click', function() {
      lightboxImg.src = this.src;
      lightboxImg.alt = this.alt;
      lightboxModal.classList.add('active');
    });
  });

  lightboxModal.addEventListener('click', function() {
    lightboxModal.classList.remove('active');
    setTimeout(() => { lightboxImg.src = ""; }, 400);
  });

  // 7. Clickable Arrow Controls for Horizontal Gallery Navigation
  const gallery = document.getElementById('horizontal-swipe-gallery');
  const leftArrow = document.getElementById('gallery-left-arrow');
  const rightArrow = document.getElementById('gallery-right-arrow');

  if (gallery && leftArrow && rightArrow) {
    const scrollAmount = 340; 
    rightArrow.addEventListener('click', function() {
      gallery.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
    leftArrow.addEventListener('click', function() {
      gallery.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

});

window.UIUtils = {
  toggleElement: function (selector) {
    var el = document.querySelector(selector);
    if (el) el.style.display = el.style.display === 'none' ? '' : 'none';
  },
};
