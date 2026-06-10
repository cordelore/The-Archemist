// === VALORI PAGE ===

// === Scroll-in animations (philo, pillars, inno) — stile "prodotti" ===
(function () {
  var defs = [
    { parent: '.vl-philo',   sel: '.vl-philo__item' },
    { parent: '.vl-pillars', sel: '.vl-pillar' },
    { parent: '.vl-inno',    sel: '.vl-inno__item' }
  ];

  var groups = [];
  var allItems = [];

  defs.forEach(function (d) {
    var parent = document.querySelector(d.parent);
    if (!parent) return;
    var items = Array.prototype.slice.call(parent.querySelectorAll(d.sel));
    if (!items.length) return;
    items.forEach(function (el) { el.classList.add('vl-reveal'); });
    groups.push({ parent: parent, items: items });
    allItems = allItems.concat(items);
  });

  if (!('IntersectionObserver' in window)) {
    allItems.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var isDesktop = window.matchMedia('(min-width: 769px)').matches;

  if (isDesktop) {
    // Desktop: il gruppo intero entra insieme, lo stagger è nei delay CSS
    groups.forEach(function (g) {
      var obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          o.disconnect();
          g.items.forEach(function (el) { el.classList.add('is-visible'); });
        });
      }, { threshold: 0.2 });
      obs.observe(g.parent);
    });
  } else {
    // Mobile: ogni elemento appare man mano che lo scrolli a schermo
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        o.unobserve(e.target);
        e.target.classList.add('is-visible');
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    allItems.forEach(function (el) { obs.observe(el); });
  }
}());

// Counter dei 3 numeri "Impegno" al primo ingresso nel viewport

(function () {
  var wrap = document.getElementById('vlNumbers');
  if (!wrap) return;

  var digits = wrap.querySelectorAll('.vl-num__digit');
  var started = false;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateDigit(el, from, to, duration) {
    var startTs = null;
    requestAnimationFrame(function step(ts) {
      if (!startTs) startTs = ts;
      var p = Math.min((ts - startTs) / duration, 1);
      var val = Math.round(from + (to - from) * easeOut(p));
      el.textContent = val;
      if (p < 1) requestAnimationFrame(step);
    });
  }

  function runDigit(el) {
    var from = parseInt(el.dataset.from || '0', 10);
    var to   = parseInt(el.dataset.to   || '0', 10);
    animateDigit(el, from, to, 1400);
  }

  if (!('IntersectionObserver' in window)) {
    digits.forEach(function (el) {
      el.textContent = el.dataset.to || '0';
    });
    return;
  }

  var isDesktop = window.matchMedia('(min-width: 769px)').matches;

  if (isDesktop) {
    // Desktop: i 3 numeri partono insieme al primo ingresso
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || started) return;
        started = true;
        o.disconnect();
        digits.forEach(runDigit);
      });
    }, { threshold: 0.35 });
    obs.observe(wrap);
  } else {
    // Mobile: ogni numero parte quando lo scrolli a schermo
    var nums = wrap.querySelectorAll('.vl-num');
    var obs2 = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        o.unobserve(e.target);
        var d = e.target.querySelectorAll('.vl-num__digit');
        d.forEach(runDigit);
      });
    }, { threshold: 0.45, rootMargin: '0px 0px -8% 0px' });
    nums.forEach(function (n) { obs2.observe(n); });
  }
}());
