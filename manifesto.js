// === MANIFESTO PAGE ===
// 1. Reveal hero al load
// 2. Parallax foto hero su scroll
// 3. Reveal capitoli su IntersectionObserver
// 4. Counter numeri appendice "Impegno"

(function () {

  // ----- 1. HERO reveal (clip-path slide-up) -----
  function triggerHero() {
    document.body.classList.add('is-loaded');
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      requestAnimationFrame(triggerHero);
    });
  } else {
    requestAnimationFrame(triggerHero);
  }

  // ----- 2. Parallax foto hero -----
  var heroBg = document.getElementById('mfHeroBg');
  var heroSection = document.getElementById('mfHero');
  if (heroBg && heroSection && window.matchMedia('(min-width: 601px)').matches) {
    var ticking = false;
    function updateParallax() {
      var rect = heroSection.getBoundingClientRect();
      // Visible only while hero overlaps viewport
      if (rect.bottom < 0 || rect.top > window.innerHeight) {
        ticking = false;
        return;
      }
      // scrollProgress 0 (hero top at viewport top) → -100 px
      var scrolled = Math.max(0, -rect.top);
      var translate = scrolled * 0.35;
      heroBg.style.transform = 'translate3d(0,' + translate + 'px,0)';
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
    updateParallax();
  }

  // ----- 3. Reveal capitoli -----
  var chapters = document.querySelectorAll('.mf-chap');
  if (chapters.length) {
    if (!('IntersectionObserver' in window)) {
      chapters.forEach(function (el) { el.classList.add('is-visible'); });
    } else {
      var chapObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          e.target.classList.add('is-visible');
          chapObs.unobserve(e.target);
        });
      }, { threshold: 0.2 });
      chapters.forEach(function (el) { chapObs.observe(el); });
    }
  }

  // ----- Archetype colors (data-color → --frag-col) -----
  (function () {
    var archs = document.querySelectorAll('.mf-arch');
    archs.forEach(function (el) {
      var color = el.dataset.color;
      if (color) el.style.setProperty('--frag-col', color);
    });
  }());

}());
