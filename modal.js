// Gestión del modal de productos
export function openModal(producto) {
  const modal = document.getElementById("product-modal");
  document.getElementById("modal-image").src = producto.imagen;
  document.getElementById("modal-name").textContent = producto.nombre;
  document.getElementById("modal-price").textContent = `${producto.precio} MXN`;
  document.getElementById("modal-description").textContent = producto.descripcion || "Descripción no disponible.";

  const addToCartButton = document.getElementById("add-to-cart-modal");
  if (producto.agotado) {
    addToCartButton.disabled = true;
    addToCartButton.textContent = "Agotado";
    addToCartButton.onclick = () => alert('Este producto no está disponible en inventario actualmente.');
  } else {
    addToCartButton.disabled = false;
    addToCartButton.textContent = "Agregar al Carrito";
    addToCartButton.onclick = () => {
      agregarAlCarrito(producto.id);
      closeModal();
    };
  }

  modal.style.display = "flex";

  modal.addEventListener('click', function cerrar(event) {
    if (event.target === modal) {
      closeModal();
      modal.removeEventListener('click', cerrar);
    }
  });
}

export function closeModal() {
  const modal = document.getElementById("product-modal");
  modal.style.display = "none";
}
