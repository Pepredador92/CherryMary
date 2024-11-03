const novedades = [
  { id: 1001, nombre: 'Masageador de silicon (1)', precio: 328, precioOriginal: 517, imagen: 'img/masageador-silicona-30-vel.jpg' },
  { id: 1002, nombre: 'Huevo inambrico (1)', precio: 492, precioOriginal: 615, imagen: 'img/huevos-saltarines-inalmbricos.jpg' },
  { id: 1003, nombre: 'Dildo remoto (1)', precio: 448,precioOriginal: 560, imagen: 'img/dildo-control-remoto.jpg' },
  { id: 1004, nombre: 'Plug Anal con joya (1)', precio: 160,precioOriginal: 248, imagen: 'img/tampon-anal-metal.jpg' },
  { id: 1005, nombre: 'Bala anal (1)', precio: 250, precioOriginal: 427, imagen: 'img/palillo-de-bala-g-punto-anal-dildo.jpg' },
  { id: 1006, nombre: 'Consolador tentacle (1)', precio: 540, precioOriginal: 675, imagen: 'img/consolador-tentacle.jpg' },
  { id: 1007, nombre: 'Consolador realista (1)', precio: 545, precioOriginal: 726, imagen: 'img/669-pulgadas-con-control-remoto-por-cable.jpg' },
  { id: 1008, nombre: 'Vibrador succionador (1)', precio: 499, precioOriginal: 620, imagen: 'img/mini-vibrador-con-succion-clitoris.jpg' }
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
  { id: 1, nombre: 'Consolador transparente', precio: 720, imagen: 'img/huev-de-gran-tamano-con-pene.jpg', categoria: 'consoladores' },
  { id: 10, nombre: 'Dildo de doble penetración', precio: 157, imagen: 'img/dildo-doble-penetracion.jpg', categoria: 'consoladores' },
  { id: 26, nombre: 'Consolador tentacle', precio: 675, imagen: 'img/consolador-tentacle.jpg', categoria: 'consoladores' },
  { id: 3, nombre: 'Anillo de bloqueo de pene', precio: 220, imagen: 'img/anillo-pene-bloqueo-crisal.jpg', categoria: 'pene' },
  { id: 4, nombre: 'Anillo con perlas para pene', precio: 96, imagen: 'img/anillos-peneanos.jpg', categoria: 'pene' },
  { id: 5, nombre: 'Anillo vibrador', precio: 145, imagen: 'img/anillo-vibrador.jpg', categoria: 'pene' },
  { id: 24, nombre: 'Dildo remoto', precio: 560, imagen: 'img/dildo-control-remoto.jpg', categoria: 'vibradores' },
  { id: 25, nombre: 'Dildo sexy remoto', precio: 455, imagen: 'img/dildo-sexy-por-app.jpg', categoria: 'vibradores' },
  { id: 18, nombre: 'Vibrador con control', precio: 520, imagen: 'img/vibrador-con-control-remoto.jpg', categoria: 'vibradores' },
  { id: 21, nombre: 'Vibrador Succionador', precio: 620, imagen: 'img/mini-vibrador-con-succion-clitoris.jpg', categoria: 'vibradores' },
  { id: 22, nombre: 'Masageador de silicón', precio: 517, imagen: 'img/masageador-silicona-30-vel.jpg', categoria: 'vibradores' },
  { id: 27, nombre: 'Consolador realista', precio: 726, imagen: 'img/669-pulgadas-con-control-remoto-por-cable.jpg', categoria: 'vibradores' },
  { id: 23, nombre: 'Huevo inalambrico', precio: 615, imagen: 'img/huevos-saltarines-inalmbricos.jpg', categoria: 'vibradores' },
  { id: 20, nombre: 'Bala anal', precio: 427, imagen: 'img/palillo-de-bala-g-punto-anal-dildo.jpg', categoria: 'vibradores' },
  { id: 6, nombre: 'Arnés body gótico', precio: 347, imagen: 'img/arnes-del-body-gotico.jpg', categoria: 'lenceria' },
  { id: 17, nombre: 'Set de restricción de muñecas', precio: 270, imagen: 'img/set-de-restriccion-de-munecas.jpg', categoria: 'restriccion' },
  { id: 11, nombre: 'Esposas y tobilleras', precio: 584, imagen: 'img/esposas-y-tobilleras.jpg', categoria: 'restriccion' },
  { id: 9, nombre: 'Conjunto de restricción 7pzas', precio: 528, imagen: 'img/conjunto-restriccion-7-piezas.jpg', categoria: 'restriccion' },
  { id: 13, nombre: 'Gancho anal', precio: 536, imagen: 'img/gancho-anal-acero.jpg', categoria: 'anales' },
  { id: 19, nombre: 'Plug anal con joya', precio: 248, imagen: 'img/tampon-anal-metal.jpg', categoria: 'anales' },
  { id: 8, nombre: 'Conjunto con gancho anal', precio: 797, imagen: 'img/conjunto-gancho-anal-bdsm.jpg', categoria: 'anales' },
  { id: 7, nombre: 'Collar con clip', precio: 250, imagen: 'img/collar-con-clip-bdsm.jpg', categoria: 'lenceria' },
  { id: 14, nombre: 'Sujetador BDSM', precio: 217, imagen: 'img/juego-sujetador-bdsm-ojos.jpg', categoria: 'restriccion' },
  { id: 15, nombre: 'Sujetator BDSM por niveles', precio: 345, imagen: 'img/juguete-sexual-para-mujer-bdsm.jpg', categoria: 'restriccion' },
  { id: 16, nombre: 'Látigo para juegos', precio: 197, imagen: 'img/latigo-para-juegos-adulto.jpg', categoria: 'restriccion' },
  { id: 12, nombre: 'Expansor anal ajustable n1', precio: 720, imagen: 'img/expansor-anal-ajustable.jpg', categoria: 'anales' },
  { id: 2, nombre: 'Expansor anal ajustable n2', precio: 792, imagen: 'img/ana-expansible-acero-ajustable.jpg', categoria: 'anales' },
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

//-----------------------------productos ------------------------------------

// Obtener el submenú y la opción del menú de productos
const submenu = document.querySelector('.submenu');
const productosMenu = document.querySelector('nav ul li a[href="#productos"]');

// Alternar la visibilidad del submenú al hacer clic en "Productos"
productosMenu.addEventListener('click', (event) => {
  event.preventDefault(); // Evita el comportamiento por defecto del enlace
  submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
});

function filtrarProductos(categoria) {
  // Filtra los productos según la categoría seleccionada o muestra todos
  let productosFiltrados;
  if (categoria === 'todos') {
    productosFiltrados = productos; // Muestra todos los productos
  } else {
    productosFiltrados = productos.filter(producto => producto.categoria === categoria);
  }

  // Limpia el contenedor de productos
  productosList.innerHTML = '';

  // Renderiza los productos filtrados
  productosFiltrados.forEach(producto => {
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

  // Ocultar el submenú después de seleccionar una opción
  submenu.style.display = 'none';
}


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
