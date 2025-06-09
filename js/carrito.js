function mostrarCarrito() {
    let lista = document.getElementById("carrito-lista");
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let total = 0;

    lista.innerHTML = "";

    carrito.forEach(producto => {
        let item = document.createElement("li");
        item.innerHTML = `<span>${producto.nombre}</span><span>$${producto.precio.toFixed(2)}</span>`;
        lista.appendChild(item);
        total += parseFloat(producto.precio);
    });

    document.getElementById("total").textContent = total.toFixed(2);
}

function vaciarCarrito() {
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

document.addEventListener("DOMContentLoaded", mostrarCarrito);
