export function initNavbar({ header }) {
  if (!header) return;

  const links = Array.from(header.querySelectorAll('a[href^="#"]'));
  const sections = links
    .map((a) => {
      const id = a.getAttribute('href')?.slice(1);
      if (!id) return null;
      const el = document.getElementById(id);
      return el ? { link: a, el } : null;
    })
    .filter(Boolean);

  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

      if (!visible) return;

      for (const s of sections) {
        if (s.el === visible.target) {
          s.link.setAttribute('aria-current', 'page');
        } else {
          s.link.removeAttribute('aria-current');
        }
      }
    },
    { rootMargin: '-40% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
  );

  for (const s of sections) observer.observe(s.el);
}
