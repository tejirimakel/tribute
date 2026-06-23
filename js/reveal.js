/* Scroll-reveal animations (vanilla replacement for plugin.js `onStep`).
   Reveals elements with class `.onStep` once, when they enter the viewport,
   by applying animate.css classes from `data-animation`, after `data-time` ms.
   Respects prefers-reduced-motion: elements are simply shown, no animation. */
(function () {
  'use strict';

  function init() {
    var items = document.querySelectorAll('.onStep');
    if (!items.length) return;

    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // No IntersectionObserver (or reduced motion) -> just reveal everything.
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var animation = el.getAttribute('data-animation');
        var delay = parseInt(el.getAttribute('data-time'), 10) || 0;
        window.setTimeout(function () {
          el.classList.add('is-visible');
          if (animation) el.classList.add('animated', animation);
        }, delay);
        obs.unobserve(el); // animate once
      });
    }, { threshold: 0.15 });

    items.forEach(function (el) { observer.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
