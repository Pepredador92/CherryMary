import { invariant } from '../utils/validate.js';

export function createCarousel({ root, items, prevButton, nextButton, liveRegion }) {
  invariant(root, 'Carousel: root requerido');
  invariant(Array.isArray(items) && items.length > 0, 'Carousel: items inválidos');

  let index = 0;

  function render() {
    items.forEach((el, i) => {
      if (i === index) {
        el.removeAttribute('hidden');
      } else {
        el.setAttribute('hidden', 'true');
      }
    });

    if (liveRegion) {
      liveRegion.textContent = `Testimonio ${index + 1} de ${items.length}`;
    }
  }

  function prev() {
    index = (index - 1 + items.length) % items.length;
    render();
  }

  function next() {
    index = (index + 1) % items.length;
    render();
  }

  if (prevButton) prevButton.addEventListener('click', prev);
  if (nextButton) nextButton.addEventListener('click', next);

  root.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }

    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  });

  render();

  return { prev, next };
}
