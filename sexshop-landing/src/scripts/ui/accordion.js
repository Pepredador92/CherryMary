import { createEl } from '../utils/dom.js';
import { invariant } from '../utils/validate.js';

export function createAccordion({ root, items }) {
  invariant(root, 'Accordion: root requerido');
  invariant(Array.isArray(items), 'Accordion: items inválidos');

  root.innerHTML = '';

  items.forEach((item, idx) => {
    const itemEl = createEl('div', { className: 'accordion__item' });

    const triggerId = `faq-trigger-${idx}`;
    const panelId = `faq-panel-${idx}`;

    const trigger = createEl('button', {
      className: 'accordion__trigger',
      attrs: {
        type: 'button',
        id: triggerId,
        'aria-expanded': 'false',
        'aria-controls': panelId,
      },
    });

    const title = createEl('span', { text: item.pregunta });
    const icon = createEl('span', { className: 'accordion__icon', text: '+' });

    trigger.append(title, icon);

    const content = createEl('div', {
      className: 'accordion__content',
      attrs: {
        id: panelId,
        role: 'region',
        'aria-labelledby': triggerId,
        hidden: 'true',
      },
    });

    content.textContent = item.respuesta;

    trigger.addEventListener('click', () => {
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      const next = !expanded;

      trigger.setAttribute('aria-expanded', next ? 'true' : 'false');
      icon.textContent = next ? '–' : '+';

      if (next) {
        content.removeAttribute('hidden');
      } else {
        content.setAttribute('hidden', 'true');
      }
    });

    itemEl.append(trigger, content);
    root.append(itemEl);
  });
}
