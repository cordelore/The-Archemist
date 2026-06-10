// === Reveal on-scroll — pagine fragranza ===
(function () {
  var items = document.querySelectorAll('.frag-anim, .frag-fade-left');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries, o) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visible');
      o.unobserve(e.target);
    });
  }, { threshold: 0.4, rootMargin: '0px 0px -10% 0px' });

  items.forEach(function (el) { obs.observe(el); });
}());
