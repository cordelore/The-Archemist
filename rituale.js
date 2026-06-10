// === IL RITUALE PAGE ===

// Forza il caricamento dall'alto (evita che Live Server / il browser
// ripristini una posizione di scroll più avanti nella pagina).
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.addEventListener('load', function () { window.scrollTo(0, 0); });

// Trigger hero load animation
document.addEventListener('DOMContentLoaded', function () {
  window.scrollTo(0, 0);
  requestAnimationFrame(function () {
    document.body.classList.add('is-loaded');
  });
});

// Parole-chiave intro: entrano una dopo l'altra (stagger via CSS)
(function () {
  var wrap = document.querySelector('.rt-keywords');
  if (!wrap) return;
  var words = Array.prototype.slice.call(wrap.querySelectorAll('.rt-word'));
  if (!words.length) return;

  if (!('IntersectionObserver' in window)) {
    words.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries, o) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      o.disconnect();
      words.forEach(function (el) { el.classList.add('is-visible'); });
    });
  }, { threshold: 0.6 });
  obs.observe(wrap);
}());

// Scroll-in animations sui blocchi metodo
(function () {
  var methods = Array.prototype.slice.call(document.querySelectorAll('.rt-method'));
  if (!methods.length) return;

  if (!('IntersectionObserver' in window)) {
    methods.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var isDesktop = window.matchMedia('(min-width: 769px)').matches;

  if (isDesktop) {
    // Desktop: il blocco intero entra insieme
    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        o.unobserve(e.target);
        e.target.classList.add('is-visible');
      });
    }, { threshold: 0.15 });
    methods.forEach(function (el) { obs.observe(el); });
  } else {
    // Mobile: ogni elemento (titolo, step, immagine) entra man mano che scrolli
    var items = [];
    methods.forEach(function (m) {
      var head = m.querySelector('.rt-method__head');
      var img  = m.querySelector('.rt-method__img');
      var steps = Array.prototype.slice.call(m.querySelectorAll('.rt-step'));
      if (head) items.push(head);
      steps.forEach(function (s) { items.push(s); });
      if (img) items.push(img);
    });
    items.forEach(function (el) { el.classList.add('rt-m-reveal'); });

    var obs = new IntersectionObserver(function (entries, o) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        o.unobserve(e.target);
        e.target.classList.add('is-visible');
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -8% 0px' });
    items.forEach(function (el) { obs.observe(el); });
  }
}());
