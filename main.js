
    // === Navbar scroll ===
    (function () {
      var nav = document.getElementById('mainNav');
      window.addEventListener('scroll', function () {
        nav.classList.toggle('is-scrolled', window.scrollY > 60);
      }, { passive: true });
    }());

    // === Hamburger menu ===
    (function () {
      var burger = document.getElementById('navBurger');
      var menu   = document.getElementById('mobileMenu');
      var links  = menu.querySelectorAll('a');

      var nav = document.getElementById('mainNav');
      function openMenu() {
        burger.classList.add('is-open');
        burger.setAttribute('aria-expanded', 'true');
        menu.classList.add('is-open');
        menu.setAttribute('aria-hidden', 'false');
        nav.classList.add('nav--menu-open');
        document.body.style.overflow = 'hidden';
      }
      function closeMenu() {
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
        menu.classList.remove('is-open');
        menu.setAttribute('aria-hidden', 'true');
        nav.classList.remove('nav--menu-open');
        document.body.style.overflow = '';
      }

      burger.addEventListener('click', function () {
        menu.classList.contains('is-open') ? closeMenu() : openMenu();
      });

      links.forEach(function (el) {
        el.addEventListener('click', closeMenu);
      });
    }());

    // === Le 7 Essenze — tab system ===
    (function () {
      var tabs   = document.querySelectorAll('.essenze__tab');
      var panels = document.querySelectorAll('.essenze__panel');
      var cta    = document.getElementById('essenzeCta');
      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var frag = this.dataset.frag;
          tabs.forEach(function (t) { t.classList.remove('is-active'); });
          panels.forEach(function (p) { p.classList.remove('is-active'); });
          this.classList.add('is-active');
          var panel = document.querySelector('.essenze__panel[data-frag="' + frag + '"]');
          if (panel) panel.classList.add('is-active');
          if (cta) cta.setAttribute('href', frag + '.html');
        });
      });
    }());

    // === FAQ accordion ===
    (function () {
      var items = document.querySelectorAll('.faq__item');
      items.forEach(function (item) {
        var btn    = item.querySelector('.faq__q');
        var answer = item.querySelector('.faq__a');
        var inner  = item.querySelector('.faq__a-in');

        btn.addEventListener('click', function () {
          var isOpen = item.classList.contains('open');

          items.forEach(function (i) {
            i.classList.remove('open');
            i.querySelector('.faq__a').style.maxHeight = '0';
          });

          if (!isOpen) {
            item.classList.add('open');
            answer.style.maxHeight = inner.scrollHeight + 'px';
          }
        });
      });
    }());

    // === Percentage counter (generic on .m-pct) ===
    (function () {
      var items = document.querySelectorAll('.m-pct');
      if (!items.length) return;

      function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

      function initCounter(el) {
        var duration = 2625;
        var started  = false;
        var cta      = el.closest('.manifesto__cta, .mf-hero__sub');

        function runCounter() {
          var startTs = null;
          requestAnimationFrame(function step(ts) {
            if (!startTs) startTs = ts;
            var progress = Math.min((ts - startTs) / duration, 1);
            el.textContent = Math.round(easeOut(progress) * 100);
            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              if (cta) cta.classList.add('is-visible');
            }
          });
        }

        if (!('IntersectionObserver' in window)) {
          el.textContent = '100';
          if (cta) cta.classList.add('is-visible');
          return;
        }

        var obs = new IntersectionObserver(function (entries, o) {
          entries.forEach(function (e) {
            if (!e.isIntersecting || started) return;
            started = true;
            o.disconnect();
            runCounter();
          });
        }, { threshold: 0.15 });

        var section = el.closest('section');
        if (section) obs.observe(section);
      }

      items.forEach(initCounter);
    }());

    // === Features staggered fade ===
    (function () {
      var items = document.querySelectorAll('#features .feat-anim');

      if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('is-visible'); });
        return;
      }

      var obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          items.forEach(function (el) { el.classList.add('is-visible'); });
          o.disconnect();
        });
      }, { threshold: 0.2 });

      var section = document.getElementById('features');
      if (section) obs.observe(section);
    }());

    // === Prodotti staggered fade ===
    (function () {
      var items = document.querySelectorAll('#prodotti .feat-anim');

      if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('is-visible'); });
        return;
      }

      var obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          items.forEach(function (el) { el.classList.add('is-visible'); });
          o.disconnect();
        });
      }, { threshold: 0.15 });

      var section = document.getElementById('prodotti');
      if (section) obs.observe(section);
    }());

    // === Essenze section entrance ===
    (function () {
      var items = document.querySelectorAll('.ess-anim');

      if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('is-visible'); });
        return;
      }

      var obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          items.forEach(function (el, i) {
            setTimeout(function () { el.classList.add('is-visible'); }, i * 200);
          });
          o.disconnect();
        });
      }, { threshold: 0.1 });

      var section = document.getElementById('essenze');
      if (section) obs.observe(section);
    }());

    // === Rituale scroll ===
    (function () {
      if (!window.matchMedia('(min-width: 769px)').matches) return;

      var section = document.querySelector('.rituale');
      if (!section) return;
      var sticky = section.querySelector('.rituale__sticky');
      var imgs   = section.querySelectorAll('.rituale__img');
      var dots   = section.querySelectorAll('.rituale__dot');
      var N      = imgs.length;
      var current = 0;
      var lastWheel = 0;
      var DEBOUNCE  = 650;

      var observer = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) {
          section.classList.add('is-visible');
          observer.disconnect();
        }
      }, { threshold: 0.15 });
      observer.observe(section);

      function go(next, dir) {
        var prev = current;
        current = next;
        if (dir > 0) {
          imgs[prev].classList.remove('is-active');
          imgs[prev].classList.add('is-above');
          imgs[current].classList.remove('is-above');
          imgs[current].classList.add('is-active');
        } else {
          imgs[prev].classList.remove('is-active');
          imgs[current].classList.remove('is-above');
          imgs[current].classList.add('is-active');
        }
        dots.forEach(function(el, i) { el.classList.toggle('is-active', i === current); });
      }

      sticky.addEventListener('wheel', function(e) {
        var dir = e.deltaY > 0 ? 1 : -1;
        if (dir < 0 && current === 0)     return;
        if (dir > 0 && current === N - 1) return;
        e.preventDefault();
        var now = Date.now();
        if (now - lastWheel < DEBOUNCE) return;
        lastWheel = now;
        go(current + dir, dir);
      }, { passive: false });

      sticky.addEventListener('touchstart', function() {
        sticky.style.transform = 'scale(1.018)';
        sticky.style.boxShadow = '0 36px 88px rgba(71,55,40,0.18)';
      }, { passive: true });
      sticky.addEventListener('touchend', function() {
        sticky.style.transform = '';
        sticky.style.boxShadow = '';
      }, { passive: true });
    }());

    // === FAQ staggered entrance ===
    (function () {
      var items = document.querySelectorAll('.faq__item');

      if (!('IntersectionObserver' in window)) {
        items.forEach(function (el) { el.classList.add('is-visible'); });
        return;
      }

      var obs = new IntersectionObserver(function (entries, o) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          items.forEach(function (el, i) {
            setTimeout(function () { el.classList.add('is-visible'); }, i * 120);
          });
          o.disconnect();
        });
      }, { threshold: 0.1 });

      var section = document.getElementById('faq');
      if (section) obs.observe(section);
    }());

    // === Noor hover-swap ===
    document.querySelectorAll('.essenze__img--hover').forEach(function(el) {
      el.addEventListener('touchstart', function() { el.classList.add('is-touched'); }, { passive: true });
      el.addEventListener('touchend',   function() { el.classList.remove('is-touched'); }, { passive: true });
    });

    // === Scroll-driven background video (manifesto → features → essenze) ===
    function initScrollVideo() {
      var wrap  = document.getElementById('scrollVideo');
      var video = document.getElementById('scrollVideoEl');
      if (!wrap || !video) return;
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

      gsap.registerPlugin(ScrollTrigger);

      function init() {
        var duration = video.duration;
        if (!isFinite(duration) || duration <= 0) return;
        var mid = duration / 2;

        function setupTweens() {
          // Pinner: finché manifesto top NON tocca il viewport top, blocca currentTime a 0.
          // Serve a coprire la finestra in cui manifesto è già visibile dal basso ma Tween 1
          // non si è ancora attivato — altrimenti il primo frame mostrato non è il frame 0.
          ScrollTrigger.create({
            trigger: '#manifesto',
            start: 'top bottom',
            end: 'top top',
            onUpdate: function (self) {
              if (self.progress < 1 && video.currentTime !== 0) {
                video.currentTime = 0;
              }
            }
          });

          // Tween 1: 0 → mid sul range di #manifesto
          gsap.fromTo(video,
            { currentTime: 0 },
            {
              currentTime: mid,
              ease: 'none',
              scrollTrigger: {
                trigger: '#manifesto',
                start: 'top top',
                endTrigger: '#features',
                end: 'top top',
                scrub: true,
                onLeaveBack: function () { video.currentTime = 0; }
              }
            }
          );

          // Tween 2: mid → duration dal top di #features al bottom di #essenze.
          gsap.fromTo(video,
            { currentTime: mid, immediateRender: false },
            {
              currentTime: duration,
              ease: 'none',
              scrollTrigger: {
                trigger: '#features',
                start: 'top top',
                endTrigger: '#essenze',
                end: 'bottom bottom',
                scrub: true
              }
            }
          );
        }

        // Forza il decode del frame 0 prima di registrare i tween,
        // così il browser ha un frame pronto da mostrare appena lo scroll entra in manifesto.
        var done = false;
        function go() {
          if (done) return;
          done = true;
          setupTweens();
        }
        video.addEventListener('seeked', go, { once: true });
        try { video.currentTime = 0.0001; } catch (e) { go(); }
        // Safety: se 'seeked' non scatta entro 500ms, parti comunque.
        setTimeout(go, 500);
      }

      if (video.readyState >= 2 && isFinite(video.duration) && video.duration > 0) {
        init();
      } else {
        video.addEventListener('canplay', init, { once: true });
      }
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initScrollVideo);
    } else {
      initScrollVideo();
    }

    // === Reveal CTA generico (rituale / manifesto / valori) ===
    (function () {
      var items = document.querySelectorAll('.cta-reveal, .cta-reveal-left');
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

    // === Nav dropdown (desktop click toggle + mobile accordion) ===
    (function () {
      var items = document.querySelectorAll('.nav__item--has-sub');
      if (!items.length) return;

      function closeAll(except) {
        items.forEach(function (it) {
          if (it !== except) it.classList.remove('is-open');
        });
      }

      items.forEach(function (item) {
        var toggle = item.querySelector('.nav__sub-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', function (e) {
          e.stopPropagation();
          var willOpen = !item.classList.contains('is-open');
          closeAll(item);
          item.classList.toggle('is-open', willOpen);
        });
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (e.target.closest('.nav__item--has-sub')) return;
        closeAll(null);
      });

      // Close on Esc
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeAll(null);
      });
    }());
