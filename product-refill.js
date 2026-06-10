
    // === Entrance stagger ===
    (function () {
      var page = document.querySelector('.product-page');
      if (page) setTimeout(function () { page.classList.add('is-loaded'); }, 60);
    }());

    // === Gallery swap — crossfade ===
    (function () {
      var mainImg = document.getElementById('pgalleryMain');
      var thumbs  = document.querySelectorAll('.pgallery__thumb');

      thumbs.forEach(function (thumb) {
        thumb.addEventListener('click', function () {
          var newSrc = this.dataset.src;
          var self   = this;
          mainImg.style.opacity = '0';
          setTimeout(function () {
            mainImg.src = newSrc;
            mainImg.style.opacity = '1';
          }, 310);
          thumbs.forEach(function (t) { t.classList.remove('is-active'); });
          self.classList.add('is-active');
        });
      });
    }());

    // === Fragrance picker + propagazione --active-frag ===
    (function () {
      var page  = document.querySelector('.product-page');
      var dots  = document.querySelectorAll('.pscent');
      var label = document.getElementById('pscentName');

      // Swap immagine galleria per fragranza: attivo solo se almeno un dot
      // espone data-img (così le altre pagine prodotto restano invariate).
      var mainImg    = document.getElementById('pgalleryMain');
      var hasFragImg = Array.prototype.some.call(dots, function (d) { return d.dataset.img; });
      var defaultImg = mainImg ? mainImg.getAttribute('src') : null;

      function setImg(dot) {
        if (!hasFragImg || !mainImg) return;
        var src = dot.dataset.img || defaultImg;
        if (!src || mainImg.getAttribute('src') === src) return;
        mainImg.style.opacity = '0';
        setTimeout(function () {
          mainImg.src = src;
          mainImg.style.opacity = '1';
        }, 310);
      }

      function setFrag(dot) {
        var col = getComputedStyle(dot).getPropertyValue('--frag-col').trim();
        if (page && col) page.style.setProperty('--active-frag', col);
      }

      var initial = document.querySelector('.pscent.is-selected');
      if (initial) { setFrag(initial); setImg(initial); }

      dots.forEach(function (dot) {
        dot.addEventListener('click', function () {
          dots.forEach(function (d) { d.classList.remove('is-selected'); });
          this.classList.add('is-selected');
          setFrag(this);
          setImg(this);
          label.style.opacity = '0';
          var name = this.dataset.name;
          setTimeout(function () {
            label.textContent = name;
            label.style.opacity = '1';
          }, 140);
        });
      });
    }());

    // === Quantity stepper ===
    (function () {
      var val   = document.getElementById('pqtyVal');
      var minus = document.getElementById('pqtyMinus');
      var plus  = document.getElementById('pqtyPlus');

      minus.addEventListener('click', function () {
        var n = parseInt(val.value, 10);
        if (n > 1) val.value = n - 1;
      });

      plus.addEventListener('click', function () {
        var n = parseInt(val.value, 10);
        if (n < 99) val.value = n + 1;
      });
    }());

    // === Product tabs + sliding indicator ===
    (function () {
      var tabs   = document.querySelectorAll('.ptab');
      var panels = document.querySelectorAll('.ppanel');
      var slider = document.getElementById('ptabsSlider');

      function moveSlider(tab) {
        if (!slider) return;
        slider.style.left  = tab.offsetLeft + 'px';
        slider.style.width = tab.offsetWidth + 'px';
      }

      var active = document.querySelector('.ptab.is-active');
      if (active) moveSlider(active);

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          var key = this.dataset.panel;

          tabs.forEach(function (t) {
            t.classList.remove('is-active');
            t.setAttribute('aria-selected', 'false');
          });
          panels.forEach(function (p) { p.classList.remove('is-active'); });

          this.classList.add('is-active');
          this.setAttribute('aria-selected', 'true');
          moveSlider(this);

          var panel = document.querySelector('.ppanel[data-panel="' + key + '"]');
          if (panel) {
            panel.classList.add('is-active');
            // assicura che eventuali elementi reveal del pannello siano visibili
            panel.querySelectorAll('[data-reveal]').forEach(function (el) {
              el.classList.add('is-visible');
            });
          }
        });
      });

      window.addEventListener('resize', function () {
        var cur = document.querySelector('.ptab.is-active');
        if (cur) moveSlider(cur);
      }, { passive: true });
    }());
