document.addEventListener("DOMContentLoaded", () => {
  const resumenLista = document.getElementById("resumen-pedido");
  const totalSpan = document.getElementById("total-pedido");

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const productosAgrupados = {};

  carrito.forEach(producto => {
    if (productosAgrupados[producto.id]) {
      productosAgrupados[producto.id].cantidad++;
    } else {
      productosAgrupados[producto.id] = { ...producto, cantidad: 1 };
    }
  });

  let total = 0;

  Object.values(productosAgrupados).forEach(producto => {
    const li = document.createElement("li");
    li.className = "item-carrito";
    li.innerHTML = `
      <div class="carrito-img">
        <img src="../img/${producto.imagen}" alt="${producto.nombre}" />
      </div>
      <div class="carrito-detalle">
        <h4>${producto.nombre}</h4>
        <p>Cantidad: ${producto.cantidad}</p>
        <p>Precio unitario: $${producto.precio.toFixed(2)}</p>
      </div>
    `;
    resumenLista.appendChild(li);
    total += producto.precio * producto.cantidad;
  });

  totalSpan.textContent = total.toFixed(2);

  localStorage.removeItem("carrito");
});
