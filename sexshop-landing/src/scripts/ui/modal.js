import { invariant } from '../utils/validate.js';

const FOCUSABLE_SELECTORS = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

function getFocusable(container) {
  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
    (el) => !el.hasAttribute('inert') && !el.closest('[hidden]')
  );
}

export function createModal({ root }) {
  invariant(root, 'Modal: root requerido');

  const overlay = root.querySelector('[data-modal-overlay]');
  const panel = root.querySelector('[data-modal-panel]');
  const closeButtons = Array.from(root.querySelectorAll('[data-modal-close]'));

  invariant(overlay, 'Modal: falta overlay');
  invariant(panel, 'Modal: falta panel');

  let lastActiveEl = null;
  let isOpen = false;

  function onKeyDown(e) {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      e.preventDefault();
      close();
      return;
    }

    if (e.key !== 'Tab') return;

    const focusable = getFocusable(panel);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
      return;
    }

    if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  function open() {
    if (isOpen) return;
    isOpen = true;

    lastActiveEl = document.activeElement;

    root.hidden = false;
    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', onKeyDown);

    const focusable = getFocusable(panel);
    const target = focusable[0] ?? panel;
    target.focus();
  }

  function close() {
    if (!isOpen) return;
    isOpen = false;

    root.hidden = true;
    document.body.style.overflow = '';

    document.removeEventListener('keydown', onKeyDown);

    if (lastActiveEl && typeof lastActiveEl.focus === 'function') {
      lastActiveEl.focus();
    }
  }

  overlay.addEventListener('click', close);
  for (const btn of closeButtons) btn.addEventListener('click', close);

  return { open, close, get isOpen() { return isOpen; } };
}
