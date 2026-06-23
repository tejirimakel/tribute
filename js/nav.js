/* Navigation (vanilla, no jQuery).
   Sticky/condensing header, mobile menu overlay, smooth in-page scroll,
   scroll-spy active link, and the back-to-top button. */
(function () {
  'use strict';

  function init() {
    var header   = document.getElementById('site-header');
    var nav      = document.getElementById('primary-nav');
    var toggle   = document.getElementById('nav-toggle');
    var toTop     = document.getElementById('totop');
    var links    = Array.prototype.slice.call(document.querySelectorAll('.scroll-link'));
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link'));

    var reduceMotion = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- mobile menu ------------------------------------------------------
    function setMenu(open) {
      if (!nav) return;
      nav.classList.toggle('is-open', open);
      if (toggle) {
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      }
      document.body.style.overflow = open ? 'hidden' : '';
    }
    function isOpen() { return nav && nav.classList.contains('is-open'); }

    if (toggle) toggle.addEventListener('click', function () { setMenu(!isOpen()); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { setMenu(false); toggle && toggle.focus(); }
    });

    // ---- smooth in-page scrolling ----------------------------------------
    function headerOffset() { return header ? header.offsetHeight : 0; }

    links.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var href = link.getAttribute('href') || '';
        if (href.charAt(0) !== '#' || href === '#') return;
        var target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        setMenu(false);
        var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset() + 1;
        window.scrollTo({ top: top, behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });

    // ---- condensing header + back-to-top ---------------------------------
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (header) header.classList.toggle('scrolled', y > 40);
      if (toTop)  toTop.classList.toggle('is-visible', y >= 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });

    // ---- scroll-spy -------------------------------------------------------
    var sections = Array.prototype.slice.call(
      document.querySelectorAll('main section[id]')
    );
    if ('IntersectionObserver' in window && sections.length) {
      var spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.classList.toggle('actived', link.getAttribute('href') === '#' + id);
          });
        });
      }, { rootMargin: '-50% 0px -50% 0px', threshold: 0 });
      sections.forEach(function (s) { spy.observe(s); });
    }

    // ---- dynamic copyright year ------------------------------------------
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
