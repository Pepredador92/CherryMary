export function qs(rootOrSelector, maybeSelector) {
  if (typeof rootOrSelector === 'string') {
    return document.querySelector(rootOrSelector);
  }

  return rootOrSelector.querySelector(maybeSelector);
}

export function qsa(rootOrSelector, maybeSelector) {
  if (typeof rootOrSelector === 'string') {
    return Array.from(document.querySelectorAll(rootOrSelector));
  }

  return Array.from(rootOrSelector.querySelectorAll(maybeSelector));
}

export function createEl(tag, { className, text, attrs } = {}) {
  const el = document.createElement(tag);

  if (className) el.className = className;
  if (text != null) el.textContent = text;

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (value == null) continue;
      el.setAttribute(key, String(value));
    }
  }

  return el;
}

export function setText(el, value) {
  el.textContent = value;
}

export function on(el, eventName, handler, options) {
  el.addEventListener(eventName, handler, options);
  return () => el.removeEventListener(eventName, handler, options);
}
