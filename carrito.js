export function cargarCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

export function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}
