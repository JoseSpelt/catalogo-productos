function mostrarCarrito() {
    const lista = document.getElementById("carrito-lista");
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalSpan = document.getElementById("total");
    lista.innerHTML = "";

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
        const item = document.createElement("li");
        item.classList.add("item-carrito");

        item.innerHTML = `
            <div class="carrito-img">
                <img src="../img/${producto.imagen}" alt="${producto.nombre}">
            </div>
            <div class="carrito-detalle">
                <h4>${producto.nombre}</h4>
                <p>$${producto.precio.toFixed(2)}</p>
            </div>
            <div class="carrito-acciones">
                <button class="btn-cantidad" onclick="modificarCantidad(${producto.id}, -1)">➖</button>
                <span>${producto.cantidad}</span>
                <button class="btn-cantidad" onclick="modificarCantidad(${producto.id}, 1)">➕</button>
                <button class="btn-eliminar" onclick="eliminarProducto(${producto.id})">🗑️</button>
            </div>
        `;
        lista.appendChild(item);
        total += producto.precio * producto.cantidad;
    });

    totalSpan.textContent = total.toFixed(2);
}

function modificarCantidad(id, cambio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const index = carrito.findIndex(p => p.id === id);

    if (index !== -1) {
        if (cambio === -1) {
            const cantidadActual = carrito.filter(p => p.id === id).length;
            if (cantidadActual <= 1) {
                carrito = carrito.filter(p => p.id !== id);
            } else {
                const posicion = carrito.findIndex(p => p.id === id);
                carrito.splice(posicion, 1);
            }
        } else if (cambio === 1) {
            const producto = carrito.find(p => p.id === id);
            carrito.push(producto);
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    }
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

function mostrarToast(mensaje, tipo = "success") {
    const toastContainer = document.getElementById("toast-container");
    const toast = document.createElement("div");
    toast.className = "toast";

    if (tipo === "error") {
        toast.style.backgroundColor = "#dc3545";
    } else {
        toast.style.backgroundColor = "#28a745";
    }

    toast.innerHTML = `<i>✔️</i> <span>${mensaje}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 100);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function realizarPedido() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  if (carrito.length === 0) {
    mostrarToast("Tu carrito está vacío", "error");
    return;
  }

  window.location.href = "confirmar-pedido.html";
}


function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
