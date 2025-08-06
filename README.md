# Cherry Mary - Sex Shop SPA

Una aplicación web moderna de una sola página (SPA) para la sex shop Cherry Mary.

## Características

- ✨ Diseño moderno y minimalista
- 📱 Completamente responsivo
- 🔐 Sistema de autenticación completo
- 🚀 Navegación fluida sin recargas de página
- 🎨 Interfaz intuitiva y atractiva
- 🔒 Validaciones del lado del cliente

## Estructura del Proyecto

```
CherryMary2/
├── index.html          # Página principal de la aplicación
├── styles.css          # Estilos CSS responsivos
├── app.js             # Lógica de la aplicación en JavaScript
├── README.md          # Este archivo
├── img/               # Carpeta de imágenes
└── *.json             # Configuraciones de n8n
```

## Requisitos Previos

1. **n8n ejecutándose** en `http://localhost:5678`
2. **Endpoints configurados** en n8n:
   - `POST /webhook/inicio-sesion`
   - `POST /webhook/registro-cm`
3. **Servidor web local** (ver opciones abajo)

## Instalación y Ejecución

### Opción 1: Servidor HTTP Simple con Python

```bash
# En la carpeta del proyecto
cd /Users/jose/Documents/Proyectos/CherryMary2

# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Luego abre: `http://localhost:8000`

### Opción 2: Servidor HTTP Simple con Node.js

```bash
# Instalar http-server globalmente
npm install -g http-server

# En la carpeta del proyecto
cd /Users/jose/Documents/Proyectos/CherryMary2
http-server -p 8000

# O usar npx (sin instalación global)
npx http-server -p 8000
```

Luego abre: `http://localhost:8000`

### Opción 3: Live Server (VS Code Extension)

1. Instala la extensión "Live Server" en VS Code
2. Haz clic derecho en `index.html`
3. Selecciona "Open with Live Server"

### Opción 4: Servidor PHP

```bash
# En la carpeta del proyecto
cd /Users/jose/Documents/Proyectos/CherryMary2
php -S localhost:8000
```

## Funcionalidades

### 🏠 Landing Page
- Logo de Cherry Mary
- Botones para "Iniciar Sesión" y "Registrarse"
- Diseño atractivo con gradientes y efectos

### 🔑 Formulario de Login
- Campo de teléfono
- Campo de contraseña con toggle de visibilidad
- Validación de campos requeridos
- Integración con endpoint de n8n
- Manejo de respuestas exitosas y errores

### 📝 Formulario de Registro
- Campos: Nombre, Apellido, Teléfono, WhatsApp, Fecha de Nacimiento
- Campos de contraseña con confirmación
- Validación de mayoría de edad (18+)
- Validación de coincidencia de contraseñas
- Formateo automático de número telefónico
- Checkbox personalizado para WhatsApp

### 🎯 Dashboard
- Mensaje de bienvenida personalizado
- Grid de categorías de productos
- Tarjetas interactivas con hover effects
- Botón de cerrar sesión

## Endpoints de API

### Login
- **URL:** `POST http://localhost:5678/webhook/inicio-sesion`
- **Payload:**
  ```json
  {
    "telefono": "5551234567",
    "password": "mipassword"
  }
  ```
- **Respuesta exitosa:**
  ```json
  {
    "login": true,
    "nombre": "María González"
  }
  ```
- **Respuesta de error:**
  ```json
  {
    "login": false,
    "mensaje": "Usuario o contraseña incorrecta"
  }
  ```

### Registro
- **URL:** `POST http://localhost:5678/webhook/registro-cm`
- **Payload:**
  ```json
  {
    "nombre": "María",
    "apellido": "González",
    "telefono": "5551234567",
    "whatsapp": "si",
    "fechaNacimiento": "1990-05-15",
    "password": "mipassword"
  }
  ```

## Características Técnicas

### CSS
- CSS Grid y Flexbox para layouts responsivos
- Gradientes y efectos visuales modernos
- Animaciones suaves con transiciones CSS
- Variables CSS para consistencia
- Mobile-first responsive design

### JavaScript
- Arquitectura modular con estado centralizado
- Manejo de errores robusto
- Validaciones del lado del cliente
- Fetch API para llamadas AJAX
- Event delegation y optimización

### UX/UI
- Indicadores de carga
- Mensajes de éxito y error claros
- Navegación intuitiva
- Accesibilidad básica
- Diseño mobile-first

## Personalización

### Colores
Los colores principales están definidos en CSS y pueden cambiarse fácilmente:
- Primario: `#667eea` (azul)
- Secundario: `#764ba2` (púrpura)
- Fondo: Gradiente azul-púrpura

### Logo
Coloca tu logo en `img/cherry-merry-logo1.png` para que aparezca en la landing page.

### Categorías
Las categorías en el dashboard son estáticas y pueden modificarse editando el HTML en la sección `dashboard`.

## Troubleshooting

### Error de CORS
Si encuentras errores de CORS, asegúrate de que n8n esté configurado para permitir requests desde tu dominio local.

### n8n no responde
Verifica que n8n esté ejecutándose en `localhost:5678` y que los webhooks estén activos.

### Problema de formato de teléfono
El formato de teléfono está configurado para números mexicanos de 10 dígitos. Ajusta la función `formatPhoneNumber()` si necesitas otro formato.

## Próximas Mejoras

- [ ] Catálogo de productos dinámico
- [ ] Carrito de compras
- [ ] Sistema de favoritos
- [ ] Búsqueda de productos
- [ ] Perfil de usuario
- [ ] Historial de pedidos
- [ ] Notificaciones push

## Soporte

Para soporte técnico o preguntas sobre la implementación, consulta la documentación de n8n o contacta al desarrollador.

---

**Cherry Mary** - Tu tienda de confianza 💜
