// Funciones para el carrito
const novedades = [
  { id: 1001, nombre: 'PinkSquirrell', precio: 680, precioOriginal: 880, imagen: 'img/pinkSquirrell.JPG', descripcion: 'Descripción detallada de PinkSquirrell.' },
  { id: 1002, nombre: 'SkinSense', precio: 461, precioOriginal: 667, imagen: 'img/SkinSense.jpg', descripcion: 'Descripción detallada de SkinSense.' },
  { id: 1003, nombre: 'PurpleStick', precio: 506,precioOriginal: 717, imagen: 'img/PurpleStick.jpg', descripcion: 'Descripción detallada de PurpleStick.' },
  { id: 1004, nombre: 'VibiVarita', precio: 522,precioOriginal: 734, imagen: 'img/VibiVarita.jpg', descripcion: 'Descripción detallada de VibiVarita.' },
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
      <span class="precio-original" style="color: #999; text-decoration: line-through;">${producto.precioOriginal} MXN</span> 
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
  { id: 1, nombre: 'DinoRex', precio: 779, imagen: 'img/DinoRex.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de DinoRex.' },
  { id: 10, nombre: 'LaBolaManda', precio: 592, imagen: 'img/labolaManda.jpg', categoria: 'anales', descripcion: 'Descripción detallada de LaBolaManda.' },
  { id: 26, nombre: 'BackDoor1', precio: 665, imagen: 'img/backDoor1.jpg', categoria: 'anales', descripcion: 'Descripción detallada de BackDoor1.' },
  { id: 3, nombre: 'BackDoor1', precio: 665, imagen: 'img/backDoor2.jpg', categoria: 'anales', descripcion: 'Descripción detallada de BackDoor1 (alternativo).' },
  { id: 4, nombre: 'TentaCool', precio: 593, imagen: 'img/tentaCool.jpg', categoria: 'consoladores', descripcion: 'Descripción detallada de TentaCool.' },
  { id: 5, nombre: 'BlackStick', precio: 504, imagen: 'img/BlackStick.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de BlackStick.' },
  { id: 24, nombre: 'Amarre Completo', precio: 560, imagen: 'img/AmarreCompleto.jpg', categoria: 'restriccion', descripcion: 'Descripción detallada de Amarre Completo.' },
  { id: 25, nombre: 'MagicHop', precio: 468, imagen: 'img/MagicHop.jpg', categoria: 'vibradores', descripcion: 'Descripción detallada de MagicHop.' },
  { id: 18, nombre: 'HoldKit', precio: 416, imagen: 'img/HoldKit.jpg', categoria: 'restriccion', descripcion: 'Descripción detallada de HoldKit.' },
  { id: 21, nombre: 'HuevitoPink', precio: 495, imagen: 'img/HuevitoPink.jpg', categoria: 'vibradores', descripcion: 'Descripción detallada de HuevitoPink.' },
  { id: 22, nombre: 'KitDobleSujeción', precio: 399, imagen: 'img/KitDobleSujecion.JPG', categoria: 'restriccion', descripcion: 'Descripción detallada de KitDobleSujeción.' },
  { id: 27, nombre: 'MoraLiza', precio: 360, imagen: 'img/MoraLiza.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de MoraLiza.' },
  { id: 23, nombre: 'VibrayPega', precio: 360, imagen: 'img/VibrayPega.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de VibrayPega.' },
  { id: 20, nombre: 'CabeZone', precio: 546, imagen: 'img/CabeZone.JPG', categoria: 'vibradores', descripcion: 'Descripción detallada de CabeZone.' },
  { id: 6, nombre: 'PalitoClarito', precio: 509, imagen: 'img/PalitoClarito.jpg', categoria: 'consoladores', descripcion: 'Descripción detallada de PalitoClarito.' },
  { id: 17, nombre: 'PaQuEncaje', precio: 231, imagen: 'img/PaqEncaje.JPG', categoria: 'anales', descripcion: 'Descripción detallada de PaQuEncaje.' },
  { id: 11, nombre: 'PinzasBDSM', precio: 296, imagen: 'img/PinzasBDSM.JPG', categoria: 'restriccion', descripcion: 'Descripción detallada de PinzasBDSM.' },
  { id: 9, nombre: 'DaleDoble', precio: 252, imagen: 'img/DaleDoble.jpg', categoria: 'consoladores', descripcion: 'Descripción detallada de DaleDoble.' },
  { id: 13, nombre: 'BolasDeDiez', precio: 211, imagen: 'img/BolasDeDiez.JPG', categoria: 'consoladores', descripcion: 'Descripción detallada de BolasDeDiez.' },
  { id: 19, nombre: 'SetSujetaFirme', precio: 220, imagen: 'img/KitDobleSujecion.JPG', categoria: 'restriccion', descripcion: 'Descripción detallada de SetSujetaFirme.' },
  //{ id: 8, nombre: 'Conjunto con gancho anal', precio: 797, imagen: 'img/conjunto-gancho-anal-bdsm.jpg', categoria: 'anales', descripcion: 'Descripción detallada de Conjunto con gancho anal.' },
  //{ id: 7, nombre: 'Collar con clip', precio: 250, imagen: 'img/collar-con-clip-bdsm.jpg', categoria: 'lenceria', descripcion: 'Descripción detallada de Collar con clip.' },
  //{ id: 14, nombre: 'Sujetador BDSM', precio: 217, imagen: 'img/juego-sujetador-bdsm-ojos.jpg', categoria: 'restriccion', descripcion: 'Descripción detallada de Sujetador BDSM.' },
  //{ id: 15, nombre: 'Sujetator BDSM por niveles', precio: 345, imagen: 'img/juguete-sexual-para-mujer-bdsm.jpg', categoria: 'restriccion', descripcion: 'Descripción detallada de Sujetator BDSM por niveles.' },
  //{ id: 16, nombre: 'Látigo para juegos', precio: 197, imagen: 'img/latigo-para-juegos-adulto.jpg', categoria: 'restriccion', descripcion: 'Descripción detallada de Látigo para juegos.' },
  //{ id: 12, nombre: 'Expansor anal ajustable n1', precio: 720, imagen: 'img/expansor-anal-ajustable.jpg', categoria: 'anales', descripcion: 'Descripción detallada de Expansor anal ajustable n1.' },
  //{ id: 2, nombre: 'Expansor anal ajustable n2', precio: 792, imagen: 'img/ana-expansible-acero-ajustable.jpg', categoria: 'anales', descripcion: 'Descripción detallada de Expansor anal ajustable n2.' },
];

const productosList = document.getElementById('productos-list');

let carrito = []; // Carrito de compras

productos.forEach(producto => {
  const div = document.createElement('div');
  div.classList.add('producto');
  div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}" class="producto-imagen" data-id="${producto.id}" />
    <h3>${producto.nombre}</h3>
    <p>
      <span class="precio-original" style="color: #999; text-decoration: line-through;">${producto.precioOriginal || ''} MXN</span> 
      <span class="precio-rebajado">${producto.precio} MXN</span>
    </p>
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

// Variable para guardar la referencia al event listener del modal
let modalClickListener;

// Abrir el modal de la imagen cuando se haga click
function openModal(producto) {
  const modal = document.getElementById("product-modal");
  document.getElementById("modal-image").src = producto.imagen;
  document.getElementById("modal-name").textContent = producto.nombre;
  document.getElementById("modal-price").textContent = `${producto.precio} MXN`;

  // Usar la descripción del producto si existe, de lo contrario, una genérica
  document.getElementById("modal-description").textContent = producto.descripcion || "Descripción no disponible.";

  const addToCartButton = document.getElementById("add-to-cart-modal");
  addToCartButton.onclick = () => {
    agregarAlCarrito(producto.id);
    // Opcional: cerrar modal después de agregar al carrito
    // closeModal(); 
  };

  modal.style.display = "flex";

  // Cerrar modal al hacer clic fuera del contenido
  // Asegurarse de que el listener solo se añade una vez o se limpia correctamente
  if (modalClickListener) {
    modal.removeEventListener('click', modalClickListener);
  }
  modalClickListener = function(event) {
    if (event.target === modal) {
      closeModal();
    }
  };
  modal.addEventListener('click', modalClickListener);
}

function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.style.display = "none";
  // Remover el event listener para evitar acumulaciones y fugas de memoria
  if (modalClickListener) {
    modal.removeEventListener('click', modalClickListener);
    modalClickListener = null; // Limpiar la referencia
  }
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
// Funcionalidad para mostrar el modal del carrito
const carritoModal = document.createElement('div');
carritoModal.id = 'carrito-modal';
carritoModal.innerHTML = `
  <div class="modal-content">
    <div class="modal-header">Carrito</div>
    <div class="modal-body" id="carrito-modal-body">
      <!-- Los productos del carrito se renderizarán aquí -->
    </div>
    <div class="modal-footer">
      <button class="checkout-btn">Generar Ticket PDF</button>
      <button class="whatsapp-btn" onclick="enviarWhatsApp()">Enviar WhatsApp</button>
    </div>
  </div>
`;

// Agregar el modal al cuerpo del documento
document.body.appendChild(carritoModal);

// Asegurarse de que el modal no se muestre al cargar la página
carritoModal.style.display = 'none';

// Eliminar la funcionalidad de mostrar/ocultar el carritoElement
carritoElement.style.display = 'none';

// Mostrar el modal al hacer clic en el botón del carrito
carritoBtn.addEventListener('click', () => {
  actualizarCarritoModal();
  carritoModal.style.display = 'flex';
});

// Cerrar el modal al hacer clic fuera del contenido
carritoModal.addEventListener('click', (event) => {
  if (event.target === carritoModal) {
    carritoModal.style.display = 'none';
  }
});

// Actualizar el contenido del modal del carrito
function actualizarCarritoModal() {
  const carritoBody = document.getElementById('carrito-modal-body');
  carritoBody.innerHTML = ''; // Limpiar el contenido previo

  let total = 0;

  carrito.forEach(producto => {
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
      <p>${producto.nombre} - ${producto.precio} MXN</p>
      <div class="carrito-controles">
        <button class="btn-menos" data-id="${producto.id}">-</button>
        <span>${producto.cantidad}</span>
        <button class="btn-mas" data-id="${producto.id}">+</button>
        <button class="btn-eliminar" data-id="${producto.id}">
          🗑️
        </button>
      </div>
    `;
    carritoBody.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  const totalElement = document.createElement('p');
  totalElement.textContent = `Total: ${total} MXN`;
  totalElement.style.fontWeight = 'bold';
  carritoBody.appendChild(totalElement);

  // Agregar eventos para los botones del carrito en el modal
  carritoBody.addEventListener('click', (event) => {
    const target = event.target;
    const id = parseInt(target.dataset.id, 10);

    if (target.classList.contains('btn-eliminar')) {
      eliminarDelCarrito(id);
    } else if (target.classList.contains('btn-mas')) {
      cambiarCantidad(id, 1);
    } else if (target.classList.contains('btn-menos')) {
      cambiarCantidad(id, -1);
    }

    // Renderizar el carrito dinámicamente
    renderCarrito();
  });
}

// Función para renderizar el carrito dinámicamente en el modal
function renderCarrito() {
  carritoItems.innerHTML = ''; // Limpiar los elementos del carrito
  let total = 0;

  carrito.forEach(producto => {
    const item = document.createElement('div');
    item.classList.add('carrito-item');
    item.innerHTML = `
      <span>${producto.nombre}</span>
      <div class="carrito-controles">
        <button class="btn-menos" data-id="${producto.id}">-</button>
        <span>${producto.cantidad}</span>
        <button class="btn-mas" data-id="${producto.id}">+</button>
        <button class="btn-eliminar" data-id="${producto.id}">🗑️</button>
      </div>
    `;
    carritoItems.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  const totalElement = document.createElement('p');
  totalElement.textContent = `Total: ${total} MXN`;
  totalElement.style.fontWeight = 'bold';
  carritoItems.appendChild(totalElement);
}

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

  // Asegurar que el modal del carrito se actualice correctamente
  function actualizarCarrito() {
    carritoItems.innerHTML = ''; // Limpiar los elementos del carrito
    let total = 0;

    carrito.forEach(producto => {
      const item = document.createElement('div');
      item.classList.add('carrito-item');
      item.innerHTML = `
        <span>${producto.nombre}</span>
        <div class="carrito-controles">
          <button class="btn-menos" data-id="${producto.id}">-</button>
          <span>${producto.cantidad}</span>
          <button class="btn-mas" data-id="${producto.id}">+</button>
          <button class="btn-eliminar" data-id="${producto.id}">🗑️</button>
        </div>
      `;
      carritoItems.appendChild(item);
      total += producto.precio * producto.cantidad;
    });

    const totalElement = document.createElement('p');
    totalElement.textContent = `Total: ${total} MXN`;
    totalElement.style.fontWeight = 'bold';
    carritoItems.appendChild(totalElement);

    // Actualizar el estado del modal
    const carritoModal = document.getElementById('carrito-modal');
    if (carrito.length > 0) {
      carritoModal.classList.add('carrito-visible');
    } else {
      carritoModal.classList.remove('carrito-visible');
    }
  }
}

// Confirmar pedido por WhatsApp
function enviarWhatsApp() {
  const total = document.getElementById('total').textContent;
  const productosEnCarrito = carrito.map(producto => `${producto.nombre} (x${producto.cantidad})`).join(', '); // Modificado para incluir cantidad
  const mensaje = encodeURIComponent(
    `Hola, deseo confirmar mi pedido por un total de ${total} MXN. Los productos que he ordenado son: ${productosEnCarrito}.`
  );
  const numeroWhatsApp = "524921002965"; // Número de WhatsApp

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

  const margenIzq = 20;
  let yPosition = 30;

  // Title
  doc.setFontSize(22);
  doc.setTextColor(255, 102, 153);
  doc.setFont('helvetica', 'bold');
  doc.text('Cherry Mary - Ticket de Compra', 105, yPosition, { align: 'center' });
  yPosition += 10;

  // Add logo
  const logoPath = 'http://localhost:8000/img/cherry-merry-logo1.png'; // Update to use HTTP server
  try {
    doc.addImage(logoPath, 'PNG', 80, 10, 50, 20);
  } catch (error) {
    console.error('Failed to load logo:', error);
  }
  yPosition += 30;

  // Separator line
  doc.setDrawColor(200, 200, 200);
  doc.line(margenIzq, yPosition, 190, yPosition);
  yPosition += 10;

  // Table headers with background color
  doc.setFillColor(240, 240, 240);
  doc.rect(margenIzq, yPosition - 5, 170, 10, 'F');
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Producto', margenIzq, yPosition);
  doc.text('Cantidad', 110, yPosition, { align: 'right' });
  doc.text('Precio', 170, yPosition, { align: 'right' });
  yPosition += 8;

  // Product details with alternating row colors
  let total = 0;
  let isAlternateRow = false;
  carrito.forEach(producto => {
    if (isAlternateRow) {
      doc.setFillColor(245, 245, 245);
      doc.rect(margenIzq, yPosition - 5, 170, 10, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.text(producto.nombre, margenIzq, yPosition);
    doc.text(`${producto.cantidad}`, 110, yPosition, { align: 'right' });
    doc.text(`${producto.precio * producto.cantidad} MXN`, 170, yPosition, { align: 'right' });
    yPosition += 10;
    total += producto.precio * producto.cantidad;
    isAlternateRow = !isAlternateRow;
  });

  // Separator line before total
  doc.line(margenIzq, yPosition, 190, yPosition);
  yPosition += 10;

  // Total with bold and larger font
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(0, 0, 0);
  doc.text('Total:', 120, yPosition);
  doc.text(`${total} MXN`, 170, yPosition, { align: 'right' });
  yPosition += 15;

  // Payment instructions with icons
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Pasos para realizar tu pago:', margenIzq, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('1. Genera tu ticket de compra.', margenIzq, yPosition);
  yPosition += 7;
  doc.text('2. Realiza el pago por OXXO, transferencia o en efectivo al recibir tu edido, utilizando los datos bancarios proporcionados.', margenIzq, yPosition);
  yPosition += 7;
  doc.text('3. Envía el comprobante de pago por WhatsApp.', margenIzq, yPosition);
  yPosition += 7;
  doc.text('4. Recibe tu pedido en la dirección indicada.', margenIzq, yPosition);
  yPosition += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Datos Bancarios:', margenIzq, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Banco: BBVA Bancomer', margenIzq, yPosition);
  yPosition += 7;
  doc.text('Cuenta: 150 526 8982', margenIzq, yPosition);
  yPosition += 7;
  doc.text('CLABE: 012 947 01505268982 9', margenIzq, yPosition);
  yPosition += 7;
  doc.text('Tarjeta: 4152 3139 2443 6756', margenIzq, yPosition);
  yPosition += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Contacto:', margenIzq, yPosition);
  yPosition += 8;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('WhatsApp: +52 492 100 2965', margenIzq, yPosition);
  yPosition += 7;
  doc.text('Métodos de pago: Oxxo, transferencia bancaria, efectivo.', margenIzq, yPosition);
  yPosition += 15;

  // Thank you message with larger font and centered
  doc.setFontSize(14);
  doc.setTextColor(100, 100, 100);
  doc.text('Gracias por tu compra en Cherry Mary', 105, yPosition, { align: 'center' });

  // Download the PDF
  doc.save('ticket-compra.pdf');
}

// Ensure DOM is fully loaded before accessing elements
window.addEventListener('DOMContentLoaded', () => {
  const botonesCheckout = document.querySelectorAll('.checkout-btn');
  botonesCheckout.forEach(boton => {
    boton.addEventListener('click', () => {
      imprimirTicket();
    });
  });

  // Update logo path to use HTTP server URL
  const logoPath = 'http://localhost:8000/img/cherry-merry-logo1.png';
  imprimirTicket.logoPath = logoPath;
});

// Funcionalidad para el menú de navegación responsivo
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('nav.main-nav');
const submenuToggles = document.querySelectorAll('.submenu-toggle');

// Alternar el menú principal
menuToggle.addEventListener('click', () => {
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', !isExpanded);
  mainNav.classList.toggle('nav-open');
});

// Alternar los submenús
submenuToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const submenu = toggle.nextElementSibling;
    submenu.classList.toggle('submenu-open');
  });
});
