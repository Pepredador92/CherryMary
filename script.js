const novedades = [
  { id: 1001, nombre: 'Masageador de silicon', precio: 328, precioOriginal: 517, imagen: 'img/masageador-silicona-30-vel.jpg' },
  { id: 1002, nombre: 'Huevo inambrico', precio: 492, precioOriginal: 738, imagen: 'img/huevos-saltarines-inalmbricos.jpg' },
  { id: 1003, nombre: 'Dildo remoto', precio: 448,precioOriginal: 672, imagen: 'img/dildo-control-remoto.jpg' },
  { id: 1004, nombre: 'Plug Anal acero', precio: 160,precioOriginal: 248, imagen: 'img/tampon-anal-metal.jpg' },
  { id: 1005, nombre: 'Bala anal', precio: 250, precioOriginal: 427, imagen: 'img/palillo-de-bala-g-punto-anal-dildo.jpg' },
  { id: 1006, nombre: 'Dildo tentacle', precio: 540, precioOriginal: 810, imagen: 'img/consolador-tentacle.jpg' },
  { id: 1007, nombre: 'Consolador realista', precio: 515, precioOriginal: 726, imagen: 'img/669-pulgadas-con-control-remoto-por-cable.jpg' },
  { id: 1008, nombre: 'Vibrador succionador', precio: 499, precioOriginal: 750, imagen: 'img/mini-vibrador-con-succion-clitoris.jpg' }
];

const carrusel = document.getElementById('carrusel');

// Renderizar productos de novedades
novedades.forEach(producto => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" />
    <h3>${producto.nombre}</h3>
    <p>
      <span class="precio-original">${producto.precioOriginal} MXN</span> 
      <span class="precio-rebajado">${producto.precio} MXN</span>
    </p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
  `;
  carrusel.appendChild(div);
});


//-----------------------------MOVER EL CARRUSEL------------------------------------
// Función para mover el carrusel
let currentIndex = 0;

// Función para mover el carrusel
function moverCarrusel(direccion) {
  const totalProductos = novedades.length;
  const productosVisibles = 1;
  const maxIndex = Math.ceil(totalProductos / productosVisibles) - 1;

  if (direccion === 'next' && currentIndex < maxIndex) {
    currentIndex++;
  } else if (direccion === 'prev' && currentIndex > 0) {
    currentIndex--;
  }

  const desplazamiento = currentIndex * -100;
  carrusel.style.transform = `translateX(${desplazamiento}%)`;
}

document.querySelector('.prev-btn').addEventListener('click', () => moverCarrusel('prev'));
document.querySelector('.next-btn').addEventListener('click', () => moverCarrusel('next'));

//-----------------------------LISTA DE PRODUCTOS------------------------------------
// Productos disponibles
const productos = [
  { id: 1, nombre: 'Auriculares ProSound 360', precio: 1299, imagen: 'img/vibrador-conejito.jpg' },
  { id: 2, nombre: 'Teclado Mecánico', precio: 1799, imagen: 'img/vibrador-conejito.jpg' },
  { id: 3, nombre: 'Smartwatch FitXplorer', precio: 2499, imagen: 'img/vibrador-conejito.jpg' },
  { id: 4, nombre: 'Tablet X-Touch PowerNova', precio: 15990, imagen: 'img/vibrador-conejito.jpg' },
  { id: 5, nombre: 'Bocina Bluetooth', precio: 499, imagen: 'img/vibrador-conejito.jpg' },
  { id: 6, nombre: 'Smart TV UltraVision', precio: 8980, imagen: 'img/vibrador-conejito.jpg' },
  { id: 7, nombre: 'Cámara Deportiva', precio: 3490, imagen: 'img/vibrador-conejito.jpg' },
  { id: 8, nombre: 'Mouse Inalámbrico', precio: 299, imagen: 'img/vibrador-conejito.jpg' },
  { id: 9, nombre: 'Cargador Rápido', precio: 157, imagen: 'img/vibrador-conejito.jpg' },
  { id: 10, nombre: 'Laptop PowerNova', precio: 15570, imagen: 'img/vibrador-conejito.jpg' }
];

const productosList = document.getElementById('productos-list');

let carrito = []; // Carrito de compras

productos.forEach(producto => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" />
    <h3>${producto.nombre}</h3>
    <p>${producto.precio} MXN</p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
  `;
  productosList.appendChild(div);
});

const carritoElement = document.getElementById('carrito');
const carritoItems = document.getElementById('carrito-items');
const totalElement = document.getElementById('total');
const carritoBtn = document.getElementById('carrito-btn');

//-----------------------------CARRITO ------------------------------------
// Evento para mostrar/ocultar el carrito
carritoBtn.addEventListener('click', () => {
  carritoElement.classList.toggle('carrito-visible');
});

// Agregar producto al carrito
function agregarAlCarrito(id) {
  const producto = novedades.find(p => p.id === id) || productos.find(p => p.id === id);
  if (!producto) return; // Si no encuentra el producto, se sale

  const productoEnCarrito = carrito.find(item => item.id === id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push({ ...producto, cantidad: 1 });
  }
  actualizarCarrito();
}


// Eliminar producto del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

// Cambiar la cantidad de un producto en el carrito
function cambiarCantidad(id, cantidad) {
  const producto = carrito.find(item => item.id === id);
  if (producto) {
    producto.cantidad += cantidad;
    if (producto.cantidad <= 0) {
      eliminarDelCarrito(id);
    }
  }
  actualizarCarrito();
}

// Actualizar el contenido del carrito
function actualizarCarrito() {
  carritoItems.innerHTML = ''; // Limpiar los elementos del carrito
  let total = 0;

  carrito.forEach(producto => {
    const item = document.createElement('div');
    item.classList.add('carrito-item');

    // HTML del producto en template literal
    item.innerHTML = `
      <p>${producto.nombre} - ${producto.precio} MXN</p>
      <div class="carrito-controles">
        <button onclick="cambiarCantidad(${producto.id}, -1)">-</button>
        <span>${producto.cantidad}</span>
        <button onclick="cambiarCantidad(${producto.id}, 1)">+</button>
        <button onclick="eliminarDelCarrito(${producto.id})">🗑️</button>
      </div>
    `;

    carritoItems.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  totalElement.textContent = total;

  // Actualizar el botón del carrito con comillas invertidas
  carritoBtn.textContent = `🛒 Carrito (${carrito.reduce((acc, item) => acc + item.cantidad, 0)})`;
}
// confirmar pedio por whatsapp
function enviarWhatsApp() {
  const total = document.getElementById('total').textContent;
  const productos = carrito.map(producto => producto.nombre).join(', ');
  const mensaje = encodeURIComponent(
    `Hola, deseo confirmar mi pedido por un total de ${total} MXN. Los productos que he ordenado son: ${productos}.`
  );  const numeroWhatsApp = "524921707433"; // Número de WhatsApp

  const url = `https://wa.me/${numeroWhatsApp}?text=${mensaje}`;
  window.open(url, '_blank');
}


// Función para imprimir el ticket en pantalla y generar PDF
function imprimirTicket() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  // Configuración general del PDF
  const margenIzq = 20;
  let yPosition = 30; // Posición inicial vertical

  // Título principal
  doc.setFontSize(18);
  doc.setTextColor(255, 102, 153);
  doc.setFont('helvetica', 'bold');
  doc.text('Cherry Mary - Ticket de Compra', 105, yPosition, { align: 'center' });
  
  yPosition += 10;

  // Línea separadora
  doc.setDrawColor(200, 200, 200);
  doc.line(margenIzq, yPosition, 190, yPosition); // Línea horizontal completa
  yPosition += 10;

  // Encabezados de la tabla
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Producto', margenIzq, yPosition);
  doc.text('Cantidad', 110, yPosition, { align: 'right' });
  doc.text('Precio', 170, yPosition, { align: 'right' });

  yPosition += 8;

  // Detalle de productos
  let total = 0;
  carrito.forEach(producto => {
    doc.setFont('helvetica', 'normal');
    doc.text(producto.nombre, margenIzq, yPosition);
    doc.text(`${producto.cantidad}`, 110, yPosition, { align: 'right' });
    doc.text(`${producto.precio * producto.cantidad} MXN`, 170, yPosition, { align: 'right' });

    yPosition += 10; // Aumenta la posición vertical para el siguiente producto
    total += producto.precio * producto.cantidad;
  });

  // Línea separadora antes del total
  doc.line(margenIzq, yPosition, 190, yPosition);
  yPosition += 10;

  // Total de la compra
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Total:', 120, yPosition);
  doc.text(`${total} MXN`, 170, yPosition, { align: 'right' });

  yPosition += 15;

 // Instrucciones de compra---------------------------------
 doc.setFontSize(11);
 doc.setFont('helvetica', 'bold');
 doc.text('Pasos para finalizar tu compra:', margenIzq, yPosition);
 yPosition += 8;

 doc.setFontSize(11);
 doc.setFont('helvetica', 'normal');
 doc.text('Gener Ticket -> Enviar comprobante de pago -> Recibir pedido.', margenIzq, yPosition);
 yPosition += 7;

 doc.setFontSize(11);
 doc.setFont('helvetica', 'bold');
 doc.text('Whatsapp: +52 492 170 7433', margenIzq, yPosition);
 yPosition += 7;

 // Información bancaria
 doc.setFont('helvetica', 'normal');
 doc.text('Puedes pagar en Oxxo, transferencia bancaria o en efectivo al recibir.', margenIzq, yPosition);
 yPosition += 15;

 doc.setFont('helvetica', 'normal');
 doc.text('Banco: BBVA Bancomer', margenIzq, yPosition);
 yPosition += 7;
 doc.setFont('helvetica', 'bold');
 doc.text('Número de Cuenta: 0123456789', margenIzq, yPosition);
 yPosition += 7;
 doc.text('CLABE: 002012345678901234', margenIzq, yPosition);
 yPosition += 15;

 // Mensaje de agradecimiento
 doc.setFontSize(12);
 doc.setTextColor(100, 100, 100);
 doc.text('Gracias por tu compra en Cherry Mary ', 105, yPosition, { align: 'center' });

 // Descargar el PDF
 doc.save('ticket-compra.pdf');
}


// Asignar la función al botón de "Finalizar Compra"
document.querySelector('.checkout-btn').addEventListener('click', imprimirTicket);
