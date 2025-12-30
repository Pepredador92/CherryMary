import { BRAND_NAME, DISCLAIMERS, SOCIAL_LINKS, WHATSAPP_DEFAULT_MESSAGE_TEMPLATE, WHATSAPP_PHONE } from './config.js';
import { todosLosProductos } from './data/products.js';
import { faqItems } from './data/faq.js';
import { qs, createEl } from './utils/dom.js';
import { createModal } from './ui/modal.js';
import { createAccordion } from './ui/accordion.js';
import { createCarousel } from './ui/carousel.js';
import { initNavbar } from './ui/navbar.js';

function formatPrice(value) {
  return `$${value}`;
}

function normalizeText(value) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim();
}

function getProductImageUrl(producto) {
  const base = import.meta.env.BASE_URL || '/';
  return new URL(`${base}assets/${producto.imagen}`, window.location.origin).href;
}

function buildWhatsAppLink({ nombre, precio }) {
  const message = WHATSAPP_DEFAULT_MESSAGE_TEMPLATE.replace('{nombre}', nombre).replace(
    '{precio}',
    formatPrice(precio)
  );

  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

function buildWhatsAppUrlFromMessage(message) {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

function buildOrderMessage(productos) {
  if (productos.length === 1) {
    const p = productos[0];
    return WHATSAPP_DEFAULT_MESSAGE_TEMPLATE.replace('{nombre}', p.nombre).replace(
      '{precio}',
      formatPrice(p.precio)
    );
  }

  const total = productos.reduce((acc, p) => acc + (p.precio || 0), 0);

  const lines = [
    'Hola, me interesa este pedido:',
    ...productos.map((p) => `- ${p.nombre} (${formatPrice(p.precio)})`),
    `Total aproximado: ${formatPrice(total)}`,
    '¿Me ayudas con disponibilidad y envío discreto?',
  ];

  return lines.join('\n');
}

function shuffleInPlace(arr) {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getRecommendedCategories(categoria) {
  const map = {
    lenceria: ['joyeria', 'básicos'],
    'básicos': ['restriccion', 'anales'],
    joyeria: ['lenceria'],
    anales: ['restriccion', 'básicos'],
    restriccion: ['anales', 'lenceria'],
    vibradores: ['básicos', 'lenceria'],
    consoladores: ['vibradores', 'básicos'],
    novedades: ['vibradores', 'lenceria'],
  };

  return map[categoria] ?? ['básicos'];
}

function pickRecommendations({ baseProducto, allProductos, limit = 4 }) {
  const desiredCats = new Set(getRecommendedCategories(baseProducto.categoria));
  const candidates = allProductos.filter(
    (p) => p.id !== baseProducto.id && desiredCats.has(p.categoria)
  );

  shuffleInPlace(candidates);
  return candidates.slice(0, limit);
}

function renderRecommendations({ root, productos, selectedIds, onToggle }) {
  root.innerHTML = '';

  for (const p of productos) {
    const pressed = selectedIds.has(p.id);

    const btn = createEl('button', {
      className: 'reco-card',
      attrs: {
        type: 'button',
        'aria-pressed': pressed ? 'true' : 'false',
        'data-reco-id': p.id,
      },
    });

    const thumb = createEl('img', {
      className: 'reco-card__thumb',
      attrs: {
        src: getProductImageUrl(p),
        alt: p.nombre,
        loading: 'lazy',
      },
    });

    const content = createEl('div', { className: 'reco-card__content' });
    const name = createEl('div', { className: 'reco-card__name', text: p.nombre });
    const meta = createEl('div', { className: 'reco-card__meta' });
    const price = createEl('span', { text: formatPrice(p.precio) });
    const badge = createEl('span', { text: p.categoria });
    meta.append(price, badge);
    content.append(name, meta);

    btn.append(thumb, content);

    btn.addEventListener('click', () => onToggle(p.id));
    root.append(btn);
  }
}

function sortProductosDefault(items) {
  const copy = [...items];
  copy.sort((a, b) => {
    const aIsNovedad = a.categoria === 'novedades';
    const bIsNovedad = b.categoria === 'novedades';
    if (aIsNovedad && !bIsNovedad) return -1;
    if (!aIsNovedad && bIsNovedad) return 1;

    return String(a.nombre).localeCompare(String(b.nombre), 'es', { sensitivity: 'base' });
  });
  return copy;
}

function getCategorias(items) {
  const set = new Set(items.map((p) => p.categoria));
  const categorias = Array.from(set);

  categorias.sort((a, b) => {
    if (a === 'novedades') return -1;
    if (b === 'novedades') return 1;
    return a.localeCompare(b, 'es', { sensitivity: 'base' });
  });

  return ['todas', ...categorias];
}

function renderCategoryChips({ root, categorias, selected, onSelect }) {
  root.innerHTML = '';

  for (const categoria of categorias) {
    const label = categoria === 'todas' ? 'Todas' : categoria;

    const btn = createEl('button', {
      className: 'chip',
      text: label,
      attrs: {
        type: 'button',
        'aria-pressed': categoria === selected ? 'true' : 'false',
        'data-category': categoria,
      },
    });

    btn.addEventListener('click', () => onSelect(categoria));
    root.append(btn);
  }
}

function renderProductsGrid({ root, productos, onOpen }) {
  root.innerHTML = '';

  for (const producto of productos) {
    const card = createEl('article', { className: 'card product-card' });

    const button = createEl('button', {
      className: 'product-card__button',
      attrs: {
        type: 'button',
        'data-product-id': producto.id,
        'aria-label': `Ver detalles de ${producto.nombre}`,
      },
    });

    const media = createEl('div', { className: 'product-card__media' });
    const img = createEl('img', {
      attrs: {
        src: getProductImageUrl(producto),
        alt: producto.nombre,
        loading: 'lazy',
      },
    });

    media.append(img);

    const body = createEl('div', { className: 'product-card__body' });

    const badge = createEl('span', { className: 'badge', text: producto.categoria });

    const name = createEl('p', { className: 'product-card__name', text: producto.nombre });

    const price = createEl('p', { className: 'price' });
    const current = createEl('span', { className: 'price__current', text: formatPrice(producto.precio) });
    price.append(current);

    if (producto.precioOriginal) {
      const original = createEl('span', {
        className: 'price__original',
        text: formatPrice(producto.precioOriginal),
      });
      price.append(original);
    }

    body.append(badge, name, price);

    button.append(media, body);
    card.append(button);

    button.addEventListener('click', () => onOpen(producto));

    root.append(card);
  }
}

function applyBrandName() {
  const els = document.querySelectorAll('[data-brand-name]');
  els.forEach((el) => {
    el.textContent = BRAND_NAME;
  });
}

function applyFooter() {
  const yearEl = qs('[data-current-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const socialRoot = qs('[data-social-links]');
  if (socialRoot) {
    socialRoot.innerHTML = '';

    const links = [
      { key: 'instagram', label: 'Instagram' },
      { key: 'tiktok', label: 'TikTok' },
    ];

    for (const { key, label } of links) {
      const url = SOCIAL_LINKS[key];
      if (!url) continue;

      const li = createEl('li');
      const a = createEl('a', { attrs: { href: url, target: '_blank', rel: 'noopener' }, text: label });
      li.append(a);
      socialRoot.append(li);
    }
  }

  const disclaimersRoot = qs('[data-disclaimers]');
  if (disclaimersRoot) {
    disclaimersRoot.innerHTML = '';

    for (const text of Object.values(DISCLAIMERS)) {
      const li = createEl('li', { text });
      disclaimersRoot.append(li);
    }
  }
}

function main() {
  applyBrandName();
  applyFooter();

  initNavbar({ header: qs('[data-navbar]') });

  createAccordion({ root: qs('[data-faq-accordion]'), items: faqItems });

  createCarousel({
    root: qs('[data-carousel]'),
    items: Array.from(document.querySelectorAll('[data-carousel-item]')),
    prevButton: qs('[data-carousel-prev]'),
    nextButton: qs('[data-carousel-next]'),
    liveRegion: qs('[data-carousel-live]'),
  });

  const modalRoot = qs('[data-modal-root]');
  const modal = createModal({ root: modalRoot });

  const modalTitle = qs('[data-modal-title]');
  const modalImage = qs('[data-modal-image]');
  const modalPrice = qs('[data-modal-price]');
  const modalDesc = qs('[data-modal-desc]');
  const modalWhatsApp = qs('[data-modal-whatsapp]');
  const modalRecos = qs('[data-modal-recos]');
  const modalOrderSummary = qs('[data-modal-order-summary]');

  const grid = qs('[data-products-grid]');
  const chipsRoot = qs('[data-category-chips]');
  const searchInput = qs('[data-products-search]');
  const live = qs('[data-results-live]');

  const categorias = getCategorias(todosLosProductos);

  let selectedCategoria = 'todas';
  let query = '';

  function filtered() {
    const q = normalizeText(query);

    return sortProductosDefault(todosLosProductos).filter((p) => {
      const categoriaOk = selectedCategoria === 'todas' ? true : p.categoria === selectedCategoria;
      if (!categoriaOk) return false;

      if (!q) return true;
      return normalizeText(p.nombre).includes(q);
    });
  }

  function updateUI() {
    renderCategoryChips({
      root: chipsRoot,
      categorias,
      selected: selectedCategoria,
      onSelect: (next) => {
        selectedCategoria = next;
        updateUI();
      },
    });

    const productos = filtered();

    renderProductsGrid({
      root: grid,
      productos,
      onOpen: (producto) => {
        const selectedIds = new Set([producto.id]);

        modalTitle.textContent = producto.nombre;
        modalImage.src = getProductImageUrl(producto);
        modalImage.alt = producto.nombre;

        const parts = [];
        parts.push(`<span class="price__current">${formatPrice(producto.precio)}</span>`);
        if (producto.precioOriginal) {
          parts.push(`<span class="price__original">${formatPrice(producto.precioOriginal)}</span>`);
        }
        modalPrice.innerHTML = parts.join(' ');

        modalDesc.textContent = producto.descripcion;

        const recommendations = pickRecommendations({
          baseProducto: producto,
          allProductos: todosLosProductos,
          limit: 4,
        });

        function getSelectedProductos() {
          return todosLosProductos.filter((p) => selectedIds.has(p.id));
        }

        function updateOrderUI() {
          const selected = getSelectedProductos();
          const total = selected.reduce((acc, p) => acc + (p.precio || 0), 0);
          const message = buildOrderMessage(selected);

          modalWhatsApp.href = buildWhatsAppUrlFromMessage(message);
          modalWhatsApp.textContent =
            selected.length > 1 ? `Pedir por WhatsApp (${selected.length})` : 'Pedir por WhatsApp';

          if (modalOrderSummary) {
            modalOrderSummary.textContent = `Seleccionados: ${selected.length} · Total aprox: ${formatPrice(total)}`;
          }

          if (modalRecos) {
            renderRecommendations({
              root: modalRecos,
              productos: recommendations,
              selectedIds,
              onToggle: (id) => {
                if (selectedIds.has(id)) {
                  if (id !== producto.id) selectedIds.delete(id);
                } else {
                  selectedIds.add(id);
                }

                updateOrderUI();
              },
            });
          }
        }

        updateOrderUI();

        modal.open();
      },
    });

    if (live) {
      const labelCategoria = selectedCategoria === 'todas' ? 'todas' : selectedCategoria;
      live.textContent = `${productos.length} productos en ${labelCategoria}.`;
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      query = e.target.value;
      updateUI();
    });
  }

  updateUI();
}

main();
