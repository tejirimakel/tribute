/* Page bootstrap (vanilla, no jQuery).
   Hides the preloader once the page (or a fallback timeout) is ready and
   initialises the GLightbox photo gallery. */
(function () {
  'use strict';

  function hidePreloader() {
    var loader = document.querySelector('.preloader');
    if (!loader || loader.classList.contains('is-hidden')) return;
    loader.classList.add('is-hidden');
    window.setTimeout(function () { loader.style.display = 'none'; }, 700);
  }

  // Hide on load, but guarantee removal even if an asset never finishes
  // loading (slow/broken network) so the page can never stay covered.
  window.addEventListener('load', hidePreloader);
  window.setTimeout(hidePreloader, 5000);

  function initGallery() {
    if (typeof window.GLightbox === 'function') {
      window.GLightbox({ selector: '.glightbox', loop: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
