/* Fade content in as it scrolls into view. Only elements that start below
   the first screen are hidden, so nothing visible on load ever flickers; with
   reduced motion or no IntersectionObserver everything simply stays visible. */
(function () {
  if (!('IntersectionObserver' in window)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const pending = Array.from(document.querySelectorAll('[data-reveal]'))
    .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
  if (!pending.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -10% 0px' });

  pending.forEach((el) => {
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
