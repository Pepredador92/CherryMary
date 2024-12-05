const novedades = [
  { id: 1001, nombre: 'PinkSquirrell', precio: 680, precioOriginal: 880, imagen: 'img/pinkSquirrell.JPG' },
  { id: 1002, nombre: 'SkinSense', precio: 461, precioOriginal: 667, imagen: 'img/SkinSense.jpg' },
  { id: 1003, nombre: 'PurpleStick', precio: 506,precioOriginal: 717, imagen: 'img/PurpleStick.jpg' },
  { id: 1004, nombre: 'VibiVarita', precio: 522,precioOriginal: 734, imagen: 'img/VibiVarita.jpg' },
];

const carrusel = document.getElementById('carrusel');

// Renderizar productos de novedades
novedades.forEach(producto => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
   <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" data-id="${producto.id}" />
    <h3>${producto.nombre}</h3>
    <p>
      <span class="precio-original">${producto.precioOriginal} MXN</span> 
      <span class="precio-rebajado">${producto.precio} MXN</span>
    </p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
  `;
  carrusel.appendChild(div);
  // Evento para abrir el modal al hacer clic en la imagen
  div.querySelector(".producto-imagen").addEventListener("click", () => openModal(producto));
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
  { id: 1, nombre: 'DinoRex', precio: 779, imagen: 'img/DinoRex.JPG', categoria: 'vibradores' },
  { id: 10, nombre: 'LaBolaManda', precio: 592, imagen: 'img/labolaManda.jpg', categoria: 'anales' },
  { id: 26, nombre: 'BackDoor1', precio: 665, imagen: 'img/backDoor1.jpg', categoria: 'anales' },
  { id: 3, nombre: 'BackDoor1', precio: 665, imagen: 'img/backDoor2.jpg', categoria: 'anales' },
  { id: 4, nombre: 'TentaCool', precio: 593, imagen: 'img/tentaCool.jpg', categoria: 'consoladores' },
  { id: 5, nombre: 'BlackStick', precio: 504, imagen: 'img/BlackStick.JPG', categoria: 'vibradores' },
  { id: 24, nombre: 'Amarre Completo', precio: 560, imagen: 'img/AmarreCompleto.jpg', categoria: 'restriccion' },
  { id: 25, nombre: 'MagicHop', precio: 468, imagen: 'img/MagicHop.jpg', categoria: 'vibradores' },
  { id: 18, nombre: 'HoldKit', precio: 416, imagen: 'img/HoldKit.jpg', categoria: 'restriccion' },
  { id: 21, nombre: 'HuevitoPink', precio: 495, imagen: 'img/HuevitoPink.jpg', categoria: 'vibradores' },
  { id: 22, nombre: 'KitDobleSujeción', precio: 399, imagen: 'img/KitDobleSujecion.JPG', categoria: 'restriccion' },
  { id: 27, nombre: 'MoraLiza', precio: 360, imagen: 'img/MoraLiza.JPG', categoria: 'vibradores' },
  { id: 23, nombre: 'VibrayPega', precio: 360, imagen: 'img/VibrayPega.JPG', categoria: 'vibradores' },
  { id: 20, nombre: 'CabeZone', precio: 546, imagen: 'img/CabeZone.JPG', categoria: 'vibradores' },
  { id: 6, nombre: 'PalitoClarito', precio: 509, imagen: 'img/PalitoClarito.jpg', categoria: 'consoladores' },
  { id: 17, nombre: 'PaQuEncaje', precio: 231, imagen: 'img/PaqEncaje.JPG', categoria: 'anales' },
  { id: 11, nombre: 'PinzasBDSM', precio: 296, imagen: 'img/PinzasBDSM.JPG', categoria: 'restriccion' },
  { id: 9, nombre: 'DaleDoble', precio: 252, imagen: 'img/DaleDoble.jpg', categoria: 'consoladores' },
  { id: 13, nombre: 'BolasDeDiez', precio: 211, imagen: 'img/BolasDeDiez.JPG', categoria: 'consoladores' },
  { id: 19, nombre: 'SetSujetaFirme', precio: 220, imagen: 'img/KitDobleSujecion.JPG', categoria: 'restriccion' },
  //{ id: 8, nombre: 'Conjunto con gancho anal', precio: 797, imagen: 'img/conjunto-gancho-anal-bdsm.jpg', categoria: 'anales' },
  //{ id: 7, nombre: 'Collar con clip', precio: 250, imagen: 'img/collar-con-clip-bdsm.jpg', categoria: 'lenceria' },
  //{ id: 14, nombre: 'Sujetador BDSM', precio: 217, imagen: 'img/juego-sujetador-bdsm-ojos.jpg', categoria: 'restriccion' },
  //{ id: 15, nombre: 'Sujetator BDSM por niveles', precio: 345, imagen: 'img/juguete-sexual-para-mujer-bdsm.jpg', categoria: 'restriccion' },
  //{ id: 16, nombre: 'Látigo para juegos', precio: 197, imagen: 'img/latigo-para-juegos-adulto.jpg', categoria: 'restriccion' },
  //{ id: 12, nombre: 'Expansor anal ajustable n1', precio: 720, imagen: 'img/expansor-anal-ajustable.jpg', categoria: 'anales' },
  //{ id: 2, nombre: 'Expansor anal ajustable n2', precio: 792, imagen: 'img/ana-expansible-acero-ajustable.jpg', categoria: 'anales' },
];

const productosList = document.getElementById('productos-list');

let carrito = []; // Carrito de compras

productos.forEach(producto => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
     <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" data-id="${producto.id}" />
    <h3>${producto.nombre}</h3>
    <p>${producto.precio} MXN</p>
    <button onclick="agregarAlCarrito(${producto.id})">Agregar al Carrito</button>
  `;
  productosList.appendChild(div);
   // Evento para abrir el modal al hacer clic en la imagen
   div.querySelector(".producto-imagen").addEventListener("click", () => openModal(producto));
});

const carritoElement = document.getElementById('carrito');
const carritoItems = document.getElementById('carrito-items');
const totalElement = document.getElementById('total');
const carritoBtn = document.getElementById('carrito-btn');

// Abrir el modal de la imagen cuando se haga click
function openModal(producto) {
  document.getElementById("modal-image").src = producto.imagen;
  document.getElementById("modal-name").textContent = producto.nombre;
  document.getElementById("modal-price").textContent = `${producto.precio} MXN`;

  const addToCartButton = document.getElementById("add-to-cart-modal");
  addToCartButton.onclick = () => agregarAlCarrito(producto.id);

  document.getElementById("product-modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("product-modal").style.display = "none";
}

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
