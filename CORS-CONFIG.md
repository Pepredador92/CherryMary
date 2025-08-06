# Configuración CORS para n8n

## 📋 Problema
Cuando abres un archivo HTML directamente en el navegador (file://), el origen es `null`, lo que puede causar errores CORS al hacer requests a `localhost:5678`.

## 🛠️ Soluciones

### Opción 1: Configurar CORS en n8n (Recomendado)

1. **Abrir n8n**: Ve a `http://localhost:5678`
2. **Ir a Settings**: Click en el ícono de engranaje
3. **Security Settings**: Buscar la sección de CORS
4. **Agregar headers**: Añadir los siguientes headers:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization, Accept
Access-Control-Max-Age: 86400
```

### Opción 2: Usar Variables de Entorno

Si tienes acceso al servidor n8n, puedes configurar estas variables de entorno:

```bash
export N8N_CORS_ORIGIN="*"
export N8N_CORS_METHODS="GET,POST,PUT,DELETE,OPTIONS"
export N8N_CORS_HEADERS="Content-Type,Authorization,Accept"
```

### Opción 3: Proxy Local (Para Desarrollo)

Crear un proxy simple con Node.js:

```javascript
// proxy-server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Proxy para n8n
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:5678',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // remove /api prefix
  },
}));

// Servir archivos estáticos
app.use(express.static('.'));

app.listen(3000, () => {
  console.log('Proxy servidor corriendo en http://localhost:3000');
});
```

### Opción 4: Configuración de Webhooks

En lugar de configurar CORS globalmente, puedes configurar cada webhook individualmente:

1. **Ir al webhook en n8n**
2. **Configurar Response Headers**:
   ```json
   {
     "Access-Control-Allow-Origin": "*",
     "Access-Control-Allow-Methods": "POST, OPTIONS",
     "Access-Control-Allow-Headers": "Content-Type"
   }
   ```

## 🔍 Debugging

### JavaScript Console Commands

Para probar la conectividad desde la consola del navegador:

```javascript
// Probar conectividad básica
fetch('http://localhost:5678/')
  .then(response => console.log('n8n disponible:', response.status))
  .catch(error => console.error('n8n no disponible:', error));

// Probar endpoint específico
fetch('http://localhost:5678/webhook/test', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ test: true })
})
.then(response => response.json())
.then(data => console.log('Respuesta:', data))
.catch(error => console.error('Error:', error));
```

### Verificar Headers de Respuesta

En las DevTools del navegador:
1. **Ir a Network tab**
2. **Hacer un request**
3. **Verificar Response Headers**
4. **Buscar**: `Access-Control-Allow-Origin`

## ⚡ Solución Rápida para Desarrollo

Si solo necesitas que funcione rápido para desarrollo:

1. **Instalar extensión de navegador**: "CORS Unblock" o similar
2. **Deshabilitar temporalmente CORS** en Chrome:
   ```bash
   # macOS/Linux
   google-chrome --disable-web-security --user-data-dir="/tmp/chrome_dev"
   
   # Windows
   chrome.exe --disable-web-security --user-data-dir="c:\temp\chrome_dev"
   ```

⚠️ **Nota**: Solo usar para desarrollo, nunca en producción.

## 📝 Ejemplo de Request Funcional

Una vez configurado CORS, tu request debería verse así:

```javascript
const response = await fetch('http://localhost:5678/webhook/registro-cm', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  mode: 'cors',
  credentials: 'omit',
  body: JSON.stringify({
    nombre: 'María',
    telefono: '5551234567',
    // ... otros datos
  })
});
```

## 🎯 Headers Esperados en la Respuesta

```
HTTP/1.1 200 OK
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Accept
Content-Type: application/json

{
  "success": true,
  "mensaje": "Registro exitoso"
}
```
