# Sexshop Landing (estática)

Landing page estática (HTML/CSS/JS vanilla con módulos ES) lista para desplegar en Netlify. No hay backend ni base de datos.

## Requisitos

- Node.js 18+ (recomendado)

## Scripts

- `npm install`
- `npm run dev` (Vite en `src/`)
- `npm run build` (genera `dist/` en la raíz del proyecto)
- `npm run preview` (sirve el build de `dist/`)
- `npm run lint`
- `npm run format`

## Deploy en Netlify

En Netlify:

- Build command: `npm run build`
- Publish directory: `dist`

> Nota: este proyecto usa `vite --root src` para mantener el HTML en `src/index.html`.

## Editar catálogo

- Productos: `src/scripts/data/products.js` (única fuente de verdad)
- FAQ: `src/scripts/data/faq.js`
- Config de marca/WhatsApp/disclaimers: `src/scripts/config.js`
