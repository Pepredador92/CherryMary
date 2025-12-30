## Contrato anti-desorden (para IA / Copilot) — OBLIGATORIO

La solución real es: **reglas + herramientas + un contrato de cambios**.
Si rompes este mapa, el cambio es incorrecto.

### 1) Reglas duras para cambios (IA, NO puedes hacer X)

**Estructura permitida**
- NO crees carpetas nuevas fuera de:  
  `src/assets/`, `src/styles/`, `src/scripts/`
- Dentro de esas, SOLO se permiten estas subcarpetas:
  - `src/assets/{img,icons,fonts}`
  - `src/styles/04-sections/`
  - `src/scripts/{data,ui,utils}`
- **No cambies nombres** de carpetas existentes.

**Archivos nuevos**
- NO crees archivos nuevos si puedes modificar uno existente.
- Si necesitas un archivo nuevo: **primero** entrega una propuesta con:
  - **Nombre del archivo**
  - **Ruta exacta**
  - **Motivo**
  - **Qué archivo lo importará y desde dónde**
  Y SOLO después lo generas si se aprueba.
- Cada archivo nuevo debe iniciar con un encabezado de 2 líneas:
  - `// Purpose: ...`
  - `// Owner: (styles|scripts|data|ui|utils)`

**Reglas HTML**
- `src/index.html` es la **única** página.
- Prohibido CSS inline (`style=""`) y prohibido `<style>`.
- Prohibido meter lógica JS “grande” dentro del HTML.
- El HTML solo referencia:
  - CSS desde `src/styles/*`
  - JS desde `src/scripts/main.js` (único entrypoint)

**Reglas CSS**
- `src/styles/00-tokens.css` es el **ÚNICO lugar** para colores/tipografías/espaciados (CSS variables).
- No hardcodear colores/espaciados repetidos en otros CSS: deben venir de tokens.
- `src/styles/04-sections/*` SOLO contiene estilos de su sección correspondiente.
- `src/styles/03-components.css` SOLO contiene componentes reutilizables (buttons, cards, chips, modal, etc.).
- No mezclar componentes dentro de archivos de sección.

**Reglas JS (arquitectura)**
- `src/scripts/main.js` es el **ÚNICO entrypoint**. Todo se importa desde ahí.
- `src/scripts/config.js` SOLO define constantes (brand, links, WhatsApp, disclaimers). No lógica.
- `src/scripts/data/products.js` es la **única fuente de verdad** del catálogo.  
  No dupliques productos en otro archivo. No los alteres.
- `src/scripts/data/faq.js` SOLO datos de FAQ.
- `src/scripts/ui/*` contiene UI behavior (navbar, modal, accordion, carousel).  
  Nada de “data” aquí.
- `src/scripts/utils/*` contiene utilidades pequeñas y genéricas.
  **Prohibido inventar nuevas carpetas de utils**: todo va en `src/scripts/utils/` (máximo 2–3 archivos).
- No uses librerías de UI.

**Dependencias permitidas (para evitar imports cruzados)**
- `scripts/main.js` puede importar de: `config`, `data`, `ui`, `utils`.
- `scripts/ui/*` puede importar de: `config`, `data`, `utils`.
- `scripts/data/*` NO puede importar nada (solo exporta datos).
- `scripts/utils/*` NO puede importar de `ui` ni de `data` (para no acoplar).
- `styles/*` no “depende” de scripts. (Solo se linkea desde HTML.)

**Accesibilidad**
- A11y primero: roles, aria, focus visible, y focus trap en modal cuando aplique.

---

### 2) PROJECT_MAP.md es ley

Este archivo define:
- árbol de carpetas permitido,
- convenciones,
- responsabilidades por archivo,
- dependencias permitidas,
- checklist de cambios.

**Regla:** “Si rompes el mapa, está mal”.

---

### 3) Candados automáticos (para que el repo falle si hay desorden)

Obligatorio configurar:
- **Prettier** (formato consistente).
- **ESLint** (reglas y calidad de JS).
- (Opcional recomendado) **Husky + lint-staged**:
  - Rechaza commits si:
    - hay archivos fuera de `src/`,
    - hay CSS inline o `<style>` detectado,
    - hay JS sin formatear/lint.

Nota: aquí usamos JS vanilla con módulos; si se usa TypeScript en el futuro, activar `strict`.

---

### 4) Flujo de trabajo obligatorio para iterar sin caos (PLAN → CAMBIOS)

En CADA iteración, la IA debe responder así:

1) **PLAN DE CAMBIO**
   - Lista exacta de archivos a modificar/crear.
   - Para cada archivo: qué se cambia y por qué.
2) **APLICAR CAMBIOS**
   - Cambia SOLO esos archivos.
   - Si aparece necesidad de archivo nuevo:
     - parar y proponer (nombre + ruta + motivo + imports).
     - esperar aprobación.
