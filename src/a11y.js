/**
 * Accessibility enhancements for WCAG 2.1 compliance
 */
(function () {
  'use strict';

  function initMobileMenu() {
    var details = document.querySelector('.nav-header details');
    if (!details) return;

    var summary = details.querySelector('summary');
    if (!summary) return;

    function setExpanded(open) {
      summary.setAttribute('aria-expanded', String(!!open));
      summary.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    setExpanded(details.open);

    details.addEventListener('toggle', function () {
      setExpanded(details.open);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }
})();
