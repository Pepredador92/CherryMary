// Lógica del carrusel
let currentIndex = 0;

export function moverCarrusel(direccion, totalProductos, carrusel) {
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

export function inicializarCarrusel() {
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const carrusel = document.getElementById('carrusel');

  if (prevBtn && nextBtn && carrusel) {
    prevBtn.addEventListener('click', () => moverCarrusel('prev', carrusel.children.length, carrusel));
    nextBtn.addEventListener('click', () => moverCarrusel('next', carrusel.children.length, carrusel));
  } else {
    console.warn('Elementos del carrusel no encontrados en el DOM.');
  }
}
