// Minimalist Contact Page Portfolio — Shared Script
// Added Immersive Motion Tracking & Visual EQ Automation Hooks

document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Smooth scroll anchor engine
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) { 
        e.preventDefault(); 
        target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
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
  // Manually force reveal sections if observer delayed
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

  // 5. Custom Secured Media Controller Logic with Dynamic Visual EQ Action
  const mediaContainers = document.querySelectorAll('article');
  
  mediaContainers.forEach(container => {
    const video = container.querySelector('video');
    const playBtn = container.querySelector('.custom-video-play');
    const volumeSlider = container.querySelector('.custom-volume-slider');
    const eqVisualizer = container.querySelector('.eq-visualizer');
    
    if (!video) return;

    // Secure measures: Block unwanted native actions completely
    video.controls = false;
    video.removeAttribute('controls');
    video.setAttribute('controlsList', 'nodownload noplaybackspeed');
    video.disablePictureInPicture = true;
    
    video.load();
    video.addEventListener('contextmenu', e => e.preventDefault());

    // Play/Pause interaction hooks
    if (playBtn) {
      const playIcon = playBtn.querySelector('.play-icon');
      const label = playBtn.querySelector('.label');

      playBtn.addEventListener('click', function (e) {
        e.preventDefault();
        
        if (video.paused || video.ended) {
          // Sleep active streams to prioritize user selection focus
          document.querySelectorAll('video').forEach(v => {
            if (v !== video) {
              v.pause();
              const otherArticle = v.closest('article');
              if (otherArticle) {
                const otherBtn = otherArticle.querySelector('.custom-video-play');
                const otherEq = otherArticle.querySelector('.eq-visualizer');
                if (otherBtn) {
                  const oIcon = otherBtn.querySelector('.play-icon');
                  const oLabel = otherBtn.querySelector('.label');
                  if (oIcon) oIcon.setAttribute('icon', 'lucide:play');
                  if (oLabel) oLabel.textContent = 'Play';
                }
                if (otherEq) otherEq.classList.add('hidden');
              }
            }
          });

          // Play chosen track stream
          video.play().then(() => {
            if (playIcon) playIcon.setAttribute('icon', 'lucide:pause');
            if (label) label.textContent = 'Pause';
            if (eqVisualizer) eqVisualizer.classList.remove('hidden');
          }).catch(err => console.log("Playback target interrupted safely:", err));
          
        } else {
          video.pause();
          if (playIcon) playIcon.setAttribute('icon', 'lucide:play');
          if (label) label.textContent = 'Play';
          if (eqVisualizer) eqVisualizer.classList.add('hidden');
        }
      });
    }

    // Volume level logic slider mapping
    if (volumeSlider) {
      video.volume = volumeSlider.value;
      volumeSlider.addEventListener('input', function () {
        video.volume = this.value;
        video.muted = (parseFloat(this.value) === 0);
      });
    }
  });

});

window.UIUtils = {
  toggleElement: function (selector) {
    var el = document.querySelector(selector);
    if (el) el.style.display = el.style.display === 'none' ? '' : 'none';
  },
};