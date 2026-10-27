/**
 * Mobile menu + accessibility helpers (WCAG 2.1).
 */
(function () {
  'use strict';

  function initMobileMenu() {
    var toggle = document.querySelector('.menu-toggle');
    var overlay = document.getElementById('mobile-menu');
    if (!toggle || !overlay) return;

    var closeBtn = overlay.querySelector('.menu-overlay__close');
    var links = overlay.querySelectorAll('a');
    var lastFocused = null;

    function setOpen(open) {
      overlay.setAttribute('data-open', open ? 'true' : 'false');
      overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.setAttribute('data-menu-open', open ? 'true' : 'false');
      if (open) {
        lastFocused = document.activeElement;
        if (closeBtn) closeBtn.focus();
      } else if (lastFocused && typeof lastFocused.focus === 'function') {
        lastFocused.focus();
      }
    }

    setOpen(false);

    toggle.addEventListener('click', function () {
      setOpen(overlay.getAttribute('data-open') !== 'true');
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () {
        setOpen(false);
      });
    }

    Array.prototype.forEach.call(links, function (a) {
      a.addEventListener('click', function () {
        setOpen(false);
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.getAttribute('data-open') === 'true') {
        setOpen(false);
      }
    });

    // Close if the viewport grows past the mobile breakpoint.
    var mq = window.matchMedia('(min-width: 48rem)');
    function onChange(ev) {
      if (ev.matches) setOpen(false);
    }
    if (mq.addEventListener) mq.addEventListener('change', onChange);
    else if (mq.addListener) mq.addListener(onChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();

/* Back-to-top button: appears once the hero has scrolled away. */
(function () {
  'use strict';
  function init() {
    var btn = document.querySelector('.to-top');
    if (!btn) return;
    var ticking = false;
    function update() {
      btn.setAttribute('data-visible', window.scrollY > 700 ? 'true' : 'false');
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    update();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
