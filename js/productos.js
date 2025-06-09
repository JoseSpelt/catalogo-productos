const productos = [
    { id: 1, nombre: 'Auriculares Bluetooth', precio: 120, descripcion: 'Auriculares inalámbricos con cancelación de ruido.', imagen: 'auriculares.webp' },
    { id: 2, nombre: 'Smartwatch Deportivo', precio: 250, descripcion: 'Reloj inteligente con GPS y monitoreo cardíaco.', imagen: 'smartwatch.webp' },
    { id: 3, nombre: 'Teclado Mecánico RGB', precio: 180, descripcion: 'Teclado con retroiluminación RGB y switches azules.', imagen: 'teclado.webp' },
    { id: 4, nombre: 'Cámara Web HD', precio: 90, descripcion: 'Cámara 1080p ideal para videollamadas.', imagen: 'camara.webp' },
    { id: 5, nombre: 'Mouse Gamer', precio: 80, descripcion: 'Mouse ergonómico con DPI ajustable y luces LED.', imagen: 'mouse.webp' },
    { id: 6, nombre: 'Parlante Bluetooth', precio: 150, descripcion: 'Parlante portátil con sonido envolvente.', imagen: 'parlante.webp' },
    { id: 7, nombre: 'Monitor 24" Full HD', precio: 600, descripcion: 'Pantalla con alta resolución y diseño sin bordes.', imagen: 'monitor.webp' },
    { id: 8, nombre: 'Silla Ergonómica', precio: 950, descripcion: 'Silla ideal para oficina con soporte lumbar.', imagen: 'silla.webp' }
];

const container = document.getElementById("productos-container");

productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img src="../img/${producto.imagen}" alt="${producto.nombre}">
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <p><strong>Precio:</strong> $${producto.precio}</p>
        <button onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
    `;
    container.appendChild(div);
});

function agregarAlCarrito(id) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = productos.find(p => p.id === id);
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert("Producto agregado al carrito");
}
