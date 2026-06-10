// === Reveal on-scroll generico (overview + pagine prodotto) ===
// Ogni elemento con [data-reveal] o .feat-anim entra a schermo quando
// raggiunge il viewport, con la stessa estetica fade-up di home/valori.
(function () {
  var els = document.querySelectorAll('[data-reveal], .feat-anim');
  if (!els.length) return;

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var obs = new IntersectionObserver(function (entries, o) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      o.unobserve(e.target);
      e.target.classList.add('is-visible');
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

  els.forEach(function (el) { obs.observe(el); });
}());
